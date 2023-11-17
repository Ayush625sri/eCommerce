import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";

const UpdateProduct = () => {
	// const { Option } = Select;
	const navigate = useNavigate();
	const params = useParams();
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [photo, setPhoto] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [shipping, setShipping] = useState(0);
	const [id, setId] = useState("");

	//get Single product

	const getSingleProduct = async () => {
		try {
			const { data } = await axios.get(`/api/v1/product/get/${params.id}`);
			setName(data.product.name);
			setId(data.product._id);
			setDescription(data.product.description);
			setPrice(data.product.price);
			setQuantity(data.product.quantity);
			setCategory(data.product.category._id);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSingleProduct();
		//esling-disable-next-line
	}, []);
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

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("quantity", quantity);
			photo && productData.append("photo", photo);
			productData.append("shipping", shipping);
			productData.append("category", category);
			const { data } = await axios.put(
				`/api/v1/product/${id}`,
				productData
			);
			if (data?.success) {
				toast.success("Product Updated Successfully");
				navigate("/dashboard/admin/products");
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong");
		}
	};
	const handleDelete = async() => {
        try {
            let answer = window.prompt("Are You Sure you want to delete this product ? ")
            if(!answer)return;
            const {data} = await axios.delete(`/api/v1/product/${id}`)
            toast.success("Product Deleted Successfully")
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }

    };

	return (
		<Layout title={"Dashboard - Create Product"}>
			<div className="flex flex-col xl:flex-row mb-8 pt-12 xl:pt-28">
				<AdminMenu />
				<div className="flex flex-col xl:w-full mt-6 mx-10 p-10 pt-6 h-fit  border-2 shadow-gray-400 shadow-xl ">
					<div className="flex items-center ">
						<h1 className="text-4xl lg:text-5xl bold">Update Product</h1>
					</div>

					<div className=" xl:px-32 flex flex-col gap-4 items-center xl:w-full">
						<div className="outline-none mt-8  border-2 rounded-md  cursor-pointer w-full  shadow-md shadow-gray-400">
							<Select
								className=" w-full cursor-pointer bg-gray-100 focus:ring-4 focus:ring-blue-400"
								bordered={false}
								placeholder="Select a Category"
								size="large"
								showSearch
								onChange={(value) => {
									setCategory(value);
								}}
								value={category}
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
								onChange={(e) => setDescription(e.target.value)}
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
								onChange={(e) => setQuantity(e.target.value)}
							/>
						</div>

						<div className="mb-1 w-full">
							<Select
								className="focus:ring-4 focus:ring-blue-200 shadow-md shadow-gray-400 outline-none w-full  text-xl px-4 py-2 rounded-lg  border-none bg-gray-100 text-gray placeholder:text-gray-400  border-4 border-gray-900"
								bordered={false}
								placeholder="Select Shipping"
								size="large"
								showSearch
								value={shipping ? "Yes" : "No"}
								onChange={(value) => {
									setShipping(value);
								}}
							>
								<Option
									value="No"
									className=" text-p-8"
								>
									{" "}
									No
								</Option>
								<Option
									value="Yes"
									className="text-p-8"
								>
									{" "}
									Yes
								</Option>
							</Select>
						</div>

						<div className="mb-3">
							{photo ? (
								<div className="text-center w-72 shadow-xl shadow-gray-400  border-2">
									<img
										src={URL.createObjectURL(photo)}
										alt={"product_photo"}
										className="rounded-xl "
									/>
								</div>
							) : (
								<div className="text-center md:w-72 shadow-xl shadow-gray-400  border-2">
									<img
										src={`/api/v1/product/product-photo/${id}`}
										alt={"product_photo"}
										className="rounded-xl "
									/>
								</div>
							)}
						</div>
						<div className="w-full flex justify-center ">
							<label className="shadow-lg shadow-gray-400 w-full text-center text-xl px-4 py-2 rounded-lg cursor-pointer border-2 border-blue-600 bg-blue-600 text-white hover:text-blue-600 hover:bg-white ">
								{photo ? photo.name : "Change Photo"}
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

						<div className="mb-1 w-full flex flex-col md:flex-row gap-4">
							<button
								onClick={handleDelete}
								className="active:scale-95 shadow-lg shadow-gray-400 w-full text-center text-xl px-4 py-2 rounded-lg cursor-pointer border-2 border-red-600 bg-red-600 text-white hover:text-red-600 hover:bg-white "
							>
								Delete Product
							</button>
							<button
								onClick={handleUpdate}
								className="active:scale-95 shadow-lg shadow-gray-400 w-full text-center text-xl px-4 py-2 rounded-lg cursor-pointer border-2 border-green-600 bg-green-600 text-white hover:text-green-600 hover:bg-white "
							>
								Update Product
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UpdateProduct;
