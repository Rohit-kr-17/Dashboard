import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks";

export default function Navbar() {
	const { handleLogout } = useAuth();
	const { authInfo } = useAuth();
	return (
		<nav className="  w-48 min-h-screen bg-gray-400 border-right border-gray-300">
			<div className="flex flex-col justify-between h-screen pl-5 sticky top-0">
				<h1 className="text-white text-3xl">Dashboard </h1>

				<div className="flex flex-col items-start pb-5 ">
					<span className="font-semibold text-white text-xl">
						{authInfo.profile?.name}
					</span>
					<button
						onClick={handleLogout}
						className="flex items-center text-black text-sm hover:text-white transition space-x-1"
					>
						<FiLogOut />
						<span> Log Out</span>
					</button>
				</div>
			</div>
		</nav>
	);
}
