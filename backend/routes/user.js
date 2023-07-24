const express = require("express");
const router = express.Router();
const {
	userValidator,
	validate,
	signInValidator,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/auth");
const {
	create,
	signin,
	isAuthenticated,
} = require("../controller/UserController.js");
router.post("/sign-up", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signin);
router.get("/is-auth", isAuth, isAuthenticated);
module.exports = router;
