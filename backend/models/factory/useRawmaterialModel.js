const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const useRawmaterialSchema = new Schema(
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

module.exports = mongoose.model("UseRawmaterial", useRawmaterialSchema);
