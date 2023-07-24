const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://Rohit:RohitKumar@dashboard.uvamjst.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Db Is Connectd");
	})
	.catch((err) => {
		console.log("DB connection failed", err);
	});
