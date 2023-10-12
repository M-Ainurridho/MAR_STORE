const router = require("express").Router();
const { product } = require("../controllers");

router.get("/", product.getAllProducts);
router.get("/search/:search", product.searchProduct);
router.get("/detail/:_id", product.getProductById);
router.get("/:category/:sub_category", product.getProductByCategory);

module.exports = router;
