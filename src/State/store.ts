import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import sellerSlice from "./seller/sellerslice";
import sellerAuthSlice from "./seller/SellerAuthSlice";
import sellerProductSlice from "./seller/sellerProductSlice";

import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice";
import orderSlice from "./customer/orderSlice";
import WishListSlice from "./customer/WishListSlice";
import customerSlice from "./customer/customerSlice";
import couponReducer from "./customer/CouponSlice";

import sellerOrderSlice from "./seller/SellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";

import adminSlice from "./admin/adminSlice";
import dealSlice from "./admin/dealSlice";

const rootReducer = combineReducers({
  // seller
  seller: sellerSlice,
  sellerAuth: sellerAuthSlice,
  sellerProduct: sellerProductSlice,

  // customer
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: WishListSlice,
  customer: customerSlice,
  coupon: couponReducer,

  // seller operations
  transactions: transactionSlice,
  sellerOrder: sellerOrderSlice,

  // admin
  admin: adminSlice,
  deal: dealSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;