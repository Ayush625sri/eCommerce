import React, { useEffect, useState } from "react";
import UserMenu from '../../components/Layout/UserMenu'
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [auth, setAuth] = useAuth();

	useEffect(() => {
		const { email, name, phone, address } = auth?.user;
		setName(name);
		setPhone(phone);
		setEmail(email);
		setAddress(address);
	}, [auth?.user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put("/api/v1/auth/profile", {
				name,
				email,
				password,
				phone,
				address,
			});

			if (data?.error) {
				toast.error(data?.error);
			} else {
				setAuth({ ...auth, user: data?.updatedUser });
				let ls = localStorage.getItem("auth");
				ls = JSON.parse(ls);
				ls.user = data.updatedUser;
				localStorage.setItem("auth", JSON.stringify(ls));
				toast.success("Profile Updated Successfully");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong!");
		}
	};
	return (
		<Layout title={"Dashboard - Orders"}>
			<div className="flex flex-col lg:flex-row pt-10 md:pt-28 lg:h-screen mb-10">
				<UserMenu />
				<div className="  flex flex-col lg:w-[60%] lg:my-20 mx-10 lg:pt-4 items-center ">
					<div className="px-10 py-8 lg:px-28 lg:py-20 shadow-gray-400 shadow-lg ">
						<h1 className="text-5xl bold text-center">
							Your Profile
						</h1>
						<form
							action=""
							onSubmit={handleSubmit}
							className="mt-8   drop-shadow-lg drop-shadow-gray-400"
						>
							<div className="mb-5">
								<input
									disabled
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email"
									id="email"
									placeholder="Enter Your Email "
									className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5 "
								/>
							</div>
							<div className="mb-5 ">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									name="name"
									id="name"
									placeholder="Enter Your Name "
									className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5 "
								/>
							</div>

							<div className="mb-5">
								<input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									name="password"
									id="password"
									placeholder="Enter Your Password "
									className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5 "
								/>
							</div>
							<div className="mb-5">
								<input
									type="text"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									name="phone"
									id="phone"
									placeholder="Enter Your Phone "
									className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5 "
								/>
							</div>
							<div className="mb-5">
								<input
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									name="address"
									id="address"
									placeholder="Enter Your Address "
									className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5 "
								/>
							</div>

							<div className="mt-8 text-center  ">
								<button className="active:scale-95  shadow-lg shadow-gray-400 text-2xl text-white bg-gray-900 border-gray-900 border-2 w-full p-2 hover:bg-white hover:text-gray-900 rounded-xl">
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
