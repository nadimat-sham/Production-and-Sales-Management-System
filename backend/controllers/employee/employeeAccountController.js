const Employee = require('../../models/employee/employeeModel');
const EmployeeAccount = require('../../models/employee/employeeAccount');

// Get Employee Account Details
const getEmployeeAccount = async (req, res) => {
  try {
    const employeeAccount = await EmployeeAccount.findOne({ employee: req.params.employeeId });
    if (!employeeAccount) {
    console.log("vul hoise")
      return res.status(404).json({ error: 'Employee account not found' });
    }
    console.log("eikhane ashce?")

    res.json(employeeAccount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// const getAllEmployeeAccount = async (req, res) => {
//     try {
//       const employeeAccount = await EmployeeAccount.findOne({ employee: req.params.employeeId });
//       if (!employeeAccount) {
//       console.log("vul hoise")
//         return res.status(404).json({ error: 'Employee account not found' });
//       }
//       console.log("eikhane ashce?")
  
//       res.json(employeeAccount);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Server Error' });
//     }
//   };

// Add Salary to Employee Account
const addSalary = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employeeAccount = await EmployeeAccount.findOne({ employee: req.params.employeeId });
    if (!employeeAccount) {
      return res.status(404).json({ error: 'Employee account not found' });
    }

    // Add salary to the employee's account
    employeeAccount.totalMoney += employee.salary;
    employeeAccount.history.push({
      type: 'Credited',
      amount: employee.salary,
      date: new Date(),
    });
    await employeeAccount.save();

    res.json({ message: 'Salary added to the employee account' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Withdraw Salary from Employee Account
const withdrawSalary = async (req, res) => {
  try {
    const employeeAccount = await EmployeeAccount.findOne({ employee: req.params.employeeId });
    if (!employeeAccount) {
      return res.status(404).json({ error: 'Employee account not found' });
    }

    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: 'Withdrawal amount is required' });
    }

    if (employeeAccount.totalMoney < amount) {
      return res.status(400).json({ error: 'Insufficient account balance' });
    }

    // Withdraw salary from the employee's account
    employeeAccount.totalMoney -= amount;
    employeeAccount.history.push({
      type: 'Debited',
      amount: amount,
      date: new Date(),
    });
    await employeeAccount.save();

    res.json({ message: 'Salary withdrawn from the employee account' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {addSalary, withdrawSalary, getEmployeeAccount};