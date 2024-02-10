const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseRawmaterialSchema = new Schema(
  {
    receivedProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "FactoryRawmaterial",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseRawmaterial", purchaseRawmaterialSchema);
