const mysql = require("mysql");

const db = mysql.createConnection({
  host: "crud-app.c3ykscuuyhon.us-east-1.rds.amazonaws.com",
  user: "admin", // Replace with your MySQL username
  password: "$995949KKk", // Replace with your MySQL password
  database: "crudapp", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = db;
