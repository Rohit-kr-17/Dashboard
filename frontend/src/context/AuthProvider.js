import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getIsAuth, signInUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const defaultAuthInfo = {
	profile: null,
	isLoggedIn: false,
	isPending: false,
	error: "",
};

export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
	const handleLogin = async (email, password) => {
		setAuthInfo({ ...authInfo, isPending: true });
		const { error, user } = await signInUser({ email, password });
		if (error) {
			setAuthInfo({ ...authInfo, isPending: false, error });
			toast.error(error);
			return error;
		}
		navigate("/", { replace: true });
		setAuthInfo({
			profile: { ...user },
			isPending: false,
			isLoggedIn: true,
			error: "",
		});
		localStorage.setItem("auth-token", user.token);
		toast.success("Logged in");
	};
	const isAuth = async () => {
		const token = localStorage.getItem("auth-token");
		if (!token) return;
		setAuthInfo({ ...authInfo, isPending: true });

		const { error, user } = await getIsAuth(token);
		if (error) {
			toast.error(error);
			return setAuthInfo({ ...authInfo, isPending: false, error });
		}
		setAuthInfo({
			profile: { ...user },
			isLoggedIn: true,
			isPending: false,
			error: "",
		});
	};
	const handleLogout = () => {
		localStorage.removeItem("auth-token");
		setAuthInfo({
			...defaultAuthInfo,
		});
		toast.success("Loggged Out");
	};
	useEffect(() => {
		isAuth();
	}, []);
	return (
		<AuthContext.Provider
			value={{ authInfo, handleLogin, isAuth, handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
}
