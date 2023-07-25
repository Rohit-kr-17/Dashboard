const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("./db");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { errorHandler } = require("./middlewares/error");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use(errorHandler);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
