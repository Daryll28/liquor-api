require("dotenv").config;
const express = require("express");
const Product = require("../models/Product");
const auth = require("../Middleware/auth");
const { getProduct } = require("../Middleware/getProduct");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one product
router.get("/products/:id", [auth, getProduct], (req, res, next) => {
  res.send(res.product);
});

// CREATE a product
router.post("/", async (req, res, next) => {
  console.log("product passed here")
  const { name, category, img, price } = req.body;

  let product;

  img
    ? (product = new Product({
        name,
        category,
        img,
        price,
      }))
    : (product = new Product({
      name,      
      category,
      img,
      price,
        // author: req.user._id,
      }));

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a product
router.put("/:id", [auth, getProduct], async (req, res, next) => {
  if (req.user._id !== res.product.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this product" });
  const { name, price, category, img } = req.body;
  if (name) res.product.name = name;
  if (price) res.product.price = price;
  if (category) res.product.category = category;
  if (img) res.product.img = img;

  try {
    const updatedProduct = await res.product.save();
    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETing a product 
router.delete("/:id", [ getProduct], async (req, res, next) => {
  if (req.user._id !== res.product._id)
    res
      .status(400)
      .json({ message: "You do not have the permission to delete this product" });
  try {
    await res.product.remove();
    res.json({ message: "Deleted product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
