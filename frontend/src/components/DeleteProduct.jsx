import React from "react";
import { deleteProduct } from "../api/product";
import { toast } from "react-toastify";

export default function DeleteProduct({
	setDeleteProduct,
	setDeleteProductId,
	deleteProductId,
}) {
	const handleClick = async ({ target }) => {
		const { value } = target;
		console.log(value);
		if (value == 0) return setDeleteProduct(false);
		const response = await deleteProduct(deleteProductId);
		if (response.error) return toast.error(response.error);
		toast.success(response.message);
		setDeleteProduct(false);
	};
	return (
		<div className="z-10 fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
			<div className="relative p-2 bg-white rounded w-[25rem] h-[10rem] overflow-auto">
				<div className="flex justify-center">
					<p className="mt-2 text-[2rem]">Are you sure ?</p>
				</div>

				<div className="flex mt-5 justify-between">
					<button
						onClick={handleClick}
						value="1"
						className=" p-5 justify-center items-center flex bg-red-600 hover:bg-red-800 h-5 border-red-600 rounded-md text-white ml-5"
					>
						Yes
					</button>
					<button
						onClick={handleClick}
						value="0"
						className=" p-5 justify-center items-center flex bg-green-600 hover:bg-green-800 h-5 border-green-600 rounded-md text-white mr-5"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
}
