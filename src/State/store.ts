import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice"
import orderSlice from "./customer/orderSlice"
import WishListSlice from "./customer/WishListSlice";
import sellerOrderSlice from "./seller/SellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";


const rootReducer = combineReducers({
 seller:sellerSlice,
 sellerProduct:sellerProductSlice,
 product:productSlice,
 auth:authSlice,
 cart:cartSlice,
 order: orderSlice,
 wishlist:WishListSlice,
 transactions: transactionSlice,



  sellerOrder : sellerOrderSlice,

});
const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
