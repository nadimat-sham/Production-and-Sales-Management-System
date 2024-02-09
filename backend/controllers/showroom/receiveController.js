const Product = require("../../models/showroom/productModel");
const Sell = require("../../models/showroom/sellModel"); // Import the Sell model
const Customer = require("../../models/showroom/customerModel");
const Receive = require("../../models/showroom/receiveModel");
const mongoose = require("mongoose");

// receive products

const receiveProducts = async (req, res) => {
  console.log(req.body);
  const { cartReceived } = req.body;
  console.log(cartReceived);
  const cart = [];

  try {
    for (const item of cartReceived) {
      console.log(item);
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with id ${item.product_id} not found` });
      }
      console.log(product.name);
      product.inStock += item.quantity;
      const now = {
        product: product,
        quantity: item.quantity,
      };
      cart.push(now);
      await product.save();
    }
    const receive = new Receive({
      receivedProducts: cart,
    });
    await receive.save();
    res.status(200).json({ message: "Products received successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while receiving products" });
  }
};

const receiveHistory = async (req, res) => {
  try {
    const receiveHistory = await Receive.find().populate(
      "receivedProducts.product"
    );
    console.log(receiveHistory);
    res.status(200).json(receiveHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching receive history" });
  }
};

module.exports = {
  receiveProducts,
  receiveHistory,
};
