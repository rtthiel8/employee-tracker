USE employeedb;

INSERT INTO department (name)
VALUES 
    ("Engineering"), 
    ("Human Resources"), 
    ("Management"), 
    ("Services");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Engineer",80000,1), 
    ("HR Rep",65000,2), 
    ("Manager",100000,3), 
    ("Mechanic",50000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Ryan", "Thiel", 1, 1),
    ("Joe", "Johnson", 2, 2),
    ("Bill", "Burker", 3, 3),
    ("Tom", "Walsh", 4, 4);


 