// State/customer/WishListSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishList, WishlistState } from "../../types/WishListTypes";
import { api } from "../../config/api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// Fetch wishlist
export const getWishlistByUserId = createAsyncThunk<WishList, void, { rejectValue: string }>(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

// Add product to wishlist
export const addProductToWishlist = createAsyncThunk<WishList, { productId: number }, { rejectValue: string }>(
  "wishlist/addProductToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/wishlist/add-product/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product to wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET Wishlist
    builder.addCase(getWishlistByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWishlistByUserId.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishlistByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch wishlist";
    });

    // ADD Product
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to add product to wishlist";
    });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;