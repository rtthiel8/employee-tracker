const db = require('./db/connection')

const mysql = require('mysql2');
const { prompt } = require('inquirer');
const cTable = require('console.table');


const PORT = process.env.PORT || 3008;


function init() {
     return prompt([
         {
             type: 'list',
             name: 'start',
             message: 'What would you like to do?',
             choices: ['View All Employees', 
                        'Add Employee', 
                        'Update Employee Role', 
                        'View All Roles', 
                        'Add Role', 
                        'View All Departments', 
                        'Add Department']
         }
     ])
     .then(answers => {
         
        if (answers.start === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, rows) => {
            console.table(rows);
        });
        }

        if (answers.start === 'Add Employee') {
            return prompt([
                {
                    type: 'input',
                    name: 'firstname',
                    message: 'What is the employees first name?'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'What is the employees last name?'
                },
                {
                    type: 'input',
                    name: 'roleid',
                    message: 'What is the employees role?'
                },
                {
                    type: 'input',
                    name: 'managerid',
                    message: 'Who is the employees manager?'
                }
            ])
            .then(bio => {
                db.query(`INSERT INTO employee SET ?`, {
                    first_name: bio.firstname,
                    last_name: bio.lastname,
                    role_id: bio.roleid,
                    manager_id: bio.managerid
                })
            })
        }
         
        if (answers.start === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, rows) => {
                console.table(rows);
        });
        }

        if (answers.start === 'Add Role') {
            return prompt([
                {
                    type: 'input',
                    name: 'rolename',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'rolesalary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'input',
                    name: 'roledept',
                    message: 'Which department does the role belong to?'
                }
            ])
            .then(roleinfo => {
                db.query(`INSERT INTO role SET ?`, {
                    title: roleinfo.rolename,
                    salary: roleinfo.rolesalary,
                    department_id: roleinfo.roledept
                })
            })
        }

        if (answers.start === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, rows) => {
                console.table(rows)
        });
        }

        if (answers.start === 'Add Department') {
            return prompt([
                {
                    type: 'input',
                    name: 'deptname',
                    message: 'What is the name of the department?'
                }
            ])
            .then(deptinfo => {
                db.query(`INSERT INTO department SET ?`, {
                    name: deptinfo.deptname
                })
            })
        }

      });
  };

  init();
