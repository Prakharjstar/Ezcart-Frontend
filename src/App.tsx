import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Navbar from './customer/components/Navbar/Navbar';
import customTheme from './Theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Deal from './customer/pages/Home/Deal/Deal';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/PageDetails/PoductDetails';
import ReviewCard from './customer/pages/Review/ReviewCard';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import OrderDetails from './customer/pages/Account/OrderDetails';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import { fetchProducts } from './State/FetchProduct';
import Auth from './customer/pages/Auth/Auth';
import { useAppDispatch, useAppSelector } from './State/store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import { fetchUserProfile } from './State/AuthSlice';





function App() {

  const dispatch = useAppDispatch()
  const {seller,auth}=useAppSelector(store=>store)
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
   
  },[])

  useEffect(() => {
  const jwt = auth.jwt || localStorage.getItem("jwt");
  if (jwt) {
   
    dispatch(fetchUserProfile({ jwt }));
  
    if (auth.user?.role === "ROLE_SELLER") {
      dispatch(fetchSellerProfile(jwt));
    }
  }
}, [auth.jwt]);

useEffect(() => {
 
  if (auth.user?.role === "ROLE_SELLER") {
    navigate("/seller");
  } else if (auth.user?.role === "ROLE_CUSTOMER") {
    navigate("/"); 
  }
}, [auth.user]);

  useEffect(()=>{
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem("jwt")}))

  },[auth.jwt])
  return (

    <ThemeProvider theme={customTheme}>
      <div>
      


        {<Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/login" element={<Auth/>} />
         
        </Routes>

      </div>

    </ThemeProvider>


  );
}

export default App;