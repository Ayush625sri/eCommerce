import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white text-2xl w-full h-fit max-w-screen flex flex-col  items-center gap-6 py-4'>
      
      <div className="flex flex-col md:flex-row justify-center text-center gap-5 ">
        <Link to="/about" className='mx-5 hover:text-teal-300'> About </Link>  {(screen.width > 590) && <span>|</span>}
        <Link to="/contact" className='mx-5 hover:text-teal-300'> Contact </Link>  {(screen.width > 590) && <span>|</span>}
        <Link to="/policy" className='mx-5 hover:text-teal-300'> Privacy Policy </Link>
      </div>
      <h4 className="text-xl">All Right reserved &copy; eCommerce </h4>
    </div>
  )
}

export default Footer