const Product = require("../models/Product");


   // Get User function
async function getProduct(req, res, next) {
    let product;
    try {
      product = await Product.findById(req.params.id);

      if (!user) res.status(404).json({ message: "Could not find user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.user = user;
    return next();
  }

  module.exports = { getProduct};