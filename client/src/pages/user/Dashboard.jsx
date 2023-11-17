import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
	const [auth, setAuth] = useAuth();
	return (
		<Layout title={"Dashboard"}>
			<div className="flex flex-col lg:flex-row pt-10 md:pt-28 lg:h-screen mb-8">
				<UserMenu />
				<div className="flex flex-col lg:w-full lg:mt-20 mx-10 p-10 pt-4 border-2 shadow-gray-800 shadow-lg">
					<h1 className="text-2xl bold mb-3">
						Name : {auth?.user?.name}
					</h1>
					<h1 className="text-2xl bold mb-3">
						Email : {auth?.user?.email}
					</h1>
					<h1 className="text-2xl bold mb-3">
						Address : {auth?.user?.address}
					</h1>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
