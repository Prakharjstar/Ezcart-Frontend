import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../config/api";

// Utility functions to calculate totals including discounts
const calculateCartTotals = (cartItems: CartItem[]) => {
  const totalMrpPrice = cartItems.reduce(
    (sum, item) => sum + item.mrpPrice * item.quantity,
    0
  );

  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  const discountAmount = totalMrpPrice - totalSellingPrice;
  const finalPrice = totalSellingPrice;

  return { totalMrpPrice, totalSellingPrice, discountAmount, finalPrice };
};

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: {
    id: 0,
    user: {} as any,
    cartItems: [],
    totalSellingPrice: 0,
    totalItem: 0,
    totalMrpPrice: 0,
    discountAmount: 0,
    finalPrice: 0,
    couponCode: null,
  },
  loading: false,
  error: null,
};

const API_URL = "/api/cart";

// Fetch user cart
export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

// Add item
interface AddItemRequest {
  productId: number | undefined;
  size: string;
  quantity: number;
}
export const addItemToCart = createAsyncThunk<
  CartItem,
  { jwt: string | null; request: AddItemRequest }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to add item to cart");
  }
});

// Delete item
export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartItemId: number }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to delete cart item");
  }
});

// Update item
export const updateCartItem = createAsyncThunk<
  any,
  { jwt: string | null; cartItemId: number; cartItem: any }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to update cart item");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        if (action.payload.cartItems) {
          const totals = calculateCartTotals(action.payload.cartItems);
          action.payload.totalMrpPrice = totals.totalMrpPrice;
          action.payload.totalSellingPrice = totals.totalSellingPrice;
          action.payload.discountAmount = totals.discountAmount;
          action.payload.finalPrice = totals.finalPrice;
        }
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item) =>
              item.product.id === action.payload.product.id &&
              item.size === action.payload.size
          );
          if (index !== -1) {
            state.cart.cartItems[index] = { ...state.cart.cartItems[index], ...action.payload };
          } else {
            state.cart.cartItems.push(action.payload);
          }

          const totals = calculateCartTotals(state.cart.cartItems);
          state.cart.totalMrpPrice = totals.totalMrpPrice;
          state.cart.totalSellingPrice = totals.totalSellingPrice;
          state.cart.discountAmount = totals.discountAmount;
          state.cart.finalPrice = totals.finalPrice;
          state.cart.totalItem = state.cart.cartItems.reduce((sum, i) => sum + i.quantity, 0);
        }
        state.loading = false;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item: CartItem) => item.id !== action.meta.arg.cartItemId
          );
          const totals = calculateCartTotals(state.cart.cartItems);
          state.cart.totalMrpPrice = totals.totalMrpPrice;
          state.cart.totalSellingPrice = totals.totalSellingPrice;
          state.cart.discountAmount = totals.discountAmount;
          state.cart.finalPrice = totals.finalPrice;
          state.cart.totalItem = state.cart.cartItems.reduce((sum, i) => sum + i.quantity, 0);
        }
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;