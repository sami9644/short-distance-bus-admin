# Short-Distance Bus Admin Panel

## Project Description

The `short-distance-bus-admin` project is a robust administration panel designed to manage operations for a short-distance bus transportation system. Built with Node.js and Express.js, this application provides administrators with a secure dashboard to oversee critical aspects such as bus routes, ticket management, and user authentication. It features a simple, intuitive web interface for effective control over the bus system's backend.

## Key Features & Benefits

*   **Secure Administrator Authentication**: Utilizes `bcrypt` for password hashing and `express-session` with `cookie-parser` for secure session management, ensuring only authorized personnel can access the admin panel.
*   **Intuitive Dashboard**: A centralized dashboard provides an overview and quick access to various administrative functionalities.
*   **Bus Route Management**: Functionality to manage and maintain bus routes, including creation, modification, and deletion (inferred from `manage_routes.ejs`).
*   **Ticket Management**: Tools for handling and overseeing ticket sales, reservations, and passenger information (inferred from `tickets.ejs`).
*   **MySQL Database Integration**: Seamless integration with a MySQL database for reliable storage and retrieval of all operational data.
*   **EJS Templating**: Dynamic rendering of web pages using EJS, ensuring a flexible and maintainable user interface.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (LTS version recommended).
*   **npm**: Node Package Manager, which comes bundled with Node.js.
*   **MySQL Database Server**: [Download & Install MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

The project's backend dependencies are managed via `package.json` and will be installed using npm:

*   `bcrypt`: For password hashing.
*   `cookie-parser`: For parsing cookies.
*   `express`: The web framework for Node.js.
*   `express-session`: For session management.
*   `mysql2`: A MySQL client for Node.js.

Development Dependencies (optional, but recommended for development):

*   `nodemon`: Automatically restarts the Node.js application when file changes are detected.

## Installation & Setup Instructions

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/sami9644/short-distance-bus-admin.git
cd short-distance-bus-admin
```

### 2. Set Up MySQL Database

1.  **Create Database**: Log in to your MySQL server and create a new database named `short_distancedb`.

    ```sql
    CREATE DATABASE short_distancedb;
    USE short_distancedb;
    ```

2.  **Run Schema & Initial Data**: Execute the SQL queries from `public/queries.sql` to set up the necessary tables and any initial data.

    ```sql
    -- Example content if queries.sql exists and has table creation
    -- Assumes queries.sql contains necessary CREATE TABLE statements
    -- You would typically run this via a MySQL client like MySQL Workbench or the command line:
    -- mysql -u root -p short_distancedb < public/queries.sql
    ```
    *Note: Please refer to the actual `public/queries.sql` file for the exact schema.*

### 3. Configure Database Connection

Open `database.js` and update the `dbConfig` object with your MySQL credentials:

```javascript
const dbConfig = {
  host: 'localhost', // Your MySQL host
  user: 'root',      // Your MySQL username
  password: 'Sami@4998', // Your MySQL password
  database: 'short_distancedb' // The database name you created
};
```

### 4. Install Node.js Dependencies

Navigate to the project root directory and install all required packages:

```bash
npm install
```

### 5. Create an Admin User

The `create_admin.js` script is provided to create an initial administrator account. You might need to modify it to add specific username and password, then run it once:

```bash
node create_admin.js
```
*Note: This script will likely prompt for username/password or use hardcoded values for initial setup. Review its content before running.*

### 6. Start the Application

You can start the application using `node` or `nodemon` (if installed globally or as a dev dependency).

**For Development (with nodemon):**

```bash
nodemon index.js
```

**For Production:**

```bash
node index.js
```

The application will typically run on `http://localhost:3000`.

## Usage Examples

Once the server is running, you can access the admin panel through your web browser:

1.  **Access Login Page**: Open your browser and go to `http://localhost:3000`.
2.  **Login**: Use the administrator credentials created earlier (or configured in `create_admin.js`) to log in.
3.  **Navigate Dashboard**: Upon successful login, you will be redirected to the admin dashboard. From there, you can navigate to different sections like "Manage Routes" or "Tickets" to perform administrative tasks.
    *   **Dashboard**: `http://localhost:3000/dashboard`
    *   **Manage Routes**: `http://localhost:3000/manage-routes` (inferred)
    *   **Tickets**: `http://localhost:3000/tickets` (inferred)

## Configuration Options

The following can be configured by modifying the respective files:

*   **Database Credentials**:
    *   File: `database.js`
    *   Options: `host`, `user`, `password`, `database` for MySQL connection.
*   **Server Port**:
    *   File: `index.js`
    *   Variable: `PORT` (default is `3000`).
*   **Session Secret**:
    *   File: `index.js`
    *   Variable: `secret` within `app.use(session(...))`. **It's crucial to change this to a strong, random string for production environments.**

## Contributing Guidelines

We welcome contributions to the `short-distance-bus-admin` project! To contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes** and ensure they adhere to the existing coding style.
4.  **Commit your changes** with clear and descriptive commit messages.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** against the `main` branch of this repository, explaining your changes and their purpose.

## License Information

This project is licensed under the **MIT License**. For more details, see the `LICENSE` file in the repository (or inferred from `package.json`).

```
MIT License

Copyright (c) 2024 sami9644

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

*   Developed by [sami9644](https://github.com/sami9644).
*   Built with the power of Node.js, Express.js, MySQL, and EJS.
*   Special thanks to the open-source community for providing invaluable libraries and tools.