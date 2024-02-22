const Product = require("../../models/showroom/productModel");
const Order = require("../../models/showroom/orderToFactoryModel"); // Import the Order model
//const Customer = require("../../models/showroom/customerModel");
const mongoose = require("mongoose");

// order products

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  //console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const order = await Order.findById(id);
  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }
  order.status = status;
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
};

module.exports = {
  updateOrder,
};
