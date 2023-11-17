import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
	return (
		<div className="w-screen">
			<Helmet>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content={description}
				/>
				<meta
					name="keywords"
					content={keywords}
				/>
				<meta
					name="author"
					content={author}
				/>
				<title>{title}</title>
			</Helmet>
			<Header />
			<Toaster />
			<main className="min-h-[80vh]">
				{children}
			</main>
			<Footer />
		</div>
	);
};
Layout.defaultProps = {
	title: "eCommerce App - Shop Now",
	description: "A Simple Ecommerce Application",
	keywords: "mern , react, nodejs",
	author: "ayush625sri",
};

export default Layout;
