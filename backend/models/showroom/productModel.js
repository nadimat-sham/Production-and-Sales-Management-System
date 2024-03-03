const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productionCost: {
      type: Number,
      required: true,
      default: 100,
    },
    sold: {
      type: Number,
      required: false,
      default: 0,
    },
    inStock: {
      type: Number,
      required: true,
    },
    ordered: {
      type: Number,
      required: false,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
