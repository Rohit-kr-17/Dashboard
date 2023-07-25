const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	keyword: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hashSync(this.password, 10);
	}
	next();
});
userSchema.pre("save", async function (next) {
	if (this.isModified("keyword")) {
		this.keyword = await bcrypt.hashSync(this.keyword, 10);
	}
	next();
});
userSchema.methods.compareKeyword = async function (keyword) {
	return await bcrypt.compare(keyword, this.keyword);
};
userSchema.methods.comparePassword = async function (passowrd) {
	return await bcrypt.compare(passowrd, this.password);
};
module.exports = mongoose.model("User", userSchema);
