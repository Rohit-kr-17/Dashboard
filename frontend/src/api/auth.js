import client from "./client.js";
export const createUser = async (userInfo) => {
	try {
		const { data } = await client.post("../user/sign-up", userInfo);
		console.log(data);
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
export const signInUser = async (userInfo) => {
	try {
		const { data } = await client.post("../user/sign-in", userInfo);
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
export const getIsAuth = async (token) => {
	try {
		const { data } = await client.get("../user/is-auth", {
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
export const forgetPassword = async (email) => {
	try {
		const { data } = await client.post("../user/forget-password", { email });
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
export const resetPassword = async (info) => {
	try {
		const { keyword, newPassword, userId } = info;
		const { data } = await client.post("../user/reset-password", {
			keyword,
			newPassword,
			userId,
		});
		return data;
	} catch (error) {
		const { response } = error;
		if (response?.data) return response.data;
		return { error: error.message || error };
	}
};
