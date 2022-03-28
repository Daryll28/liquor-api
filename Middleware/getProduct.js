const Product = require("../models/Product");


   // Get User function
async function getProduct(req, res, next) {
    let product;
    try {
      product = await Product.findById(req.params.id);

      if (!product) res.status(404).json({ message: "Could not find product" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.product = product;
    return next();
  }

  module.exports = { getProduct};