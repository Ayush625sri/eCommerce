import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue , message="Create", color=`gray`, input=true, altMessage=''} ) => {
	let hidden = "block"
	if (!input){
		hidden="hidden"
	} else{
		hidden="flex"
	}
	return (
		<form onSubmit={handleSubmit}>
			<div className="my-4 flex flex-col md:flex-row items-center justify-around gap-4 md:gap-8 text-xl">
				{altMessage ? <h2 className="text-xl bold border-2 px-8 py-2 rounded-md">{altMessage}</h2> : <></>}
				<input 
                    className={`px-2 py-2 w-full lg:w-96 border-2 border-gray-900 rounded-md shadow-gray-400 shadow-lg ${hidden} `}
					type="text"
					name=""
					placeholder={`${message} Category`}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
            <button type="submit" className={`py-2 px-5 w-full shadow-gray-400 shadow-xl bg-green-800 text-white  rounded-md border-2 border-green-800 hover:bg-white hover:text-green-800 active:scale-95 `}>{message}</button>
			</div>
		</form>
	);
};

export default CategoryForm;
