import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../config/api";
import { applyCoupon } from "./CouponSlice";


const calculateCartTotals = (cartItems: CartItem[]) => {
  const totalMrpPrice = cartItems.reduce(
    (sum, item) => sum + item.mrpPrice * item.quantity,
    0
  );

  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  return { totalMrpPrice, totalSellingPrice };
};

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const API_URL = "/api/cart";

// ✅ FETCH CART
export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch {
      return rejectWithValue("Failed to fetch cart");
    }
  }
);

// ✅ ADD ITEM
export const addItemToCart = createAsyncThunk<
  CartItem,
  { jwt: string; request: any }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    const res = await api.put(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return res.data;
  } catch {
    return rejectWithValue("Add item failed");
  }
});

// ✅ DELETE ITEM
export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartItemId: number }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return cartItemId;
  } catch {
    return rejectWithValue("Delete failed");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ FETCH CART
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        const cart = action.payload;

        // 🔥 Only calculate if NO coupon
        if (!cart.couponCode && cart.cartItems) {
          const totals = calculateCartTotals(cart.cartItems);

          cart.totalMrpPrice = totals.totalMrpPrice;
          cart.totalSellingPrice = totals.totalSellingPrice;
          cart.discountAmount = totals.totalMrpPrice - totals.totalSellingPrice;
          cart.finalPrice = totals.totalSellingPrice;
        }

        state.cart = cart;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch cart";
      })

      // ✅ APPLY COUPON (MAIN FIX)
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.cart = action.payload; // 🔥 TRUST BACKEND
      })

      // ✅ ADD ITEM
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        if (!state.cart) return;

        state.cart.cartItems.push(action.payload);

        // ❌ Don't recalc if coupon exists
        if (!state.cart.couponCode) {
          const totals = calculateCartTotals(state.cart.cartItems);

          state.cart.totalMrpPrice = totals.totalMrpPrice;
          state.cart.totalSellingPrice = totals.totalSellingPrice;
          state.cart.discountAmount = totals.totalMrpPrice - totals.totalSellingPrice;
          state.cart.finalPrice = totals.totalSellingPrice;
        }
      })

      // ✅ DELETE ITEM
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (!state.cart) return;

        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== action.payload
        );

        if (!state.cart.couponCode) {
          const totals = calculateCartTotals(state.cart.cartItems);

          state.cart.totalMrpPrice = totals.totalMrpPrice;
          state.cart.totalSellingPrice = totals.totalSellingPrice;
          state.cart.discountAmount = totals.totalMrpPrice - totals.totalSellingPrice;
          state.cart.finalPrice = totals.totalSellingPrice;
        }
      });
  },
});

export default cartSlice.reducer;