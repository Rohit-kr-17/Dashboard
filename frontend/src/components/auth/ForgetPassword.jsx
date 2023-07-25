import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../form/CustomInput";
import { forgetPassword } from "../../api/auth";
import { toast } from "react-toastify";

export default function ForgetPassword() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error, userId } = await forgetPassword(email);
		if (error) return toast.error(error);
		navigate(`/auth/reset-password?userId=${userId}`, { replace: true });
	};
	const handleChange = ({ target }) => {
		setEmail(target.value);
	};
	return (
		<div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
			<div className="w-screen mx-[50%] bg-white drop-shadow-lg rounded-lg p-6 space-y-6 ">
				<form
					onSubmit={handleSubmit}
					className="bg-white  rounded p-6 space-y-6 w-72 flex flex-col"
				>
					<label className="flex justify-center text-xl" htmlFor="email">
						Forgot Password
					</label>
					<CustomInput
						onChange={handleChange}
						value={email}
						placeholder="hireme@email.com"
						name="email"
						label="Email"
						type="email"
					/>

					<button
						type="submit"
						className="border-2 p-2 w-full rounded bg-gray-400 flex justify-center items-center text-white border-gray-400 cursor-pointer hover:bg-white hover:text-black transition ease-in-out duration-500"
						value="Sign in"
					>
						Sign In
					</button>
					<div className="flex justify-between">
						<Link
							className="  transition  text-gray-500 hover:text-black"
							to="/auth/forget-password"
						>
							Forget password
						</Link>
						<Link
							className="  transition  text-gray-500 hover:text-black"
							to="/auth/signup"
						>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
