USE employeedb;

INSERT INTO department (name)
VALUES 
    ("Engineering"), 
    ("Human Resources"), 
    ("Management"), 
    ("Services");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Engineer", 80000, 1), 
    ("HR Rep", 65000, 2), 
    ("Manager", 100000, 3), 
    ("Mechanic", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Roland", "Bryce", 1, 1),
    ("Prop", "Joe", 2, 2),
    ("Avon", "Barksdale", 3, 3),
    ("Jimmy", "McNulty", 4, 4);
    

 