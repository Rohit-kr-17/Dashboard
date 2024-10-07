const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
	const { name, email, keyword, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(401).json({ error: "User already exist" });
		return;
	}
	const newUser = new User({ name, email, keyword, password });
	await newUser.save();
	res.status(201).json({
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		},
	});
};
exports.signin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.json({ error: "Credentials mismatched" });
		return;
	}
	const matched = await user.comparePassword(password);
	if (!matched) {
		res.json({ error: "Credentials mismatched" });
		return;
	}
	const { _id, name } = user;
	const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
	res.json({
		user: { id: _id, name, email, token: jwtToken },
	});
};
exports.isAuthenticated = async (req, res) => {
	const { user } = req;

	res.json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
	});
};
exports.forgetPassword = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		res.json({ error: "User doesn't exist" });
		return;
	}
	return res.json({ userId: user._id });
};
exports.resetPassword = async (req, res) => {
	const { keyword, newPassword, userId } = req.body;
	const user = await User.findById(userId);
	if (!user) return res.json({ error: "Invalid request" });
	const matched = await user.compareKeyword(keyword);
	if (!matched) return res.json({ error: "Incorrect Keyword" });
	user.password = newPassword;
	await user.save();
	res.json({ message: "Password reset Successful" });
};
exports.polling = async (req,res)=>{
	console.log("Hello from Polling");
	res.json({message:"Hello"})
}
