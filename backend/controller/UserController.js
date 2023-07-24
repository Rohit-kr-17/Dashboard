const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.send("User already Exist");
		return;
	}
	const newUser = new User({ name, email, password });
	await newUser.save();
	res.status(201).json({
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			password: newUser.password,
		},
	});
};
exports.signin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.json("Credentials mismatched");
		return;
	}
	const matched = await user.comparePassword(password);
	if (!matched) {
		res.json("Credentials mismatched");
		return;
	}
	const { _id, name } = user;
	const jwtToken = jwt.sign({ userId: _id }, "jsonwebtokensecret");
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
