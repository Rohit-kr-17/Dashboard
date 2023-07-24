const express = require("express");
require("express-async-errors");
require("./db");
const userRouter = require("./routes/user");
const { errorHandler } = require("./middlewares/error");

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use(errorHandler);

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
