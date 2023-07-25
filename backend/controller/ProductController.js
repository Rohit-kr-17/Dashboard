const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
exports.createProduct = async (req, res) => {
	const user = req.user;
	const { name, provider } = req.body;
	const apiKey = uuidv4();
	const newProduct = new Product({ name, provider, user, apiKey });
	await newProduct.save();
	res.status(201).json({
		name: name,
		provide: provider,
		user,
		id: newProduct._id,
		key: apiKey,
	});
};
exports.deleteProduct = async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	if (!product) return res.json({ error: "Invalid Request" });

	if (product.user != req.user.id)
		return res.json({ error: "Unauthorized Request" });
	await Product.findByIdAndDelete(productId);
	return res.json({ message: "Product Deleted Successfully" });
};
exports.updateProduct = async (req, res) => {
	const { name, provider } = req.body;
	const { productId } = req.params;
	const product = await Product.findById(productId);
	if (!product) return res.json({ error: "Invalid Request" });
	if (product.user != req.user.id)
		return res.json({ error: "Unauthorized Request" });
	product.name = name;
	product.provider = provider;
	await product.save();
	res.status(201).json(product);
};
exports.getProduct = async (req, res) => {
	const user = req.user.id;
	const result = await Product.find({ user: user });
	res.json({ products: result });
};
