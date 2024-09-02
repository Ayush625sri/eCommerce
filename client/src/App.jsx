import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Policy from './pages/Policy'
import Page404 from './pages/Page404'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import Forgot from './pages/auth/Forgot'
import AdminDashboard from './pages/admin/AdminDashboard'
import Admin from './components/Routes/Admin'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import Products from './pages/admin/Products'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/admin/AdminOrders'
const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/category/:slug' element={<CategoryProduct />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/policy' element={<Policy />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<Forgot />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />}/>
          <Route path='user/profile' element={<Profile />}/>
          <Route path='user/orders' element={<Orders />}/>
        </Route>

        <Route path='/dashboard' element={<Admin />}>
          <Route path='admin' element={<AdminDashboard />}/>
          <Route path='admin/create-category' element={<CreateCategory />}/>
          <Route path='admin/create-product' element={<CreateProduct />}/>
          <Route path='admin/product/:id' element={<UpdateProduct />}/>
          <Route path='admin/products' element={<Products />}/>
          <Route path='admin/users' element={<Users />}/>
          <Route path='admin/orders' element={<AdminOrders />}/>
        </Route>



        <Route path='*' element={<Page404 />}/>
      </Routes>
    </div>
  )
}

export default App  