import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const [auth, setAuth] = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/v1/auth/login", {
				email,
				password,
			});
			if (res.data.success) {
				toast.success(res && res.data.message);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				localStorage.setItem("auth", JSON.stringify(res.data));
				navigate(location.state || "/");
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong!");
		}
	};
	return (
		<Layout title={"Login"}>
			<div className="flex flex-col items-center justify-center md:h-[70vh] pt-20">
				<h1 className="text-5xl">Login Page</h1>
				<form
					action=""
					onSubmit={handleSubmit}
					className="mt-4"
				>
					<div className="mb-3">
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							name="email"
							id="email"
							placeholder="Enter Your Email "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							id="password"
							placeholder="Enter Your Password "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>

					<div className="text-right">
						<p onClick={()=> navigate('/forgot-password')} className="text-lg mt-2  text-gray-900 underline">
							Forgot Password ?
						</p>
            </div>
					<div className="my-4 text-center">
						<button className="text-2xl text-white bg-gray-900 border-gray-900 border-2 w-full p-2 hover:bg-white hover:text-gray-900 rounded-xl">
							Login
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
