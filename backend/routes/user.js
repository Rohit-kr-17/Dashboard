const express = require("express");
const router = express.Router();
const {
	userValidator,
	validate,
	signInValidator,
	validatePassword,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/auth");
const {
	create,
	signin,
	isAuthenticated,
	forgetPassword,
	resetPassword,
} = require("../controller/UserController.js");
router.post("/sign-up", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signin);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", validatePassword, validate, resetPassword);
router.get("/is-auth", isAuth, isAuthenticated);
module.exports = router;
