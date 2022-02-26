const mysql = require('mysql2')

const db = mysql.createConnection({

host: 'localhost',
user: 'root',
password: 'RanchMeBr0tendo',
database: 'employeedb'
},
console.log('Connected to the Employee database.')
);

module.exports = db;
