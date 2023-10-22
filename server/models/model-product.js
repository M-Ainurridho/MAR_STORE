const { default: mongoose, Schema } = require("mongoose");

const ProductSchema = new Schema({
   name: String,
   category: String,
   sub_category: String,
   brand: String,
   images: [String],
   price: Number,
   stock: Number,
   discount: Number,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
