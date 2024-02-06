const Product = require("../../models/showroom/productModel");
const Order = require("../../models/showroom/orderToFactoryModel"); // Import the Order model
//const Customer = require("../../models/showroom/customerModel");
const mongoose = require("mongoose");

// order products

const orderProducts = async (req, res) => {
  console.log(req.body);
  const { orderCart } = req.body;
  const orderedProducts = orderCart;
  // console.log("beginning");
  // console.log(soldProducts);
  // console.log("ending");
  try {
    //const customer = await Customer.findOne({ mobile: mobile });
    const order = new Order({
      orderedProducts: []
    });
    //console.log(soldProducts.length + "length");
    for (const item of orderedProducts) {
      const product = await Product.findById(item.product._id);
      //console.log(product + "product");

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with id ${item.product._id} not found` });
      }

      //product.inStock -= item.quantity;
      //product.sold += item.quantity;
      product.ordered += item.quantity;
      const now = {
        product: product,
        quantity: item.quantity,
      };
      //console.log(now, " now is here");
      order.orderedProducts.push(now);
      //customer.purchases.push(sell);
      //await customer.save();
      await product.save();
    }
    // console.log("erererer");
    // console.log(sell);
    // await sell.save();
    // console.log("eedssssssssssssssss");
    await order.save();

    res.status(200).json({ message: "Products ordered successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while ordering products" });
  }
};

const orderHistory = async (req, res) => {
  try {
    // const sellHistory = await Sell.find({}).sort({ createdAt: -1 });
    const orderHistory = await Order.find().populate("orderedProducts.product");
    //console.log(sellHistory);
    res.status(200).json(orderHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching order history" });
  }
};

// delete an order
const orderDelete = async (req,res)=>{
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id' });
  }

  const single = await Order.findByIdAndDelete(id);
  
  if (!single) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  res.status(200).json(single);
};

module.exports = {
  orderProducts,
  orderHistory,
  orderDelete,
};
