import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
const AdminMenu = () => {
	const [state,setState] = useState("")
	const [auth, setAuth] = useAuth()

	return (
		<div className="flex flex-col xl:w-3/12 m-10 mt-8 ">
			<h4 className="text-4xl text-center bold">Admin Dashboard</h4>
			
			<div className="flex flex-col mt-3  gap-2">
				<NavLink
					className={` text-2xl p-3 shadow-xl shadow-gray-400 bg-gray-100 border-2 border-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-900 active:scale-95 rounded-lg  `}
					to="/dashboard/admin/create-category" 
				>
					Create Category
				</NavLink>
				<NavLink
					className={` text-2xl p-3 shadow-xl shadow-gray-400 bg-gray-100 border-2 border-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-900 active:scale-95 rounded-lg  `}
					to="/dashboard/admin/create-product" 
				>
					Create Product
				</NavLink>
				<NavLink
					className={` text-2xl p-3 shadow-xl shadow-gray-400 bg-gray-100 border-2 border-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-900 active:scale-95 rounded-lg  `}
					to="/dashboard/admin/products" 
				>
					Products
				</NavLink>
				 <NavLink
					className={` text-2xl p-3 shadow-xl shadow-gray-400 bg-gray-100 border-2 border-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-900 active:scale-95 rounded-lg  `}
					to="/dashboard/admin/orders" 
				>
					Orders
				</NavLink>
				<NavLink
					className={` text-2xl p-3 shadow-xl shadow-gray-400 bg-gray-100 border-2 border-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-900 active:scale-95 rounded-lg  `}
					to="/dashboard/admin/users" 
				>
					Users
				</NavLink>
			</div>
		</div>
	);
};

export default AdminMenu;
