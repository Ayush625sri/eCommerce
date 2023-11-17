import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Home = () => {
	const [products, setProducts] = useState([]);

	const [categories, setCategories] = useState([]);

	const [checked, setChecked] = useState([]);

	const [radio, setRadio] = useState([]);

	const [total, setTotal] = useState(0);

	const [page, setPage] = useState(1);

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const [cart, setCart] = useCart();

	const getAllCategory = async () => {
		try {
			const { data } = await axios.get(`/api/v1/category/get-categories`);
			if (data?.success) {
				setCategories(data.categories);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		getAllCategory();
		getTotal();

		//eslint-disable-next-line
	}, []);

	const getAllProducts = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`/api/v1/product/product-list/${page}`
			);
			setLoading(false);
			setProducts(data.products);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const getTotal = async () => {
		try {
			const { data } = await axios.get(`/api/v1/product/count/all`);
			setTotal(data.total);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (page === 1) return;
		loadMore();
	}, [page]);

	const loadMore = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`api/v1/product/product-list/${page}`
			);
			setLoading(false);
			setProducts([...products, ...data?.products]);
		} catch (error) {
			setLoading(false);

			console.log(error);
		}
	};

	const handleFilter = (value, id) => {
		let all = [...checked];
		if (value) {
			all.push(id);
		} else {
			all = all.filter((c) => c !== id);
		}
		setChecked(all);
	};
	useEffect(() => {
		if (!checked.length || !radio.length) getAllProducts();
	}, [checked.length, radio.length]);
	useEffect(() => {
		if (checked.length || radio.length) filterProduct();
	}, [checked, radio]);

	const filterProduct = async () => {
		try {
			const { data } = await axios.post(
				`/api/v1/product/product-filters`,
				{ checked, radio }
			);
			setProducts(data?.products);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout title={"All Products - Best Offers"}>
			<div className="flex flex-col 2xl:flex-row p-8 pt-28">
				<div className="flex flex-col  2xl:flex-col mr-20 mb-20 gap-8 ">
					<div className="flex flex-col gap-8 md:flex-row 2xl:flex-col justify-between xl:justify-around ">
						<div className="">
							{/* {JSON.stringify(checked, null,4)} */}
							<h1 className=" text-3xl mb-2">
								Filter By Category
							</h1>
							<hr className="mb-2" />
							<div className="flex flex-col">
								{categories?.map((c) => (
									<Checkbox
										key={c._id}
										className="text-lg"
										onChange={(e) =>
											handleFilter(
												e.target.checked,
												c._id
											)
										}
									>
										{c.name}
									</Checkbox>
								))}
							</div>
						</div>

						<div className="">
							{/* {JSON.stringify(radio, null,4)} */}
							<h1 className=" text-3xl mb-2">Filter By Prices</h1>
							<hr className="mb-2" />
							<div className="flex flex-col">
								<Radio.Group
									onChange={(e) => setRadio(e.target.value)}
									className="flex flex-col"
								>
									{Prices?.map((p) => (
										<Radio
											className="text-lg"
											key={p._id}
											value={p.array}
										>
											{p.name}
										</Radio>
									))}
								</Radio.Group>
							</div>
						</div>
					</div>
					<div className="flex flex-col mt-8  xl:items-center">
						<button
							className="active:scale-95 shadow-lg shadow-gray-400 w-full xl:w-[70%] 2xl:w-full text-center text-xl px-4 py-2 rounded-lg  border-2 border-red-600 bg-red-600 text-white hover:text-red-600 hover:bg-white "
							onClick={() => window.location.reload()}
						>
							Clear Filters
						</button>
					</div>
				</div>
				<div className="flex flex-col items-center 2xl:w-[75vw] ">
					<h1 className="text-center text-5xl mb-6">All Products</h1>
					<div className="flex  flex-col gap-4">
						<h1 className="text-4xl">Products</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-16 ">
							{products?.map((p) => (
								<div
									onClick={() =>
										navigate(`/product/${p._id}`)
									}
									className="flex flex-col items-center justify-between h-full border-2  shadow-lg shadow-gray-400 hover:scale-105 hover:cursor-pointer"
									key={p._id}
								>
									<img
										src={`/api/v1/product/product-photo/${p._id}`}
										alt={p.name}
										className="w-full max-h-[65%]  shadow-sm shadow-gray-400 border-none"
									/>
									<div className="flex flex-col justify-between  w-full px-3 py-4">
										<div className="">
											<h3 className="font-bold text-xl ">
												{p.name}
											</h3>
											<p className="text-lg">
												{p.description.substring(0, 30)}
											</p>
											<p className="text-lg">
												Price : $ {p.price}
											</p>
											<p className="text-lg">
												Stock : {p.quantity}
											</p>
										</div>
										<div className="flex gap-2 mt-2 justify-between ">
											<button
												onClick={() =>
													navigate(
														`/product/${p._id}`
													)
												}
												className="shadow-md shadow-gray-400 border-2 border-blue-600 rounded-md text-xl px-2 py-1 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
											>
												More Details
											</button>
											<button
												onClick={() => {
													setCart([...cart, p]);
													localStorage.setItem(
														"cart",
														JSON.stringify([
															...cart,
															p,
														])
													);
													toast.success(
														"Item Added To Cart"
													);
												}}
												className="shadow-md shadow-gray-400 border-2 border-gray-600 rounded-md text-xl px-2 py-1 bg-gray-600 text-white hover:text-gray-600 hover:bg-white active:scale-95"
											>
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="mt-4">
						{products && products.length < total && (
							<button
								className="active:scale-95 shadow-lg shadow-gray-400 w-full text-center text-xl mt-5 px-4 py-2 rounded-lg  border-2 border-yellow-600 bg-yellow-600 text-white hover:text-yellow-600 hover:bg-white "
								onClick={(e) => {
									e.preventDefault();
									setPage(page + 1);
								}}
							>
								{loading ? "Loading" : "Loadmore"}
							</button>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
