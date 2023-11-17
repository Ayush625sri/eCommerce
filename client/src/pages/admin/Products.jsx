import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
	const [products, setProducts] = useState([]);

	const getAllProducts = async () => {
		try {
			const { data } = await axios.get(`/api/v1/product/all`);
			setProducts(data.products);
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong");
		}
	};
	useEffect(() => {
		getAllProducts();
	}, []);
	return (
		<Layout title="Dashboard - All Products">
			<div className="flex flex-col xl:flex-row mb-8 pt-12 xl:pt-28">
				<AdminMenu />
				<div className="flex flex-col mt-6 xl:w-full justify-center items-center p-2 md:p-10 pt-6 border-2 shadow-gray-400 shadow-xl ">
					<div className="flex justify-center ">
						<h1 className="text-4xl lg:text-5xl bold mb-4">All Products</h1>
					</div>
					<div className="  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  ">
						{products?.map((p) => (
							<Link
								to={`/dashboard/admin/product/${p._id}`}
								className=" mx-2 my-2"
								key={p._id}
							>
								<div className="flex lg:flex-col items-center justify-between lg:w-80 border-2 shadow-md shadow-gray-400 h-full">
									<img
										src={`/api/v1/product/product-photo/${p._id}`}
										alt={p.name}
										className="w-32  md:w-full md:max-h-[20rem] lg:h-auto outline-none border-none lg:shadow-sm lg:shadow-gray-500"
									/>
									<div className="flex flex-col px-2 py-4 w-full">
										<h3 className="font-bold text-xl xl:text-2xl">
											{p.name}
										</h3>
										<p className="text-lg xl:text-xl">
											{p.description}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Products;
