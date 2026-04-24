const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const { createConnection } = require("mysql2");
const crypto = require('crypto')

// Create the connection once
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Sami@4998',
  database: 'short_distancedb'
};

async function admin_login(username,password) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // The code "waits" here until the database responds
    const [rows] = await connection.execute(
      'SELECT * FROM admins WHERE admin_user = ?',
      [username]
    );

    if (rows.length > 0) {
    //    console.log(rows)
    let  data = rows[0]
    const isMatch = await bcrypt.compare(password,data['admin_pass'])
        if (isMatch) {return data}
        else {return false}
    } 
    else {
      return false; // No user found
    }

  } catch (err) {
    console.error('Database error:', err);
    throw err;
  } finally {
    if (connection) await connection.end();
  }
}
    
async function createadmin() {
    let connect;
    try {
        // 1. Ensure you use the correct mysql variable
        connect = await mysql.createConnection(dbConfig);
        
        // 2. AWAIT the hash and include salt rounds (10)
        let hashedPassword = await bcrypt.hash("1234", 10);
        
        // 3. Fix the SQL parenthesis and the table columns
        await connect.execute(
            'INSERT INTO admins (admin_user, admin_pass) VALUES (?, ?)', 
            ['admin', hashedPassword]
        );

        console.log('Admin created successfully');
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        if (connect) await connect.end();
    }
}

async function routes() {
  let connect;
  try {
    connect = await mysql.createConnection(dbConfig);
        const [routeLists] = await connect.execute("SELECT * FROM routes")
    if (routeLists.length > 0) {
      console.log(routeLists)
      return routeLists;
    }
    else {
      return false
    }
  }
  catch(err) {
    console.error(err);

  }
  finally {
    if (connect) connect.end()
  }
}

async function addRoutes(origin,destination,price) {
  price = parseFloat(price);
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    let sql = "INSERT INTO routes (id,origin,destination,price_birr) VALUES (?,?,?,?)"
    let args = [crypto.randomUUID(),origin,destination,price];
    await connection.execute(sql,args)
    await connection.commit()
  }
  catch(err) {
    console.error(err)
  }
  finally {
    await connection.end()
  }
}

async function delteRoute(routeID) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.execute("DELETE FROM routes WHERE id = ?",[routeID])
    await connection.commit()
  }
  catch(err) {
    console.error(err)
  }
  finally {
    await connection.end()
  }
}

async function tickets() {
  let connection;
  try {
connection = await mysql.createConnection(dbConfig);

let [tickets] = await connection.execute("SELECT * FROM tickets");

if (tickets.length > 0) {
  return tickets;
}
else {
  return false
}
  }
  catch(err) {
console.log(err)
return false
  }
  finally {
    await connection.end();
  }
}


module.exports = {admin_login,routes,addRoutes,delteRoute,tickets}