import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Divider } from '@mui/material';

function PricingCard() {
  return (
    <>

    <div className='space-y-3 p-5'>

      <div className='flex justify-between items-center'>
        <span>Subtotal</span>
        <span><CurrencyRupeeIcon sx={{fontSize :12}}/>899</span>

      </div>

       <div className='flex justify-between items-center'>
        <span>Discount</span>
        <span><CurrencyRupeeIcon sx={{fontSize :12}}/>600</span>

      </div>

       <div className='flex justify-between items-center'>
        <span>Shipping</span>
        <span><CurrencyRupeeIcon sx={{fontSize :12}}/>60</span>

      </div>

      <div className='flex justify-between items-center'>
        <span>Plateform</span>
        <span >Free</span>

      </div>

      <Divider />
      <div className='flex justify-between items-center p-5 text-primary-color'>
        <span className='font-bold'>Total</span>
        <span><CurrencyRupeeIcon sx={{fontSize :12}}/>799</span>

      </div>
      </div>      
    </>
  )
}

export default PricingCard
