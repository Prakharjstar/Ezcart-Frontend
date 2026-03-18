import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

/**
 * SAFE LOCAL STORAGE PARSER
 */
const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined" || data === "null") return null;
    return JSON.parse(data);
  } catch (e) {
    console.warn("Invalid user in localStorage. Clearing...");
    localStorage.removeItem("user");
    return null;
  }
};

interface SellerLoginState {
  loading: boolean;
  jwt: string | null;
  user: any | null;
  error: string | null;
  otpSent: boolean;
}

const initialState: SellerLoginState = {
  loading: false,
  jwt: localStorage.getItem("jwt"),
  user: getStoredUser(),
  error: null,
  otpSent: false,
};

//
// 🔹 SEND OTP (optional)
//
export const sendSellerOtp = createAsyncThunk<any, string, { rejectValue: any }>(
  "seller/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/sellers/send-otp", { email });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to send OTP" });
    }
  }
);

//
// 🔹 SELLER LOGIN WITH OTP (existing)
//
export const sellerLoginOtp = createAsyncThunk<any, { email: string; otp: string }, { rejectValue: any }>(
  "seller/loginOtp",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/sellers/login", loginData);

      const { jwt, role } = response.data;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "OTP Login Failed" });
    }
  }
);

//
// 🔹 SELLER LOGIN WITH EMAIL + PASSWORD (NEW)
//
export const sellerLoginEmail = createAsyncThunk<any, { email: string; password: string }, { rejectValue: any }>(
  "seller/loginEmail",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/sellers/login-email", loginData);

      const { token, role, email: sellerEmail, sellerName } = response.data;

      // store JWT + seller info
      localStorage.setItem("jwt", token);
      localStorage.setItem("role", role);
      localStorage.setItem("sellerEmail", sellerEmail);
      localStorage.setItem("sellerName", sellerName);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Email login failed" });
    }
  }
);

//
// 🔹 FETCH SELLER PROFILE
//
export const fetchSellerProfile = createAsyncThunk<any, void, { rejectValue: string }>(
  "seller/profile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT found");

      const response = await api.get("/api/sellers/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch seller profile");
    }
  }
);

//
// 🔹 SLICE
//
const sellerSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.user = null;
      state.error = null;
      state.otpSent = false;

      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("sellerEmail");
      localStorage.removeItem("sellerName");
    },
  },
  extraReducers: (builder) => {
    builder
      // OTP
      .addCase(sendSellerOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sendSellerOtp.fulfilled, (state) => { state.loading = false; state.otpSent = true; })
      .addCase(sendSellerOtp.rejected, (state, action: any) => { state.loading = false; state.error = action.payload?.message || "OTP sending failed"; })

      .addCase(sellerLoginOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sellerLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.error = null;
      })
      .addCase(sellerLoginOtp.rejected, (state, action: any) => { state.loading = false; state.error = action.payload?.message || "OTP login failed"; })

      // EMAIL + PASSWORD
      .addCase(sellerLoginEmail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sellerLoginEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.token;
        state.user = { email: action.payload.email, name: action.payload.sellerName };
        state.error = null;
      })
      .addCase(sellerLoginEmail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Email login failed";
      })

      // PROFILE
      .addCase(fetchSellerProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchSellerProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload || "Profile fetch failed"; });
  },
});

export const { logout } = sellerSlice.actions;
export default sellerSlice.reducer;