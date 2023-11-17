import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
	return (
		<Layout title={"About - eCommerce App"}>
			<div className="pt-20 md:pt-20 flex flex-col md:p-10 md:text-justify lg:flex-row  w-full xl:h-[100vh] items-center justify-center gap-10 ">
				<img
					className="rounded-xl hidden md:block md:w-[50vw] lg:block border-gray-900 border-4"
					src="/images/about.jpeg"
					alt="This is an image"
				/>
				<div className=" mx-4 xl:mx-auto">
					<h2 className="text-2xl xl:text-5xl uppercase text-center bg-gray-900 text-white p-4 rounded-lg mb-4 md:hidden xl:block">
						About Us
					</h2>
					<p className="text-xl mb-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Itaque, dolorum earum? Suscipit sit vel aut esse,
						cupiditate nesciunt obcaecati alias facilis est
						accusantium tempore consequatur nobis excepturi hic
						accusamus, quidem impedit eaque! Non tenetur quae
						aliquam quas, fugiat alias. Quidem obcaecati veritatis
						ipsa odio dolorum voluptates itaque corporis ullam,
						praesentium eius sunt delectus voluptate vero esse enim
						facere labore, ab tempora mollitia fuga quaerat. Laborum
						nulla reprehenderit, dolor, dolore neque repellat
						necessitatibus quos, odio possimus veritatis quia illo
						totam? Officia tempore soluta iure doloribus enim
						voluptatem accusamus vero nemo aliquam cumque ex, et
						animi illo expedita nisi perspiciatis. Ad, deserunt.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default About;
