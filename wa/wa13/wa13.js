// problem 1
let company_employees = 
    '{ "employees" : [' +
    '{ "first_name":"Sam" , "department":"Tech" , "designation":"manager" , "salary":"40000" , "raise_eligible":"true"},' +
    '{ "first_name":"Mary" , "department":"Finance" , "designation":"trainee" , "salary":"18500" , "raise_eligible":"true"},' +
    '{ "first_name":"Bill" , "department":"HR" , "designation":"executive" , "salary":"21200" , "raise_eligible":"false"},' +
    '{ "first_name":"Anna" , "department":"Rech" , "designation":"executive" , "salary":"25600" , "raise_eligible":"false"}]}';

let company_data = JSON.parse(company_employees);

let first_employee = company_data.employees[0];
let second_employee = company_data.employees[1];
let third_employee = company_data.employees[2];

console.log("Problem 1:\n");
console.log("Employee 1:\n    First Name: " + first_employee.first_name + "\n    Department: " + first_employee.department + "\n    Designation: " + first_employee.designation + "\n    Salary: " + first_employee.salary , "\n    Raise Eligible: " + first_employee.raise_eligible);
console.log("Employee 2:\n    First name: " + second_employee.first_name + "\n    Department: " + second_employee.department + "\n    Designation: " + second_employee.designation + "\n    Salary: " + second_employee.salary , "\n    Raise Eligible: " + second_employee.raise_eligible);
console.log("Employee 3:\n    First Name: " + third_employee.first_name + "\n    Department: " + third_employee.department + "\n    Designation: " + third_employee.designation + "\n    Salary: " + third_employee.salary , "\n    Raise Eligible: " + third_employee.raise_eligible);

// problem 2
let company_info = 
    {"Company": [{"company_name":"Tech Stars" , "Website":"www.techstars.site" , "Employees":company_employees}]};

let company_employees_array = company_data.employees;

console.log("Problem 2:\n");
console.log("Company Name: " + company_info.Company[0].company_name);
console.log("Website: " + company_info.Company[0].Website);
console.log("Employees: " + company_employees_array[0].first_name + ", " + company_employees_array[1].first_name + ", " + company_employees_array[2].first_name);

//problem 3
let fourth_employee = company_data.employees[3];

console.log("Problem 3:\n");
console.log("NEW EMPLOYEE: Employee 4:\n    First Name: " + fourth_employee.first_name + "\n    Department: " + fourth_employee.department + "\n    Designation: " + fourth_employee.designation + "\n    Salary: " + fourth_employee.salary , "\n    Raise Eligible: " + fourth_employee.raise_eligible);

//problem 4
let totalSalary = 0;

for (let i = 0; i < company_data.employees.length; i++) {
    totalSalary += parseInt(company_data.employees[i].salary);
}

console.log("Problem 4:\n");
console.log("Total Salary of all employees: " + totalSalary);

//problem 5
function give_raise(employee) {
    if (employee.raise_eligible==="true") {
      let employee_salary = parseInt(employee.salary);
      let raise_amount = employee_salary * 0.1;
      employee_salary += raise_amount;
      employee.employee_salary = employee_salary.toString();
      employee.raise_eligible = "false";
      console.log(employee.first_name + " received a raise of " + raise_amount.toFixed(2) + " - their new salary is " + employee.employee_salary + "!");
    } else {
      console.log(employee.first_name + " is not eligible for a raise.");
    }
}

console.log("Problem 5:\n");
give_raise(first_employee);
give_raise(second_employee);
give_raise(third_employee);
give_raise(fourth_employee);

//problem 6
let working_from_home = ["Anna", "Sam"];

for (let i=0; i<company_data.employees.length; i++) {
    if (working_from_home.includes(company_data.employees[i].first_name)) {
      company_data.employees[i].wfh = true;
    } else {
      company_data.employees[i].wfh = false;
    }
}

let updated_company_employees = JSON.stringify(company_data);

console.log("Problem 6:\n");
console.log("Employee 1:\n    First Name: " + first_employee.first_name + "\n    Working from home: " + first_employee.wfh + "\nEmployee 2:\n    First Name: " + second_employee.first_name + "\n    Working from home: " + second_employee.wfh + "\nEmployee 3:\n    First Name: " + third_employee.first_name + "\n    Working from home: " + third_employee.wfh + "\nEmployee 4:\n    First Name: "+ fourth_employee.first_name + "\n    Working from home: " + fourth_employee.wfh);