const express = require('express');
const router = express.Router();
const {
    postAttendance,
    getAttendance,
    getAttendanceBySearch,
    deleteAttendance,
  } = require("../../controllers/employee/employeeAttendanceController");
  
router.get('/', getAttendance)
router.get('/search', getAttendanceBySearch)
router.post('/add', postAttendance)
router.delete('/:id', deleteAttendance)

module.exports = router