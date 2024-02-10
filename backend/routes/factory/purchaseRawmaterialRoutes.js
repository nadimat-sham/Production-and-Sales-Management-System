const express = require("express");
const {
  receiveProducts,
  receiveHistory,
} = require("../../controllers/factory/purchaseRawmaterialController");

const router = express.Router();

// POST a new sell
router.post("/purchase", receiveProducts);

// GET sell history
router.get("/history/purchase", receiveHistory);

module.exports = router;
