import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomInput from "../form/CustomInput";
import { resetPassword } from "../../api/auth";
import { toast } from "react-toastify";

export default function ResetPassword() {
	const navigate = useNavigate();
	const [info, setInfo] = useState({
		keyword: "",
		newPassword: "",
		userId: "",
	});
	const { keyword, newPassword } = info;
	const [searchParams] = useSearchParams();
	const id = searchParams.get("userId");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = await resetPassword(info);
		if (error) return toast.error(error);
		toast.success("Password Reset Successful");
		navigate(`/auth/sign-in`, { replace: true });
	};
	useEffect(() => {
		setInfo({ ...info, userId: id });
	}, []);
	const handleChange = ({ target }) => {
		const { value, name } = target;
		setInfo({ ...info, [name]: value });
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
						value={newPassword}
						placeholder="*******"
						name="newPassword"
						label="New Password"
						type="password"
					/>
					<CustomInput
						onChange={handleChange}
						value={keyword}
						placeholder="*******"
						name="keyword"
						label="Keyword"
						type="text"
					/>

					<button
						type="submit"
						className="border-2 p-2 w-full rounded bg-gray-400 flex justify-center items-center text-white border-gray-400 cursor-pointer hover:bg-white hover:text-black transition ease-in-out duration-500"
						value="Sign in"
					>
						Change Password
					</button>
					<div className="flex justify-between">
						<Link
							className="  transition  text-gray-500 hover:text-black"
							to="/auth/signup"
						>
							Sign Up
						</Link>
						<Link
							className="  transition  text-gray-500 hover:text-black"
							to="/auth/signin"
						>
							Sign In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
