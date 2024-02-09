const express = require('express');
const router = express.Router();
const {
    getPerformance,
    deletePerformance
  } = require("../../controllers/employee/employeePerformanceController");
  

router.get('/', getPerformance);
router.delete('/:id', deletePerformance);


module.exports = router