const express = require("express");
const {
  receiveProducts,
  receiveHistory,
} = require("../../controllers/factory/useRawmaterialController");

const router = express.Router();

// POST a new sell
router.post("/use", receiveProducts);

// GET sell history
router.get("/history/use", receiveHistory);

module.exports = router;
