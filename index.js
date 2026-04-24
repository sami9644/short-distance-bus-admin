const express = require('express');
const adminlogIN = require("./database")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const path = require('path')
const database = require('./database')

const app = express();
app.set("view engine","ejs")
app.use(cookieParser())
const PORT = 3000;
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'cnsduifhuiehf893499485bhfghudguerhugh', // A random string to sign the session ID cookie
    resave: true,             // Don't save session if it wasn't modified
    saveUninitialized: false,  // Don't create session until something is stored
    cookie: { 
        secure: false,         // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // Session expires in 1 hour
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/admin/login', async (req,res) => {
  let admin_user = req.body['admin-user'];
  let admin_pass = req.body['admin-password'];
  let admin_data = await adminlogIN.admin_login(admin_user,admin_pass);
  if (admin_data) {
  req.session.admin = admin_data;
  res.redirect("/admin/dashboard");
  }
  else {
    res.send("<script>alert('Invalid credentials');window.location.href = '/'</script>")
  }
})


// middle ware for pages that requires log in
const redirectLogin = (req, res, next) => {
    if (!req.session.admin) {
        res.status(401).send("Please log in first");
    } else {
        next();
    }
};

app.get('/admin/dashboard',redirectLogin, (req,res) => {
  res.render("dashboard")
})

app.get('/manage/routes',redirectLogin,async (req,res) => {
    let routes = await database.routes();
    res.render("manage_routes",{routeList:routes});
})

app.post("/routes/add",redirectLogin,async (req,res) => {
    let origin = req.body.origin;
    let destination = req.body.destination;
    let priceBirr = req.body.price_birr;
    await database.addRoutes(origin,destination,priceBirr);
    res.send('<script>alert("route successfully added!");window.location.href = "/admin/dashboard"</script>')
})

app.get("/delete/route/:id",redirectLogin,async (req,res) => {
    let routeId = req.params.id;
    await database.delteRoute(routeId);
    res.send('<script>alert("route successfully deleted!");window.location.href = "/admin/dashboard"</script>')
})

app.get("/train/ticket/info",redirectLogin,async (req,res) => {
    let ticketList = await database.tickets();
    
    res.render('tickets',{ticket_s:ticketList})
})

app.get('/logout', (req, res) => {
    // 1. Destroy the session on the server
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/admin/dashboard');
        }
        
        // 2. Clear the cookie from the browser
        // 'connect.sid' is the default name for express-session
        res.clearCookie('connect.sid'); 
        
        // 3. Redirect to the login or home page
        res.redirect('/');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});