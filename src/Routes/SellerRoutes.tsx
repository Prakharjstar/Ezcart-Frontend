
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from '../seller/pages/Products/Product'
import Dashboard from '../seller/pages/SellerDashboard/Dashboard'
import AddProduct from '../seller/pages/Products/AddProduct'
import Orders from '../seller/pages/Orders/Orders'
import Profile from '../seller/pages/Account/Profile'
import Payment from '../seller/pages/Payment/Payment'
import Transaction from '../seller/pages/Payment/Transaction'

const SellerRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path="/*" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/transaction" element={<Transaction />} />

        


      </Routes>

    </div>
  )
}

export default SellerRoutes
