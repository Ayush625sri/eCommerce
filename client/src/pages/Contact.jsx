import React from "react";
import Layout from "../components/Layout/Layout";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { LuPhoneCall } from "react-icons/lu";
import { IoIosMail } from "react-icons/io";
const Contact = () => {
	return (
		<Layout title={'Contact - eCommerce App'}>
			<div className=" px-4 pt-0 flex flex-col md:p-10 md:text-justify lg:flex-row  w-full h-[100vh] items-center justify-center gap-12 ">
				<img
					className="w-[50vw] rounded-xl hidden md:block md:w-[60vw] lg:block border-gray-900 border-4"
					src="/images/contactus.jpeg"
					alt="This is an image"
				/>
				<div className="mx-auto">
					<h2 className="text-5xl uppercase text-center bg-gray-900 text-white p-4 rounded-lg mb-4">
						Contact Us
					</h2>
					<p className="text-xl">
						For any query or information about products feel free to
						call anytime.
					</p>
					<p className="text-xl mb-5">We are 24x7 available</p>

					<p className="text-2xl flex items-center gap-2">
						<IoIosMail /> : ecom@ecommerce.com
					</p>
					<p className="text-2xl flex items-center gap-2">
						<LuPhoneCall /> : 012-12356789
					</p>
					<p className="text-2xl flex items-center gap-2">
						<TfiHeadphoneAlt /> : 1800-0000-1111-0000 (toll free)
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Contact;
