const Product = require("../../models/showroom/productModel");
const Sell = require("../../models/showroom/sellModel"); // Import the Sell model
const mongoose = require("mongoose");

// sell products

const sellProducts = async (req, res) => {
  const soldProducts = req.body;
  console.log("beginning");
  console.log(soldProducts);
  console.log("ending");
  try {
    const sell = new Sell({ soldProducts: [] });
    console.log(soldProducts.length + "length");
    for (const item of soldProducts) {
      const product = await Product.findById(item.product._id);
      console.log(product + "product");

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with id ${item.product._id} not found` });
      }

      if (product.inStock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Not enough stock for product ${item.product._id}` });
      }

      product.inStock -= item.quantity;
      product.sold += item.quantity;
      const now = {
        product: product,
        quantity: item.quantity,
      };
      console.log(now, " now is here");
      sell.soldProducts.push(now);
      await product.save();
    }
    console.log("erererer");
    // console.log(sell);
    await sell.save();
    console.log("eedssssssssssssssss");

    res.status(200).json({ message: "Products sold successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while selling products" });
  }
};

const sellHistory = async (req, res) => {
  try {
    // const sellHistory = await Sell.find({}).sort({ createdAt: -1 });
    const sellHistory = await Sell.find().populate("soldProducts.product");
    console.log(sellHistory);
    res.status(200).json(sellHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching sell history" });
  }
};

module.exports = {
  sellProducts,
  sellHistory,
};
