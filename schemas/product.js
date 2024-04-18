const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  brand: { type: String },
  category: { type: String, require: true },
  quantity: { type: Number },
  processor: { type: String },
  memory: { type: Object },
  operatingSystem: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
