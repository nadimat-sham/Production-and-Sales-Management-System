const express = require("express");
const { updateOrder } = require("../../controllers/factory/orderController");

const router = express.Router();

// UPDATE a product
router.put("/:id", updateOrder);

module.exports = router;
