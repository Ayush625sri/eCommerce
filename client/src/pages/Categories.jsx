import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
const Categories = () => {
	const categories = useCategory();
    const navigate = useNavigate()
	return (
		<Layout title={"All Categories"}>
			<h1 className="pt-20 lg:pt-28 text-3xl md:text-5xl text-center ">All Categories</h1>
			<hr className="my-4" />
			<div className="flex justify-center items-center xl:h-[80vh] ">

				<div className="px-8 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-8 mb-10">
					{categories.map((c, idx) => (
						<div className="">
							<button 
                            key={idx}
								className="active:scale-95 shadow-lg shadow-gray-400 w-full text-center text-xl px-28 py-16 rounded-lg  border-2 border-gray-800 bg-gray-800 text-white hover:text-gray-800 hover:bg-white "
                                onClick={()=>navigate(`/category/${c.slug}`)}

                            >
								{c.name}    
							</button>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Categories;
