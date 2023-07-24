const { check, validationResult } = require("express-validator");
exports.userValidator = [
	check("name").trim().not().isEmpty().withMessage("Name is missing"),
	check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
	check("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Password is invalid")
		.isLength({ min: 6 })
		.withMessage("Password must be 6 charactes long"),
];
exports.signInValidator = [
	check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
	check("password").trim().not().isEmpty().withMessage("Password is invalid"),
];
exports.validate = (req, res, next) => {
	const error = validationResult(req).array();
	if (error.length) {
		console.log(error);
		return res.json({ error: error[0].msg });
	}
	next();
};
