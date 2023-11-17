import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchInput = () => {
	const [values, setValues] = useSearch();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.get(
				`/api/v1/product/search/${values.keyword}`
			);
			setValues({ ...values, results: data });
			navigate("/search");
		} catch (error) {
			console.log(error);
		}
	};
	return (
			<form
				role="search"
				onSubmit={handleSubmit}
				className=" mx-4  flex gap-2  justify-between"
			>
				<input
					className="rounded-md p-2 text-black w-full "
					type="search"
					name="search"
					id="search"
					autoFocus
					placeholder="Search"
					value={values?.keyword ? values.keyword : ""}
					onChange={(e) =>
						setValues({ ...values, keyword: e.target.value })
					}
				>

					</input>
				<button
					className="shadow-md shadow-gray-600 border-2 border-blue-600 rounded-md text-xl px-2 py-1 bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:scale-105 active:scale-95"
					type="submit"
					>
					Search
				</button>
			</form>
	);
};

export default SearchInput;
