import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './customer/components/Navbar/Navbar';
import customTheme from './Theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/PageDetails/PoductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import Auth from './customer/pages/Auth/Auth';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import WishList from './customer/WishList/WishList';
import { useAppDispatch, useAppSelector } from './State/store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import { fetchUserProfile } from './State/AuthSlice';
import { createHomeCategories } from './State/customer/customerSlice';
import { homeCategories } from './data/HomeCategories';


function App() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation();

  const jwt = auth.jwt || localStorage.getItem("jwt");

  
 useEffect(() => {
  if (jwt) {
    dispatch(fetchUserProfile({ jwt }));
  }
}, [jwt, dispatch]);

useEffect(() => {
  dispatch(createHomeCategories(homeCategories));
}, [dispatch]);


useEffect(() => {
  if (!auth.user || !jwt) return;

  const role = auth.user.role;

  console.log("Logged in role:", role);

  if (role === "ROLE_SELLER") {
    dispatch(fetchSellerProfile(jwt));  
  }

}, [auth.user, jwt, dispatch]);

  useEffect(() => {
    if (!auth.user) return;

    if (location.pathname === "/login") {
      if (auth.user.role === "ROLE_SELLER") {
        navigate("/seller");
      } else if (auth.user.role === "ROLE_CUSTOMER") {
        navigate("/");
      } else if (auth.user.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
    }
  }, [auth.user, location.pathname, navigate]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/payment-success/:orderId' element={<PaymentSuccess />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;