const express = require("express");
const {
  sellProducts,
  sellHistory,
  sellDelete,
} = require("../../controllers/showroom/sellController");

const router = express.Router();

// POST a new sell
router.post("/sell", sellProducts);

// GET sell history
router.get("/history/sell", sellHistory);

//delete sell history
router.delete("/history/sell/:id", sellDelete)

module.exports = router;
