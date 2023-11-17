import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
	const [auth, setAuth] = useAuth();
	const [cart, setCart] = useCart();
	const [clientToken, setClientToken] = useState("");
	const [instance, setInstance] = useState("");
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState(false);
	const navigate = useNavigate();

	const totalPrice = () => {
		try {
			let total = 0;
			cart?.map((item) => {
				total = total + item.price;
			});
			// setPrice(total)
			return total.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});
		} catch (error) {
			console.log(error);
		}
	};

	const removeCartItem = (pid) => {
		try {
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item._id === pid);

			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem("cart", JSON.stringify(myCart));
			toast.error("Item Removed From Cart");
		} catch (error) {
			console.log(error);
		}
	};

	const getToken = async () => {
		try {
			const { data } = await axios.get(`/api/v1/product/braintree/token`);
			// console.log(data.clientToken)
			setClientToken(data.clientToken);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePayment = async () => {
		try {
			setLoading(true);
			const { nonce } = await instance.requestPaymentMethod();
			const { data } = await axios.post(
				`/api/v1/product/braintree/payment`,
				{
					nonce,
					cart,
				}
			);
			setLoading(false);
			localStorage.removeItem("cart");
			setCart([]);
			navigate("/dashboard/user/orders");
			toast.success("Payment Completed Successfully");
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getToken();
	}, [auth]);

	return (
		<Layout title={"Shopping Cart"}>
			<div className="px-4 pt-28 mb-8 xl:pl-20">
				<div className="mb-8 flex justify-center">
					{auth?.user && <h1 className="text-center text-3xl mb-3 ">
						{`Hello,${" "} ${auth?.token && auth?.user?.name}`}
					</h1>}
					<h1 className="text-center text-3xl ">
						{(cart?.length > 0)
							? `${cart.length} items in your cart  ${
									auth?.token
										? ""
										: "please login to checkout"
							  }`
							: `Your Cart Is Empty`}
					</h1>
				</div>
				<div className="flex flex-col items-center 2xl:flex-row">
					<div className="flex flex-col gap-6 2xl:w-[55%] xl:w-[70%] ">
						{cart?.map((p) => (
							<div
								className="flex items-center justify-between xl:pr-20 bg-gray-200  border-gray-800 shadow-lg shadow-gray-400"
								key={p._id}
							>
								<div className="flex gap-2 xl:gap-16  bg-gray-200">
									<img
										src={`/api/v1/product/product-photo/${p._id}`}
										alt={p.name}
										className=" h-24 md:h-auto md:w-64 shadow-sm shadow-gray-400 border-none"
									/>
									<div className="flex flex-col justify-around bg-gray-200 md:py-4 md:px-6 ">
										<div className="">
											<h1 className="text-xl xl:text-4xl md:text-3xl md:mb-2">
												{p.name}
											</h1>
											<h1 className="md:text-lg xl:text-xl md:mb-4">
												{p.description}
											</h1>
										</div>
										<div className="lg:mt-3 flex gap-8 items-center justify-between">
											<h1 className=" md:text-2xl font-bold">
												Price : $ {p.price}
											</h1>
											<button
												className="text-xs p-1 shadow-md shadow-gray-400 border-2 border-red-600 rounded-md md:text-xl md:px-3 md:py-1 bg-red-600 text-white hover:text-red-600 hover:bg-white active:scale-95 mr-8"
												onClick={() =>
													removeCartItem(p._id)
												}
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
						{cart.length > 0 && (
							<div className="w-full flex justify-center">
								<button
									className="shadow-md shadow-gray-400 mt-4 border-2 border-blue-600 rounded-md px-4 py-2 md:text-xl   lg:px-6 lg:py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
									onClick={() => navigate("/")}
								>
									Add More Items
								</button>
							</div>
						)}
					</div>
					{cart?.length > 0 && (
						<div className="py-4 xl:py-10 flex flex-col items-center mt-8 px-10 text-center 2xl:w-[45%] bg-gray-100 2xl:bg-white w-full">
							<h1 className="text-3xl xl:text-5xl mb-4">Cart Summary</h1>
							{/* <h1 className="text-xl mb-4">
								Total | Checkout | Payment
							</h1> */}
							<hr className="w-full mb-4" />
							<div
								div
								className="flex gap-7 md:gap-16 xl:gap-28 font-bold text-xl md:text-2xl  "
							>
								<h1 className="">Items</h1>
								<h1 className="">Quantity</h1>
								<h1 className="">Price</h1>
								<h1 className="">Total</h1>
							</div>
							<hr className="w-full my-4" />
							{cart?.length > 0 &&
								cart?.map((p) => (
									<div
										key={p._id}
										className="flex gap-10 md:gap-20 xl:gap-36"
									>
										<h1 className="text-lg md:text-xl mb-4 w-[30%]">
											{p.name}
										</h1>
										<h1 className="text-lg md:text-xl mb-4">1</h1>
										<h1 className="text-lg md:text-xl mb-4">
											{p.price} X 1
										</h1>
										<h1 className="text-lg md:text-xl mb-4">
											{p.price}
										</h1>
									</div>
								))}

							<hr />

							<h1 className="text-2xl md:text-3xl mt-4">
								Total : {totalPrice()}
							</h1>
							{auth?.user?.address ? (
								<>
									<h4 className="mt-6 text-xl">
										{" "}
										Current Address : {auth?.user?.address}
									</h4>
									<button
										onClick={() =>
											navigate(`/dashboard/user/profile`)
										}
										className="shadow-md shadow-gray-400 mt-4 border-2 border-blue-600 rounded-md text-xl w-[40%]  px-4 py-2 lg:px-6 lg:py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
									>
										Update Address
									</button>
								</>
							) : (
								<div className="mb-3">
									{auth?.token ? (
										<>
											<button
												onClick={() =>
													navigate(
														`/dashboard/user/profile`
													)
												}
												className="shadow-md shadow-gray-400 mt-4 border-2 border-blue-600 rounded-md text-xl w-[40%]  px-4 py-2 lg:px-6 lg:py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
											>
												Update Address
											</button>
										</>
									) : (
										<button
											onClick={() =>
												navigate(`/login`, {
													state: `/cart`,
												})
											}
											className=" shadow-md shadow-gray-400 mt-4 border-2 border-blue-600 rounded-md text-xl   px-4 py-2 lg:px-6 lg:py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
										>
											Please Login To Checkout
										</button>
									)}
								</div>
							)}
							{!clientToken || !cart?.length > 0 ? (
								""
							) : (
								<div className="flex items-center flex-col pt-4">
									<DropIn
										options={{
											authorization: clientToken,
											paypal: {
												flow: "vault",
											},
											googlePay: {
												button: true,
												transactionInfo: {
													currencyCode: "USD",
													totalPriceStatus:
														"NOT_CURRENTLY_KNOWN",
												},
											},
										}}
										onInstance={(instance) =>
											setInstance(instance)
										}
										onError={(error) => console.log(error)}
									/>
									<button
										onClick={handlePayment}
										disabled={
											loading ||
											!instance ||
											!auth?.user?.address
										}
										className="disabled:bg-green-200 disabled:text-green-400 shadow-md shadow-gray-400 mt-4 border-2 border-green-600 rounded-md text-xl   px-4 py-2 lg:px-6 lg:py-4 bg-green-600 text-white hover:text-green-600 hover:bg-white active:scale-95"
									>
										{loading ? "Processing" : "Checkout"}
									</button>
								</div>
							)}
						</div>
					)}
				</div>
				<div className={"mt-8 flex justify-center"}>
					{auth?.token ? (
						cart.length > 0 ? (
							""
						) : (
							<button
								className="shadow-md shadow-gray-400 border-2 border-blue-600 rounded-md text-xl px-4 py-2 lg:px-6 lg:py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95"
								onClick={() => navigate("/")}
							>
								Add Items To Cart
							</button>
						)
					) : (
						""
					)}
				</div>
			</div>
		</Layout>
	);
};

export default CartPage;
