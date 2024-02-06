const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const receiveSchema = new Schema(
  {
    soldProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
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

module.exports = mongoose.model("Receive", recieveSchema);
