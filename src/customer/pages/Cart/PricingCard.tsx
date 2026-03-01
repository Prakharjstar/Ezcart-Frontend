import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Divider } from '@mui/material';
import { useAppSelector } from "../../../State/store";

function PricingCard() {
  const { cart } = useAppSelector((store) => store.cart);

  const subtotal = cart?.totalSellingPrice ?? 0;
  const discount = cart?.discountAmount ?? 0;
  const shipping = subtotal > 0 ? 60 : 0;
  const finalPrice = cart?.finalPrice ?? subtotal;
  const total = finalPrice + shipping;

  return (
    <div className='space-y-3 p-5'>
      <div className='flex justify-between items-center'>
        <span>Subtotal</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{subtotal}</span>
      </div>

      <div className='flex justify-between items-center'>
        <span>Discount</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{discount}</span>
      </div>

      <div className='flex justify-between items-center'>
        <span>Shipping</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{shipping}</span>
      </div>

      <div className='flex justify-between items-center'>
        <span>Platform</span>
        <span>Free</span>
      </div>

      <Divider />

      <div className='flex justify-between items-center p-5 text-primary-color'>
        <span className='font-bold'>Total</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{total}</span>
      </div>
    </div>
  );
}

export default PricingCard;