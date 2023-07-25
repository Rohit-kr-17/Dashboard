import React from "react";

export default function CustomInput({ name, label, placeholder, ...rest }) {
	return (
		<div className="flex flex-col-reverse">
			<input
				id={name}
				name={name}
				className="bg-transparent rounded border-2   w-full text-lg outline-none  focus:border-gray-400 p-1  peer transition"
				placeholder={placeholder}
				{...rest}
			/>
			<label
				className="font-semibold   text-black  peer-focus:text-black transition self-start"
				htmlFor={name}
			>
				{label}
			</label>
		</div>
	);
}
