import React from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom'

const Page404 = () => {
  
  return (
    <Layout title={'Page Not Found'}>
      <div className="h-[95vh] flex flex-col items-center justify-center text-3xl">
        <h1 className='text-5xl md:text-8xl  font-bold text-gray-900'>404</h1>
        <h3 className='p-2'>Oops ! Page Not Found</h3>
        <NavLink to="/" className='bg-gray-800 text-white hover:bg-white hover:text-gray-800 focus:scale-95 shadow-lg shadow-gray-400  px-4 py-3 border-gray-900 border-2 rounded-2xl text-xl'>Go Back To Home Page</NavLink>
      </div>
    </Layout>
  )
}

export default Page404