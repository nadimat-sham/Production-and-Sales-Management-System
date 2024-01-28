const express = require("express");
const {
  sellProducts,
  sellHistory,
} = require("../../controllers/showroom/sellController");

const router = express.Router();

// POST a new sell
router.post("/sell", sellProducts);

// GET sell history
router.get("/", sellHistory);

module.exports = router;
