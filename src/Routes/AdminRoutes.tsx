import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/Pages/Sellers/SellersTable'
import Coupons from '../admin/Pages/Coupons/Coupons'
import AddNewCouponform from '../admin/Pages/Coupons/AddNewCouponform'
import GridTable from '../admin/Pages/HomePage/GridTable'
import ElectronicTable from '../admin/Pages/HomePage/ElectronicTable'
import ShopByCategory from '../admin/Pages/HomePage/ShopByCategoryTable'
import ShopByCategoryTable from '../admin/Pages/HomePage/ShopByCategoryTable'
import Deal from '../admin/Pages/HomePage/Deal'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path ='/' element ={<SellersTable/>} />
         <Route path ='/coupon' element ={<Coupons/>} />
          <Route path ='/add-coupon' element ={<AddNewCouponform/>} />
           <Route path ='/home-grid' element ={<GridTable/>} />
            <Route path ='/electronics-category' element ={<ElectronicTable/>} />
             <Route path ='/shop-bycategory' element ={<ShopByCategoryTable/>} />
              <Route path ='/deals' element ={<Deal/>} />


      </Routes>
    </div>
  )
}

export default AdminRoutes
