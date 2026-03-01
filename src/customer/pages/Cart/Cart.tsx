import React, { useEffect, useState } from "react";
import { Close, LocalOffer } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItemCard";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import { applyCoupon } from "../../../State/customer/CouponSlice";

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleApplyCoupon = () => {
    const jwt = localStorage.getItem("jwt") || "";

    if (!couponCode) return;

    dispatch(applyCoupon({
      apply: "true",
      code: couponCode,
      orderValue: cart?.totalSellingPrice || 0,
      jwt
    }));
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Cart Items */}
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart?.cartItems.map((item) =>
            <CartItem key={item.id} item={item} />
          )}
        </div>

        {/* Right Section */}
        <div className="col-span-1 text-sm space-y-3 border">

          <div className="border rounded-md px-5 py-3 space-y-5">

            <div className="flex gap-3 text-sm items-center">
              <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              <span>Apply Coupons</span>
            </div>

          
            { !cart?.couponCode ? (

              <div className="flex justify-between items-center">
                <TextField
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="coupon code"
                  size="small"
                />
                <Button size="small" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>

            ) : (

              <div className="flex">
                <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                  <span>Applied: {cart.couponCode}</span>
                  <IconButton size="small">
                    <Close className="text-red-600" />
                  </IconButton>
                </div>
              </div>

            )}

          </div>

          <div className="border rounded-md">
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Buy now
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;