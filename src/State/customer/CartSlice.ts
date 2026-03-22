import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../config/api";
import { applyCoupon } from "./CouponSlice";

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
  number,
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

      //  FETCH CART ( TRUST BACKEND COMPLETELY)
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload; //  NO MANUAL CALCULATION
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch cart";
      })

      // APPLY COUPON
      .addCase(applyCoupon.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload; //  updated cart with coupon
      })

      //  ADD ITEM
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        if (!state.cart) return;

        state.cart.cartItems.push(action.payload);
      })

      //  DELETE ITEM
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        if (!state.cart) return;

        state.cart.cartItems = state.cart.cartItems.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default cartSlice.reducer;