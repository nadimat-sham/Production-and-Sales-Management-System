const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getSingleEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../../controllers/employee/employeeController");

router.post("/add", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getSingleEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
