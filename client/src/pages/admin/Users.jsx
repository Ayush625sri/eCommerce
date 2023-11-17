import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Th from "../../components/utils/Th";
import Td from "../../components/utils/Td";

const Users = () => {
	const [auth, setAuth] = useAuth();
	const [users, setUsers] = useState([]);

	const getAllUsers = async () => {
		try {
			const { data } = await axios.get(`/api/v1/auth/users/all`);
			setUsers(data?.users);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (auth?.token) getAllUsers();
	}, [auth?.token]);
	return (
		<Layout title={"Dashboard - Users"}>
			<div className="flex flex-col xl:flex-row mb-8 pt-12 lg:pt-28">
				<AdminMenu />
				<div className="flex flex-col xl:w-full mt-6 xl:mx-10 lg:p-10 pt-4 h-fit  border-2 shadow-gray-400 shadow-xl ">
					<div className="flex justify-center">
						<h1 className="text-4xl lg:text-5xl bold">Users</h1>
					</div>
					<table className="mt-3 md:mt-8 ">
						<thead className="border-b-2 ">
							<tr>
								<Th value="Name"/>
								<Th value="Role"/>
								<Th value="Email"/>
								<Th value="Phone"/>
								<Th value="Address"/>
							
							</tr>
						</thead>
						{/* <hr className="my-4" />/ */}
						{users?.map((u, i) => (
							<tbody
							key={i}
							className="border-b-2 "
							>
								<tr>
									<Td value={u.name} />
									<Td value={u?.role == '0' ? 'User' : 'Admin'} />
									<Td value={u.email} />
									<Td value={u.phone} />
									<Td value={u.address} />

								</tr>
							</tbody>
						))}
					</table>
				</div>
			</div>
		</Layout>
	);
};

export default Users;
