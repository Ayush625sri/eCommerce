import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [question, setQuestion] = useState("");

  const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();
			try {
			const res = await axios.post(
				'/api/v1/auth/register',
				{ name, email, password, phone, address,question }
			);
      if(res.data.success){
        toast.success(res && res.data.message)
        navigate('/login')
      }
      else{
        toast.error(res.data.message)
      }
		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong!");
		}
	};
	return (
		<Layout title={"Register"}>
			<div className="flex flex-col items-center justify-center md:h-[70vh] pt-20 ">
				<h1 className="text-5xl">Register Page</h1>
				<form
					action=""
					onSubmit={handleSubmit}
					className="mt-4"
				>
					<div className="mb-3">
						<input
							type="text"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							name="name"
							id="name"
							placeholder="Enter Your Name "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>
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
					<div className="mb-3">
						<input
							type="text"
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							name="phone"
							id="phone"
							placeholder="Enter Your Phone "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							required
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							name="address"
							id="address"
							placeholder="Enter Your Address "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>
					<div className="mb-3">
						<input
							type="text"
							required
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							name="question"
							id="question"
							placeholder="What is your pet name "
							className="p-3 text-md border-2  focus:ring focus:ring-gray-900 rounded-xl pl-5"
						/>
					</div>
					<div className="my-6 text-center">
						<button className="text-2xl text-white bg-gray-900 border-gray-900 border-2 w-full p-2 hover:bg-white hover:text-gray-900 rounded-xl">
							Register
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Register;
