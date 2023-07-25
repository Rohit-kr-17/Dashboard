const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
require("express-async-errors");
require("./db");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { errorHandler } = require("./middlewares/error");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/user", userRouter);
app.use("/product", productRouter);

app.use("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.use(errorHandler);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
