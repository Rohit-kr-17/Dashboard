const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth");
const {
	createProduct,
	deleteProduct,
	updateProduct,
	getProduct,
} = require("../controller/ProductController");
router.post("/create-product", isAuth, createProduct);
router.post("/delete-product", isAuth, deleteProduct);
router.put("/update-product/:productId", isAuth, updateProduct);
router.get("/get-product", isAuth, getProduct);
router.delete("/delete-product/:productId", isAuth, deleteProduct);
module.exports = router;
