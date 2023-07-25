import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
export const useAuth = () => useContext(AuthContext);

export default function NotFound() {
	const [authenticated, setAuthenticated] = useState(false);
	const { authInfo } = useAuth();
	useEffect(() => {
		console.log("hello");
		setAuthenticated(authInfo.isLoggedIn);
	});
	if (!authenticated) return <Navigate to={"/auth/signin"} />;
	return <Navigate to={"/"} />;
}
