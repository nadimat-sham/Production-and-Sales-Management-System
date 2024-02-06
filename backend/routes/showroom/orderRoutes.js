const express = require("express");
const {
  orderProducts,
  orderHistory,
} = require("../../controllers/showroom/orderToFactoryController");

const router = express.Router();

// POST a new sell
router.post("/order", orderProducts);

// GET sell history
router.get("/history/order", orderHistory);

module.exports = router;
