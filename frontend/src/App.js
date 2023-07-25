import React, { useContext } from "react";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { AuthContext } from "./context/AuthProvider";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
export const useAuth = () => useContext(AuthContext);

export default function App() {
	const { authInfo } = useAuth();
	if (authInfo.isLoggedIn) {
		return (
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		);
	}
	return (
		<>
			<Routes>
				<Route path="/auth/signin" element={<Signin />} />
				<Route path="/auth/signup" element={<Signup />} />
				<Route path="/auth/forget-password" element={<ForgetPassword />} />
				<Route path="/auth/reset-password" element={<ResetPassword />} />
				<Route path="*" element={<Signin />} />
			</Routes>
		</>
	);
}
