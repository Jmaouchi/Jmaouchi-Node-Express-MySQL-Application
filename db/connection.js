const mysql = require('mysql2');
require('dotenv').config();


// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.JAWSDB_URL,
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    // databse name
    database: process.env.DB_NAME
  },
  console.log('Connected to the election database.')
);


module.exports = db;