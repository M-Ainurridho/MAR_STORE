const { response } = require("../response");
const Product = require("../models/model-product");
const User = require("../models/model-user");

const getAllProducts = async (req, res) => {
   const data = await Product.find();

   return response(200, "Get All Products", res, data);
};

const getProductByCategory = async (req, res) => {
   const { category, sub_category } = req.params;
   const data = await Product.find({ sub_category: sub_category.toLowerCase() });

   if (data.length > 0) {
      return response(200, "Get Product By Category", res, data);
   } else {
      return response(404, "Product Category Not Found", res, data);
   }
};

const searchProduct = async (req, res) => {
   const { search } = req.params;
   const data = await Product.find();

   const filterData = data.filter(({ name }) => name.toLowerCase().match(search.toLowerCase()));

   if (filterData.length > 0) {
      return response(200, "Get Product By Category", res, filterData);
   } else {
      return response(404, "Product Category Not Found", res);
   }
};

const getProductById = async (req, res) => {
   try {
      const { _id } = req.params;
      const data = await Product.findOne({ _id: _id });

      if (data !== null) {
         return response(200, "Get Product By Id", res, data);
      } else {
         return response(404, "Product Not Found", res);
      }
   } catch (err) {
      console.log(err);
   }
};


module.exports = {
   getAllProducts,
   getProductByCategory,
   searchProduct,
   getProductById,
};
