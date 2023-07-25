import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CustomInput from "./form/CustomInput";
import { toast } from "react-toastify";
import { createProduct, updateProduct } from "../api/product";
const defaultProductInfo = {
	id: "",
	name: "",
	provider: "",
};

export default function CreateProduct({
	setUpdate,
	updateInfo,
	setUpdateInfo,
}) {
	console.log(updateInfo);
	const verify = (value) => {
		return value;
	};

	const onClick = () => {
		setUpdate(false);
	};
	const handleChange = ({ target }) => {
		const { name, value } = target;
		setUpdateInfo({ ...updateInfo, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { id, name, provider } = updateInfo;
		if (!verify(name) || !verify(provider))
			return toast.error("Incomplete form");
		const response = await updateProduct({ id, updateInfo });
		if (response.error) return toast.error(response.error);
		toast.success("Product Updated Successfully");

		setUpdate(false);
	};

	const { name, provider } = updateInfo;
	return (
		<div className="z-10 fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
			<div className="relative p-2 bg-white rounded w-[25rem] h-[25rem] overflow-auto">
				<p onClick={onClick} className="absolute cursor-pointer right-3">
					<AiOutlineClose />
				</p>
				<h2 className="flex justify-center font-bold text-lg">
					Create Product
				</h2>
				<form onSubmit={handleSubmit}>
					<CustomInput
						value={name}
						placeholder="Enter Product Name"
						name="name"
						onChange={handleChange}
						label="Name"
						type="text"
					/>

					<DropdownComponent
						name={name}
						handleChange={handleChange}
						value={provider}
					/>
					<button
						type="submit"
						className=" mt-5 border-2 p-2 w-full rounded bg-gray-400 flex justify-center items-center text-white border-gray-400 cursor-pointer hover:bg-white hover:text-black transition ease-in-out duration-500"
						value="Create-product"
					>
						Update Product
					</button>
				</form>
			</div>
		</div>
	);
}

const DropdownComponent = ({ provider, handleChange }) => {
	return (
		<div className="relative w-full lg:max-w-sm">
			<p className="mt-2">Providers</p>
			<select
				name="provider"
				onChange={handleChange}
				value={provider}
				className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-500"
			>
				<option value="">Select a provider</option>
				<option value="Google">Google</option>
				<option value="Binance">Binance</option>
				<option value="Twiter">Twiter</option>
				<option value="Instagram">Instagram</option>
				<option value="Spotify">Spotify</option>
				<option value="Quora">Quora</option>
				<option value="Tinder">Tinder</option>
				<option value="Bumble">Bumble</option>
				<option value="Bybit">Bybit</option>
			</select>
		</div>
	);
};
