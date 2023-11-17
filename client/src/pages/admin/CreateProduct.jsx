import React, { useState, useEffect } from "react";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
	const { Option } = Select;
	const navigate = useNavigate()
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [photo, setPhoto] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [shipping, setShipping] = useState(0);

	//get all category
	const getAllCategory = async () => {
		try {
			const { data } = await axios.get(`/api/v1/category/get-categories`);
			if (data?.success) {
				setCategories(data?.categories);
			}
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong in getting category`);
		}
	};
	useEffect(() => {
		getAllCategory();
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData()
			productData.append("name",name)
			productData.append("description",description)
			productData.append("price",price)
			productData.append("quantity",quantity)
			productData.append("photo",photo)
			productData.append("shipping",shipping)
			productData.append("category",category)
			const { data } = await axios.post(`/api/v1/product/create-product`, productData);
			if(data?.success){
				toast.success("Product Created Successfully")
				navigate('/dashboard/admin/products')
			}else{
				toast.error(data?.message)

			}
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong");
		}
	};

	return (
		<Layout title={"Dashboard - Create Product"}>
			<div className="flex flex-col xl:flex-row mb-8 pt-12 lg:pt-28">
				<AdminMenu />
				<div className="flex flex-col xl:w-full lg:mt-6 lg:mx-10 p-4 sm:p-10 pt-6 h-fit  border-2 shadow-gray-400 shadow-xl ">
					<div className="flex justify-center w-full ">
						<h1 className="text-5xl  bold">Create Product</h1>
					</div>
			
						<div className=" lg:px-32 flex flex-col gap-4 items-center w-full">
							<div className="outline-none mt-8  border-2 rounded-md  cursor-pointer w-full  shadow-md shadow-gray-400">
								<Select
									className=" w-full cursor-pointer bg-gray-100 focus:ring-4 focus:ring-blue-400"
									bordered={false}
									placeholder="Select a Category"
									size="large"
									
									onChange={(value) => {
										setCategory(value);
									}}
								>
									{categories?.map((c) => (
										<Option
											key={c._id}
											value={c._id}
											className="text-p-8"
										>
											{c.name}
										</Option>
									))}
								</Select>
							</div>

							<div className="mb-1 w-full ">
								<input
									className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
									type="text"
									placeholder="Write Name of Product"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div className="mb-1 w-full">
								<textarea
									name="description"
									className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
									id=""
									cols="10"
									rows="3"
									placeholder="Write Description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								></textarea>
							</div>

							<div className="mb-1 w-full">
								<input
									className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
									type="number"
									placeholder="Write Price of Product (in Rs.)"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>

							<div className="mb-1 w-full">
								<input
									className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
									type="number"
									value={quantity}
									placeholder="Write Quantity of Product "
									onChange={(e) =>
										setQuantity(e.target.value)
									}
								/>
							</div>

							<div className="mb-1 w-full">
								<Select
									className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
									bordered={false}
									placeholder="Select Shipping"
									size="large"
									value={shipping ? "Yes" : "No"}
									onChange={(value)=>{
										setShipping(value)
									}}

								>
									<Option
										value={0}
										className=" text-p-8"
									>
										{" "}
										No
									</Option>
									<Option
										value={1}
										className="text-p-8"
									>
										{" "}
										Yes
									</Option>
								</Select>
							</div>

							<div className="mb-3">
								{photo && (
									<div className="text-center w-72 shadow-xl shadow-gray-400  border-2">
										<img
											src={URL.createObjectURL(photo)}
											alt={"product_photo"}
											className="rounded-xl "
										/>
									</div>
								)}
							</div>
							<div className="w-full flex justify-center ">
								<label  className="shadow-lg shadow-gray-400 w-full text-center text-xl px-4 py-2 rounded-lg cursor-pointer border-2 border-blue-600 bg-blue-600 text-white hover:text-blue-600 hover:bg-white ">
									{photo ? photo.name : "Upload Photo"}
									<input
										className=""
										type="file"
										name="photo"
										accept="image/*"
										onChange={(e) =>
											setPhoto(e.target.files[0])
										}
										hidden
									/>
								</label>
							</div>

							<div className="mb-1 w-full">
								<button
									// type="submit"
									onClick={handleCreate}
									className="active:scale-95 shadow-lg shadow-gray-400 w-full text-center text-xl px-4 py-2 rounded-lg cursor-pointer border-2 border-gray-900 bg-gray-900 text-white hover:text-gray-900 hover:bg-white "
								>
									Create Product
								</button>
							</div>
						</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreateProduct;
