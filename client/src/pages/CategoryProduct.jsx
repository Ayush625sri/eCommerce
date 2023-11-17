import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
	const params = useParams();
	const navigate =useNavigate();
	const [cart, setCart] = useCart();

	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState([]);
    const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const getProductByCat = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/product-category/${params.slug}`
			);
			setProducts(data?.products);
			setCategory(data?.category);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (params?.slug) getProductByCat();
	}, [params?.slug]);

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

	return (
		<Layout>
			<div className=" pt-28 text-center w-full">
				<h1 className="text-4xl text-center">
					Category - {category?.name}
				</h1>
				<h1 className="text-2xl text-center mt-4">
					Results Found : {products?.length}{" "}
				</h1>
			</div>
            <div className="mt-10 flex flex-col items-center xl:h-[80vh]">
					<div className="flex  flex-col gap-4 mb-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
							{products?.map((p) => (
								<div onClick={() =>
									navigate(
										`/product/${p._id}`
									)
								}
									className="flex flex-col items-center justify-between h-full border-2  shadow-lg shadow-gray-400 hover:cursor-pointer hover:scale-105"
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
												JSON.stringify([...cart, p])
											);
											toast.success("Item Added To Cart");
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
					<div className="">
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
		</Layout>
	);
};

export default CategoryProduct;
