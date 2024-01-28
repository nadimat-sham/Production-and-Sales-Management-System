const Product = require("../../models/showroom/productModel");
const Sell = require("../../models/showroom/sellModel"); // Import the Sell model
const mongoose = require("mongoose");

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// get a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// create a new product
const createProduct = async (req, res) => {
  const { name, catagory, price, inStock } = req.body;
  console.log(req.body);
  // add to the database
  try {
    const product = await Product.create({ name, catagory, price, inStock });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// sell products

const sellProducts = async (req, res) => {
  const soldProducts = req.body;

  try {
    const sell = new Sell({ soldProducts: [] });

    for (let item of soldProducts) {
      const product = await Product.findById(item.product._id);

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

      await product.save();

      sell.soldProducts.push({
        product: product,
        quantity: item.quantity,
      });
    }

    await sell.save();

    res.status(200).json({ message: "Products sold successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while selling products" });
  }
};

const sellHistory = async (req, res) => {
  try {
    const sellHistory = await Sell.find({}).sort({ createdAt: -1 });
    res.status(200).json(sellHistory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching sell history" });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  //   return;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  sellProducts,
  sellHistory,
};
