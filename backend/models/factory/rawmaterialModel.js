const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const factoryRawmaterialSchema = new Schema(
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

module.exports = mongoose.model("FactoryRawmaterial", factoryRawmaterialSchema);
