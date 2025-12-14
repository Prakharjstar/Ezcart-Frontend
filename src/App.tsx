import React from 'react';
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





function App() {
  return (
    
      <ThemeProvider theme={customTheme}>
        <div>
              <Navbar/>
             {/* <Home/>  */}

             {/* <Product/>  */}

              {/* <ProductDetails/> */}

              {/* <Review/> */}
              {/* <Cart/> */}

              {/* <Checkout/> */}

              {/* <Account/> */}

               <OrderDetails/>
            
         
        </div>
      
      </ThemeProvider>
     
  
  );
}

export default App;
