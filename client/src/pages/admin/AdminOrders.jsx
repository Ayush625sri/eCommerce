import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";
import { Select } from "antd";
import { Option } from "antd/es/mentions";


const AdminOrders = () => {
	const [status, setStatus] = useState([
		"Not Processed",
		"Processing",
		"Shipped",
		"Delivered",
		"Cancelled",
	]);

    const [changeStatus, SetChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);
	const [auth, setAuth] = useAuth();
	const getOrders = async () => {
		try {
			const { data } = await axios.get(`/api/v1/auth/all-orders`);
			setOrders(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (auth?.token) getOrders();
	}, [auth?.token]);

    const handleChange = async (orderId,value)=>{
        try {
            const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`,{
                status:value,
            })
            getOrders()
        } catch (error) {
            console.log(error)
        }

    }
	return (
		<Layout title="Dashboard - All Orders">
			<div className="flex flex-col xl:flex-row mb-8 pt-12 lg:pt-28">
				<AdminMenu />
				<div className="flex flex-col lg:w-full mt-10 lg:mx-10 lg:p-10 pt-4 h-fit border-2 shadow-gray-400 shadow-lg">
					<h1 className="text-5xl text-center">All Orders</h1>
                    <div className="table">
						<div className=" md:mx-12 lg:mx-20 my-8  border">
							{orders?.map((o, i) => {
								return (
									<div key={i}>
										<table className="w-full text-center my-2">
											<thead>
												<tr className="text-xl h-12 ">
													<th scope="col">#</th>
													<th scope="col">Status</th>
													<th scope="col">Buyer</th>
													<th scope="col">Orders</th>
													<th scope="col">Amount</th>
													<th scope="col">Payment</th>
													<th scope="col">Quantity</th>
												</tr>
											</thead>
											<tbody>
												<tr className="text-lg h-10">
													<td>{i + 1}</td>
													<td>
                                                        <Select bordered={false} onChange={(value)=> handleChange(o._id,value)} defaultValue={o?.status}>
                                                           {status.map((s,i)=>(
                                                             <Option key={i} value={s}>
                                                             {s}
                                                         </Option>
                                                           ))}
                                                        </Select>

                                                    </td>

													<td>{o?.buyer?.name}</td>
													<td>
														{moment(
															o?.createdAt
														).fromNow()}
													</td>
													<td>
														${" "}
														{
															o?.payment
																.transaction
																.amount
														}
													</td>
													<td>
														{o?.payment.success
															? "Success"
															: "Failed"}
													</td>
													<td>
														{o?.products?.length}
													</td>
												</tr>
											</tbody>
										</table>
										<div className="flex flex-col">
											{o?.products?.map((p) => (
												<div
													className="mb-2 flex items-center justify-between md:pr-20 bg-gray-200 border  shadow-lg shadow-gray-400"
													key={p._id}
												>
													<div className="flex gap-4 lg:gap-16  bg-gray-200">
														<img
															src={`/api/v1/product/product-photo/${p._id}`}
															alt={p.name}
															className="h-36  md:h-64 shadow-sm shadow-gray-400 border-none"
														/>
														<div className="flex flex-col justify-around bg-gray-200 py-2 md:px-6 ">
															<div className="">
																<h1 className="text-xl md:text-3xl mb-2">
																	{p.name}
																</h1>
																<h1 className="text-lg mb-2 md:mb-4">
																	{p.description}
																</h1>
															</div>
															<div className="md:mt-3 flex lg:gap-8 items-center justify-between">
																<h1 className="text-xl md:text-2xl font-bold">
																	Price : $
																	{p.price}
																</h1>
															</div>
														</div>
													</div>
												</div>
												)
											)}
										</div>
									</div>
									)
								}
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminOrders;
