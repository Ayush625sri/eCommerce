import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { BsCart4 } from "react-icons/bs";
import { useAuth } from "../../context/auth.jsx";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";
import { Badge } from "antd";
import { useCart } from "../../context/cart.jsx";
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiClockwork } from "react-icons/gi";
const Header = () => {
	const [auth, setAuth] = useAuth();
	const [cart] = useCart();
	const categories = useCategory();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("auth");
		setAuth({
			...auth,
			user: null,
			token: "",
		});
		toast.success("Logout Successfully");
	};

	const handleNav = () => {
		document.getElementById("navLinks").classList.toggle("hidden");
		document.getElementById("menu").classList.toggle("rotate-90");
	};
	const handleCloseNav = ({ event, path }) => {
		if (screen.width < 1000) {
			document.getElementById("navLinks").classList.add("hidden");
			document.getElementById("menu").classList.toggle("rotate-90");
		}
	};
	const handleShowCategories = () => {
		document.getElementById("categories").classList.toggle("hidden");
		document.getElementById("arrow").classList.toggle("rotate-180");
		document.getElementById("login").classList.add("hidden");
		document.getElementById("logout").classList.add("hidden");
	};
	const handleShowLogin = () => {
		document.getElementById("login").classList.toggle("hidden");
		document.getElementById("arrow1").classList.toggle("rotate-180");
		document.getElementById("categories").classList.add("hidden");
	};
	const handleShowLogout = () => {
		document.getElementById("logout").classList.toggle("hidden");
		document.getElementById("arrow2").classList.toggle("rotate-180");
		document.getElementById("categories").classList.add("hidden");
	};

	const [category, setCategory] = React.useState("");

	const handleChange = (event) => {
		setCategory(event.target.value);
	}; 

	return (
		<nav className=" fixed z-10 bg-gray-900 text-white  w-full lg:flex lg:h-20 lg:items-center xl:px-10 lg:justify-between">
			<div className="flex justify-between items-center px-4 lg:px-1 py-3 ">
				<div className=" flex gap-1 pl-5 ">
					<GiClockwork className=" text-3xl " />
					&nbsp;&nbsp;
					<NavLink
						className="font-semibold text-2xl tracking-tighter "
						to="/"
					>
						VAULT24
					</NavLink>
				</div>

				<button
					id="menu"
					className="block lg:hidden "
					onClick={handleNav}
				>
					<svg
						className="fill-current h-4 w-4 "
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>

			<div
				id="navLinks"
				className="hidden flex-col gap-3 lg:flex lg:items-center lg:flex-row "
			>
				<div className="m-2 w-full">
					<SearchInput />
				</div>

				<div className="flex flex-col gap-3  px-4 py-2 text-2xl lg:flex-row lg:items-center lg:gap- xl:gap-10 ">
					<NavLink
						to="/"
						className="lg:text-2xl hover:border-b-2 pb-1 hover:animate-"
						onClick={() => handleCloseNav("/")}
					>
						Home
					</NavLink>
					<NavLink
						to="/categories"
						className="lg:text-2xl hover:border-b-2 pb-1 hover:animate-"
						onClick={() => handleCloseNav("/")}
					>
						Categories
					</NavLink>

					{/* <NavLink className="lg:relative lg:w-40 hover:border-b-2 pb-1">
						Categories{" "}
						<RiArrowDropDownFill
							id="arrow"
							className="inline"
							onClick={handleShowCategories}
						/>
						<ul
							id="categories"
							className="hidden pl-16 lg:pl-0 mt-2 lg:text-3xl lg:absolute lg:bg-gray-900 "
						>
							<li className="lg:px-4 lg:py-5 border-gray-800 border-2 hover:bg-white hover:text-gray-800">
								<NavLink
									className=""
									to={`/categories`}
								>
									All Categories
								</NavLink>
							</li>
							{categories.map((c, idx) => (
								<li
									key={idx}
									className="mt-7 lg:mt-0 lg:px-4 lg:py-5 border-gray-800 border-2 hover:bg-white hover:text-gray-800"
								>
									<Link
										className=""
										to={`/category/${c?.slug}`}
									>
										{c.name}
									</Link>
								</li>
							))}
						</ul>
					</NavLink> */}

					{!auth.user ? (
						<NavLink
							to="/login"
							className="lg:relative lg:w-24 hover:border-b-2 pb-1"
						>
							Login{" "}
							<RiArrowDropDownFill
								id="arrow1"
								className="inline"
								onClick={handleShowLogin}
							/>
							<ul
								id="login"
								className="hidden pl-16 lg:pl-0 mt-2  lg:text-3xl lg:absolute lg:bg-gray-900 "
							>
								<li className="lg:px-4 lg:py-5 border-gray-800 border-2 hover:bg-white hover:text-gray-800">
									<NavLink
										to="/login"
										className=" lg:text-3xl "
										onClick={() => handleCloseNav("/login")}
									>
										Sign In
									</NavLink>
								</li>
								<li className="mt-6 lg:mt-0 mb-2 lg:mb-0 lg:text-3xl lg:px-4 lg:py-5 border-gray-800 border-2 hover:bg-white hover:text-gray-800">
									<NavLink
										to="/register"
										className=" lg:text-3xl"
										onClick={() =>
											handleCloseNav("/register")
										}
									>
										Register
									</NavLink>
								</li>
							</ul>
						</NavLink>
					) : (
						<NavLink
							to={auth?.user && `/dashboard/user/profile`}
							className="relative lg:w-24  hover:border-b-2 pb-1"
						>
							{auth.user.name[0].toUpperCase() +
								auth.user.name.slice(1)}

							<RiArrowDropDownFill
								id="arrow2"
								className="inline"
								onClick={handleShowLogout}
							/>
							<ul id="logout"
							className="hidden pl-16 lg:pl-0 mt-2 lg:text-3xl lg:absolute lg:bg-gray-900">
								<li className=" mt-2 hover:bg-white  lg:px-4 lg:py-5 hover:text-gray-800 border-2 border-gray-800 lg:mx-0">
									<NavLink
										to={`/dashboard/${
											auth?.user?.role === 1
												? "admin"
												: "user"
										}`}
										className="lg:text-3xl"
									>
										Dashboard
									</NavLink>
								</li>
								<li className="mt-4 lg:mt-0 mb-2  lg:mb-0  lg:px-4 lg:py-5 border-gray-800 border-2 hover:bg-white hover:text-gray-800">
									<NavLink
										onClick={handleLogout}
										to="/login"
										className="lg:text-3xl"
									>
										Logout
									</NavLink>
								</li>
							</ul>
						</NavLink>
					)}
					{cart?.length > 0 ? (
						<Badge
							count={cart?.length}
							showZero
							className="mt-2 lg:mt-0"
						>
							<NavLink
								to="/cart"
								className="flex gap-3 text-white text-2xl hover:border-b-2 pb-1"
							>
								<span>Cart </span>
								{cart?.length > 0 && <BsCart4 className=" " />}
							</NavLink>
						</Badge>
					) : (
						<NavLink
							to="/cart"
							className="text-white mt-2 lg:mt-0 text-2xl"
						>
							<span>Cart </span>
							{cart?.length > 0 && (
								<BsCart4 className="text-white" />
							)}
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
