import client from "./client";

export const createProduct = async (productInfo) => {
	const token = localStorage.getItem("auth-token");
	try {
		const { data } = await client.post(
			"../product/create-product",
			productInfo,
			{
				headers: {
					authorization: "Bearer " + token,
					accept: "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
export const getProduct = async () => {
	const token = localStorage.getItem("auth-token");
	try {
		const { data } = await client.get(`../product/get-product`, {
			headers: {
				authorization: "Bearer " + token,
				accept: "application/json",
			},
		});
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};

export const updateProduct = async ({ id, updateInfo }) => {
	const token = localStorage.getItem("auth-token");
	try {
		const { data } = await client.put(
			`../product/update-product/${id}`,
			updateInfo,
			{
				headers: {
					authorization: "Bearer " + token,
					accept: "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
export const deleteProduct = async (deleteProductId) => {
	console.log(deleteProductId);
	const token = localStorage.getItem("auth-token");
	try {
		const { data } = await client.delete(
			`../product/delete-product/${deleteProductId}`,
			{
				headers: {
					authorization: "Bearer " + token,
					accept: "application/json",
				},
			}
		);
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
