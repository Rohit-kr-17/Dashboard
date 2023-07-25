import React, { useEffect, useRef, useState } from "react";
import CreateProduct from "./CreateProduct";
import { IoIosAdd } from "react-icons/io";
import { useAuth } from "./NotFound";
import { getProduct } from "../api/product";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
export default function Dashboard() {
	const [visible, setVisible] = useState(false);

	const handleClick = () => {
		setVisible(!visible);
	};

	return (
		<>
			<div className="flex flex-wrap m-2">
				<DisplayProduct visible={visible} />
				<div className="border-2 m-2 border-dashed rounded-md h-[15rem] w-[15rem]">
					<button
						onClick={handleClick}
						className=" flex items-center justify-center  h-full w-full "
					>
						<IoIosAdd
							color="gray"
							opacity="50%"
							className="h-[10rem] w-[10rem] red-300 "
						/>
					</button>
				</div>
				{visible && <CreateProduct setVisible={setVisible} />}
			</div>
		</>
	);
}
const defaultState = {
	id: "",
	name: "",
	provider: "",
};
export const DisplayProduct = ({ visible }) => {
	const [update, setUpdate] = useState(false);
	const [products, setProducts] = useState({});
	const [updateInfo, setUpdateInfo] = useState(defaultState);
	const [deleteProduct, setDeleteProduct] = useState(false);
	const [deleteProductId, setDeleteProductId] = useState();
	const handleUpdate = ({ id, name, provider }) => {
		setUpdateInfo({ ...updateInfo, id, name, provider });
		setUpdate(!update);
	};
	const handleDelete = (id) => {
		setDeleteProductId(id);
		setDeleteProduct(!deleteProduct);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await getProduct();
			setProducts(response.products);
		};
		fetchData();
	}, [visible, update, deleteProduct]);

	if (!products || products.length === 0) {
		return <div></div>;
	}
	return (
		<>
			{" "}
			{products &&
				products.length > 0 &&
				products?.map(({ _id, name, provider, apiKey }) => (
					<Card
						id={_id}
						handleUpdate={handleUpdate}
						handleDelete={handleDelete}
						name={name}
						provider={provider}
						apiKey={apiKey}
					/>
				))}
			{update && (
				<UpdateProduct
					setUpdate={setUpdate}
					updateInfo={updateInfo}
					setUpdateInfo={setUpdateInfo}
				/>
			)}
			{deleteProduct && (
				<DeleteProduct
					setDeleteProduct={setDeleteProduct}
					setDeleteProductId={setDeleteProductId}
					deleteProductId={deleteProductId}
				/>
			)}
		</>
	);
};
export const Card = ({
	id,
	name,
	handleUpdate,
	handleDelete,
	provider,
	apiKey,
}) => {
	const textRef = useRef();

	const handleCopyClick = () => {
		if (textRef.current) {
			textRef.current.select();
			document.execCommand("copy");
			toast.success("Key Copied");
		}
	};
	return (
		<div
			key={id}
			className="border-2 m-2 rounded-md flex flex-col w-[15rem] h-[15rem]"
		>
			<p className="m-2">{name}</p>
			<p className=" m-2 font-bold text-lg">{provider}</p>
			<div className="m-2">
				<label htmlFor="ApiKey">Api Key</label>
				<input
					name="ApiKey"
					className="border-2 mt-2 w-[14rem] overflow-hidden p-1 shadow-inner rounded-md "
					onClick={handleCopyClick}
					ref={textRef}
					type="text"
					value={apiKey}
					readOnly
				/>
				<p className="text-sm">Click on Key to Copy to clipboard</p>
			</div>
			<div className="flex mt-2 items-center justify-between">
				<div>
					<AiFillEdit
						onClick={() => handleUpdate({ id, name, provider })}
						className=" ml-2 text-xl text-green-600 cursor-pointer "
					/>
				</div>
				<div>
					<AiFillDelete
						onClick={() => handleDelete(id)}
						className="text-xl mr-2 text-red-600 cursor-pointer "
					/>
				</div>
			</div>
		</div>
	);
};
