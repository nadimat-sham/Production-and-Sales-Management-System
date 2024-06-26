const Product = require("../../models/showroom/productModel");
const Sell = require("../../models/showroom/sellModel"); // Import the Sell model
const Customer = require("../../models/showroom/customerModel");
const mongoose = require("mongoose");

// sell products

const sellProducts = async (req, res) => {
  //console.log("sell products adfsafafd");
  // console.log(req.body);
  const { cart, referenceName } = req.body;
  const soldProducts = cart;
  const mobile = referenceName;
  // console.log("beginning");
  // console.log(soldProducts);
  // console.log("ending");
  try {
    const customer = await Customer.findOne({ mobile: mobile });
    const sell = new Sell({
      soldProducts: [],
      name: customer.name,
      mobile: customer.mobile,
    });
    // console.log(soldProducts.length + "length");
    for (const item of soldProducts) {
      const product = await Product.findById(item.product._id);
      // console.log(product + "product");

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
      product.sold = Number(product.sold) + Number(item.quantity);
      const now = {
        product: product,
        quantity: item.quantity,
      };
      // console.log(now, " now is here");
      sell.soldProducts.push(now);
      await product.save();
    }
    customer.purchases.push(sell);
    await customer.save();
    // console.log("erererer");
    // console.log(sell);
    await sell.save();
    // console.log("eedssssssssssssssss");

    res.status(200).json({ message: "Products sold successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while selling products" });
  }
};

const sellHistory = async (req, res) => {
  //console.log("sell history");
  try {
    // const sellHistory = await Sell.find({}).sort({ createdAt: -1 });
    const sellHistory = await Sell.find().populate("soldProducts.product");
    //console.log(sellHistory);
    res.status(200).json(sellHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching sell history" });
  }
};

// delete a sell
const sellDelete = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const single = await Sell.findByIdAndDelete(id);

  if (!single) {
    return res.status(404).json({ error: "Entry not found" });
  }
  res.status(200).json(single);
};

module.exports = {
  sellProducts,
  sellHistory,
  sellDelete,
};
