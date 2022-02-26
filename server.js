const express = require('express');
const mysql = require('mysql2');
const { prompt } = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3008;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'RanchMeBr0tendo',
      database: 'employeedb'
    },
    console.log('Connected to the Employee database!')
  );


function init() {
     return prompt([
         {
             type: 'list',
             name: 'start',
             message: 'What would you like to do?',
             choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
         }
     ])
     .then(answers => {
         if (answers.start === 'View All Employees') {

     //       Get all employees
    app.get('/api/employees', (req, res) => {
        const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

      // Add employee
//           if (answers.start === 'Add Employee') {
            //  app.post('/api/employee', ({ body }, res) => {
            //        const sql = `INSERT into employee (first_name, last_name, role_id, manager_id)
            //        VALUES (?,?,?,?)`;
            //        const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
            //        db.query(sql, params, (err, result) => {
            //            if (err) {
            //                res.status(400).json({ error: err.message });
            //                return;
            //            }
            //            res.json({
            //                message: 'Success!',
            //                data: body
            //            });
            //        });
            //    });


        // db.query(`SELECT * FROM employee`, (err, rows) => {
        //     console.table(rows);
        // });
        // } 

        // if (answers.start === 'View All Roles') {
        //     db.query(`SELECT * FROM role`, (err, rows) => {
        //         console.table(rows);
        // });
        // }

        // if (answers.start === 'View All Departments') {
        //     db.query(`SELECT * FROM department`, (err, rows) => {
        //         console.table(rows)
        // });
         }

      });
  };

  init();

 // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});