const express = require("express");
const {
  receiveProducts,
  receiveHistory,
} = require("../../controllers/showroom/receiveController");

const router = express.Router();

// POST a new sell
router.post("/receive", receiveProducts);

// GET sell history
router.get("/history/receive", receiveHistory);

module.exports = router;
