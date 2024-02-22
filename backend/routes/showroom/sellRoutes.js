const express = require("express");
const {
  sellProducts,
  sellHistory,
  sellDelete,
} = require("../../controllers/showroom/sellController");

const router = express.Router();
// const requireAuth = require("../../middlewares/requireAuth");

// router.use(requireAuth);

// POST a new sell
router.post("/sell", sellProducts, () => {
  console.log("sell products");
});

// GET sell history
router.get("/history/sell", sellHistory, () => {
  console.log("sell history");
});

//delete sell history
router.delete("/history/sell/:id", sellDelete);

module.exports = router;
