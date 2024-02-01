const express = require("express");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../../controllers/showroom/customerController");

const router = express.Router();

// GET all customers
router.get("/", getCustomers);

// GET a single customer
router.get("/:id", getCustomer);

// POST a new customer
router.post("/add", createCustomer);

// DELETE a customer
router.delete("/:id", deleteCustomer);

// UPDATE a customer
router.patch("/:id", updateCustomer);

module.exports = router;
