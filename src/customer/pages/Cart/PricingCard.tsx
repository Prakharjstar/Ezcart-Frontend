import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Divider } from '@mui/material';
import { useAppSelector } from '../../../State/store';

function PricingCard() {
  const { cart } = useAppSelector((store) => store.cart);
  console.log("FINAL CART 👉", cart);

  // Prices
  const mrp = cart?.totalMrpPrice ?? 0;
  const sellingPrice = cart?.totalSellingPrice ?? 0;

  // Discounts
  const productDiscount = cart?.productDiscountAmount ?? 0;
  const couponDiscount = cart?.couponDiscountAmount ?? 0;

  // Final price after all discounts
  const finalPrice = cart?.finalPrice ?? (sellingPrice - couponDiscount);

  // Shipping
  const shipping = sellingPrice > 0 ? 60 : 0;

  // Total including shipping
  const total = finalPrice + shipping;

  return (
    <div className="space-y-3 p-5">

      <div className="flex justify-between">
        <span>MRP</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{mrp}</span>
      </div>

      <div className="flex justify-between">
        <span>Selling Price</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{sellingPrice}</span>
      </div>

      {productDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Product Discount</span>
          <span>- ₹{productDiscount}</span>
        </div>
      )}

      {couponDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Coupon Discount</span>
          <span>- ₹{couponDiscount}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span>Shipping</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{shipping}</span>
      </div>

      <Divider />

      <div className="flex justify-between text-lg font-bold text-primary-color">
        <span>Total</span>
        <span><CurrencyRupeeIcon sx={{ fontSize: 12 }} />{total}</span>
      </div>

    </div>
  );
}

export default PricingCard;