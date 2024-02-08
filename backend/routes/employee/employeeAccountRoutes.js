const express = require('express');
const router = express.Router();
const {
    addSalary, 
    withdrawSalary, 
    getEmployeeAccount
  } = require("../../controllers/employee/employeeAccountController");
  

router.post('/:employeeId/withdraw', withdrawSalary)
router.post('/:employeeId/add', addSalary)
router.get('/:employeeId', getEmployeeAccount)


module.exports = router;