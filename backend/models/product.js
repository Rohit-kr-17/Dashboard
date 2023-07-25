const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	apiKey: {
		type: String,
		required: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});
module.exports = mongoose.model("Product", productSchema);
