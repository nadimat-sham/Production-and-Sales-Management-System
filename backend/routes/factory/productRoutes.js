const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/factory/productController");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

// POST a new product
router.post("/add", createProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

// UPDATE a product
router.put("/:id", updateProduct);

module.exports = router;
