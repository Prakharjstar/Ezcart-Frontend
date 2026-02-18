import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

interface SellerLoginState {
  loading: boolean;
  jwt: string | null;
  user: any | null;
  error: string | null;
}

const initialState: SellerLoginState = {
  loading: false,
  jwt: localStorage.getItem("jwt"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  error: null,
};

// 🔹 Seller OTP login (via /auth/signing)
export const SellerLogin = createAsyncThunk<any, { email: string; otp: string }>(
  "seller/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginData);  // same endpoint as customer
      const { jwt, user, role } = response.data;

      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);

      return { jwt, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Login Failed" });
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      })
      .addCase(SellerLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout } = sellerSlice.actions;
export default sellerSlice.reducer;