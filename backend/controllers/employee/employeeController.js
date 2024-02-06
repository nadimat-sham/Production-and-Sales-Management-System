const Employee = require('../../models/employee/employeeModel');

// Create an employee
const createEmployee = async (req, res) => {
    try {
      const employee = await Employee.create(req.body);
      console.log(employee)
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create employee' });
    }
}

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve employees' });
  }
}

// Get an employee by ID
const getSingleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee){
      return res.status(400).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(200).json({ error: 'Failed to retrieve employee' });
  }
}



// Update an employee
updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(400).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
}



// Delete an employee
deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(400).json({ error: 'Employee not found' });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
}

module.exports = {
    deleteEmployee,
    updateEmployee,
    getAllEmployees,
    getSingleEmployee,
    createEmployee
}