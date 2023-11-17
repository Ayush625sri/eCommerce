import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
	const [auth, setAuth] = useAuth();
	return (
		<Layout title={"Admin Dashboard"}>
			<div className="flex flex-col xl:flex-row mb-8 pt-12 lg:pt-28">
				<AdminMenu />
				<div className="flex flex-col xl:w-full xl:mt-20 mx-10 p-10 pt-4 h-fit border-2 shadow-gray-800 shadow-lg">
					<h1 className="text-2xl bold">
						Admin Name : {auth?.user?.name}
					</h1>
					<h1 className="text-2xl bold">
						Admin Email : {auth?.user?.email}
					</h1>
					<h1 className="text-2xl bold">
						Admin Phone : {auth?.user?.phone}
					</h1>
				</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
