const Employee = require("../../models/employee/employeeModel");
const Account = require("../../models/employee/employeeAccount");

// Create an employee
const createEmployee = async (req, res) => {
  console.log("indie createEmployee");
  const { name, position, email, phone, address, salary, hireDate } = req.body;
  console.log();
  try {
    const employee = await Employee.create({
      name,
      position,
      email,
      phone,
      address,
      salary,
      hireDate,
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: "Failed to create employee" });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  console.log("indie getAllEmployees");
  try {
    const employees = await Employee.find();
    const searchQuery = req.query.search;
    let filteredEmployees = employees;

    if (searchQuery) {
      filteredEmployees = employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.position.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    res.json(filteredEmployees);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve employees" });
  }
};

// Get an employee by ID
const getSingleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(200).json({ error: "Failed to retrieve employee" });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: "Failed to update employee" });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    const account = await Account.findOne({ employee: employee._id });

    if (account) {
      await Account.findByIdAndDelete(account._id);
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  deleteEmployee,
  updateEmployee,
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
};
