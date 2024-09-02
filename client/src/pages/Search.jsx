import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const Search = () => {
    const [values, setValues] = useSearch()
	const [cart, setCart] = useCart()

	const navigate = useNavigate()
  return (
    <Layout title={'Search Results'}> 
    <div className='flex'>
        <div className='flex w-full justify-center flex-col text-center xl:w-full pt-20 lg:pt-28'>
            <h1 className=' text-4xl xl:text-5xl text-center'>Search Results</h1>
            <h6 className='text-2xl mt-4'>{((values?.results.length < 1 ) || (values?.results === ' '))? "No Products Found" : `Found ${values?.results.length} Items`}</h6>
			<hr className="my-4" />
            <div className="  flex flex-wrap gap-8 mx-4 my-8 mb-10 w-full  ">
							{values?.results?.map((p) => (
								<div onClick={() =>
									navigate(
										`/product/${p._id}`
									)
								}
									className="flex flex-col min-w-[15rem] lg:w-96   items-center justify-between border-2 shadow-lg shadow-gray-400 hover:scale-105 hover:cursor-pointer"
									key={p._id}
								>
									<img
										src={`/api/v1/product/product-photo/${p._id}`}
										alt={p.name}
										className="w-full max-h-[65%] border shadow-sm shadow-gray-500"
									/>
								
									<div className="flex flex-col justify-between  w-full px-5 my-4 py-4">
										<div className=" text-left px-4">
											<h3 className="font-bold text-xl ">
												{p.name}
											</h3>
											<p className="text-lg">
												{p.description.substring(0, 30)}
											</p>
											<p className="text-lg">
												Price : $ {p.price}
											</p>
											<p className="text-lg">
												Stock : {p.quantity}
											</p>
										</div>
										<div className="flex gap-2 mt-2 justify-between ">
											<button
											onClick={() =>
												navigate(
													`/product/${p._id}`
												)
											}
											 className="border-2 shadow-md shadow-gray-400 border-blue-600 rounded-md text-xl px-2 py-1 bg-blue-600 text-white hover:text-blue-600 hover:bg-white active:scale-95">
												More Details
											</button>
											<button onClick={() => {
											setCart([...cart, p]);
											localStorage.setItem(
												"cart",
												JSON.stringify([...cart, p])
											);
											toast.success("Item Added To Cart");
										}}
											className="border-2 shadow-md shadow-gray-400 border-gray-600 rounded-md text-xl px-2 py-1 bg-gray-600 text-white hover:text-gray-600 hover:bg-white active:scale-95">
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
        </div>
    </div>
        
    </Layout>
  )
}

export default Search