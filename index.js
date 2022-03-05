const db = require('./db/connection')
const mysql = require('mysql2');
const { prompt } = require('inquirer');
const cTable = require('console.table');
const ExpandPrompt = require('inquirer/lib/prompts/expand');

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
                'Add Department',
                'Quit'
            ]
        }
    ])
        .then(answers => {
            if (answers.start === 'View All Employees') {
                viewEmployees();
            }
            if (answers.start === 'Add Employee') {
                addEmployee();
            }
            if (answers.start === 'Update Employee Role') {
                updateEmployeeRole();
                //changeRole();
            }
            if (answers.start === 'View All Roles') {
                viewRoles();
            }
            if (answers.start === 'Add Role') {
                addRole();
            }
            if (answers.start === 'View All Departments') {
                viewDepts();
            }
            if (answers.start === 'Add Department') {
                addDept();
            }
            if (answers.start === 'Quit') {
                endPrompt();
            }
        });
};

function viewEmployees() {
    db.query(`
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title, 
            d.name department, 
            r.salary, 
            CONCAT(e2.first_name, ' ', e2.last_name) AS manager 
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON r.department_id = d.id 
        JOIN employee e2
        ON e.manager_id = e2.id
        `, (err, rows) => {
        console.table('\n\r', rows);
    })
    init();
};

function addEmployee() {
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
            init();
        });
};

function updateEmployeeRole() {
    db.query('SELECT CONCAT(first_name," ", last_name) name FROM employee', (err, res) => {
        return prompt([
            {
                type: 'list',
                name: 'updateWho',
                message: 'Which employees role would you like to update?',
                choices: res.map(x => x.name)
            }
        ])
            .then(answer => {
                console.log(answer);
                //changeRole(answer);
                const updateEmployee = (answer.updateWho)
                const firstName = updateEmployee.substring(0, updateEmployee.indexOf(' '))
                console.log(updateEmployee)
                db.query('SELECT * FROM role', (err, res) => {
                    if (err) {
                        throw(err);
                    }
                            return prompt([
                                {
                                    type: 'list',
                                    name: 'role_id',
                                    message: 'Which role do you want to assign the selected employee?',
                                    choices: res.map(role => role.title)
                                }
                            ])
                            .then(answer => {
                    //            console.log(answer);
                //                console.log(role);
                                const newRole = res.find(role => role.title === answer.role_id)
                      //          console.log(newRole);
                                db.promise().query(`UPDATE employee SET role_id = ${newRole.id} WHERE first_name = '${firstName}'`)
                                .then(
                                console.log(updateEmployee + " has been updated to " + newRole.title))
                                .catch(err => console.log(err))
                                init();
                            })
                        })
            })
    })
}

// function changeRole() {
//     db.query('SELECT * FROM role', (err, row) => {
//         return prompt([
//             {
//                 type: 'list',
//                 name: 'newRole',
//                 message: 'Which role do you want to assign the selected employee?',
//                 choices: row.map(x => x.role_id)
//             }
//         ])
//         .then(answer => {
//             console.log(answer);
//         })
//     })
// }

function viewRoles() {
    db.query(`SELECT * FROM role`, (err, rows) => {
        console.table('\n\r', rows);
    });
    init();
};

function addRole() {
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
            init();
        });
};

function viewDepts() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        console.table('\n\r', rows)
    });
    init();
};

function addDept() {
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
            init();
        });
};

function endPrompt() {
    console.log('Good bye!');
}

init();
