import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";

import { useAuth } from "./hooks";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";

export default function App() {
	const { authInfo } = useAuth();

	if (authInfo.isLoggedIn) {
		return (
			<div className="flex dark:bg-primary bg-white">
				<Navbar />
				<div className="flex-1 p-2 max-w-screen-sl">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="*" element={<Dashboard />} />
					</Routes>
				</div>
			</div>
		);
	}
	return (
		<>
			<Routes>
				<Route path="/auth/signin" element={<Signin />} />
				<Route path="/auth/signup" element={<Signup />} />
				<Route path="/auth/forget-password" element={<ForgetPassword />} />
				<Route path="/auth/reset-password" element={<ResetPassword />} />
				<Route path="*" element={<Navigate replace to="/auth/signin" />} />
			</Routes>
		</>
	);
}
