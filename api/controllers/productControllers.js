const Product = require("../models/Product");

const createNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        // take everything and insert
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // return everything except the password
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req, res) => {
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;
  try {
    let products;
    // http://localhost:5000/api/products
    // http://localhost:5000/api/products?new=true
    if (newQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (categoryQuery) {
      // http://localhost:5000/api/products?category=slipper
      products = await Product.find({
        categories: {
          $in: [categoryQuery],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
};
