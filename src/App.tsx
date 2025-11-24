import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function App() {
  return (
    <div className="p-10">
      <h1 className='font-bold text-4xl  flex justify-center mt-5 '> Welcome to Ezcart Project</h1>
<div className='flex justify-center'>
    <Button variant='contained'>Start</Button>

    <AddShoppingCartIcon/>

</div>
    
   
    </div>
  );
}

export default App;
