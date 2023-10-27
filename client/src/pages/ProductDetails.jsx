import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState({});
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [cart, setCart] = useCart();

	useEffect(() => {
		if (params?.id) getProduct();
	}, [params?.id]);
	const getProduct = async () => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/get/${params.id}`
			);
			setProduct(data?.product);
			getSimilarProduct(data?.product._id, data?.product.category._id);
		} catch (error) {
			console.log(error);
		}
	};
	const getSimilarProduct = async (pid, cid) => {
		try {
			const { data } = await axios.get(
				`/api/v1/product/related-product/${pid}/${cid}`
			);
			setRelatedProduct(data?.products);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout title={product.name}>
			<div className="flex mt-16 mx-48 justify-between shadow-lg shadow-gray-400">
				<div className="flex    shadow-lg shadow-gray-400">
					<img
						src={`/api/v1/product/product-photo/${product._id}`}
						className=""
						alt={product.name}
					/>
				</div>
				<div className="flex flex-col mt-8">
					<h1 className="text-4xl text-center  ">Product Details</h1>
					<hr className="my-4" />
					<h2 className="text-3xl mb-1">{product.name}</h2>
					<h2 className="text-2xl mb-1">{product.description}</h2>
					<h2 className="text-2xl">
						Category : {product?.category?.name}
					</h2>
				</div>
				<div className=" flex flex-col  justify-center items-center my-8 px-16">
					<h2 className="text-4xl mb-16 font-bold text-green-600">
						{" "}
						${product.price}
					</h2>

					<button
						onClick={() => {
							setCart([...cart, product]);
							localStorage.setItem(
								"cart",
								JSON.stringify([...cart, product])
							);
							toast.success("Item Added To Cart");
						}}
						className=" active:scale-95 border-2 border-gray-600 rounded-md text-xl px-10 py-4 bg-gray-600 text-white hover:text-gray-600 hover:bg-white shadow-lg shadow-gray-400"
					>
						Add to Cart
					</button>
				</div>
			</div>
			<hr className="my-16" />
			<div className="flex flex-col mx-48 mb-16">
				<h1 className="text-4xl   ">
					Similar Products : {relatedProduct.length}
				</h1>

				{relatedProduct.length < 1 && <p> No Similar Products Found</p>}
				<hr className="mt-4 mb-8" />
				<div className="grid grid-cols-4 gap-8 ">
					{relatedProduct?.map((p) => (
						<div onClick={() =>
							navigate(
								`/product/${p._id}`
							)
						}
							className="flex flex-col items-center justify-between h-full border-2 shadow-lg shadow-gray-400 hover:cursor-pointer hover:scale-105 pb-2"
							key={p._id}
						>
							<img
								src={`/api/v1/product/product-photo/${p._id}`}
								alt={p.name}
								className="w-full max-h-[65%] border shadow-sm shadow-gray-500"
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
								<div className="flex gap-2 mt-2 justify-between mx-2 ">
									<button
										onClick={() =>
											navigate(`/product/${p._id}`)
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
		</Layout>
	);
};

export default ProductDetails;
