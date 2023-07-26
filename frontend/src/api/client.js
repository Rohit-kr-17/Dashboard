import axios from "axios";
const client = axios.create({
	baseURL: "https://productdashboard-qp9e.onrender.com/api",
});

export default client;
