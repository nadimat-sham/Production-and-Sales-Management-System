const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../../models/factory/rawmaterialModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/factory/rawmaterialController");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

// POST a new product
router.post("/add", createProduct);

router.post("/upload", upload.single("file"), async (req, res) => {
  // console.log(req.file);
  const { id } = req.body;
  // console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  product.image = req.file.filename;

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
});

// DELETE a product
router.delete("/:id", deleteProduct);

// UPDATE a product
router.put("/:id", updateProduct);

module.exports = router;
