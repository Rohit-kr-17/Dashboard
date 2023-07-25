import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
export const useAuth = () => useContext(AuthContext);

export default function NotFound() {
	const { authInfo } = useAuth();
	if (authInfo.isLoggedIn) return <div className="">Not Found</div>;
	return <Navigate to={"/auth/signin"} />;
}
