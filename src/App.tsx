import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Navbar from './customer/components/Navbar/Navbar';
import customTheme from './Theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Deal from './customer/pages/Home/Deal/Deal';





function App() {
  return (
    
      <ThemeProvider theme={customTheme}>
        <div>
             <Navbar/>
             <Home/>
            
             
         
        </div>
      


      </ThemeProvider>
     
  
  );
}

export default App;
