const express = require("express");
const {
  orderProducts,
  orderHistory,
  orderDelete,
} = require("../../controllers/showroom/orderToFactoryController");

const router = express.Router();

// POST a new order
router.post("/order", orderProducts);

// GET order history
router.get("/history/order", orderHistory);

//delete order history
router.delete("/history/order/:id", orderDelete);

module.exports = router;
