import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { User } from "../types/userTypes";

// 🔹 Send OTP (Login/Signup) for Customer/Seller
export const sendLoginSignupOtp = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>(
  "auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

// 🔹 Signin (Customer/Seller via OTP, Admin via Password)
export const Signin = createAsyncThunk<
  { jwt: string; role: string; user?: User },
  { email: string; otp?: string; password?: string },
  { rejectValue: string }
>(
  "auth/signing",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginRequest);
      const { jwt, role, user } = response.data;

      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      return { jwt, role, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

// 🔹 Signup (Customer)
export const Signup = createAsyncThunk<
  { jwt: string; user: User },
  { email: string; fullName: string; otp: string },
  { rejectValue: string }
>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      const { jwt, user } = response.data;

      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      return { jwt, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup Failed");
    }
  }
);

// 🔹 Fetch user profile
export const fetchUserProfile = createAsyncThunk<
  User,
  { jwt: string },
  { rejectValue: string }
>(
  "auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// 🔹 Logout
export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch(authSlice.actions.logout());
  }
);

interface AuthState {
  jwt: string | null;
  role: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt"),
  role: localStorage.getItem("role"),
  otpSent: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.role = null;
      state.isLoggedIn = false;
      state.user = null;
      state.otpSent = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // OTP
      .addCase(sendLoginSignupOtp.pending, (state) => { state.loading = true; })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => { state.loading = false; state.otpSent = true; })
      .addCase(sendLoginSignupOtp.rejected, (state) => { state.loading = false; })

      // Signin
      .addCase(Signin.pending, (state) => { state.loading = true; })
      .addCase(Signin.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.user = action.payload.user || state.user;
        state.isLoggedIn = true;
        state.otpSent = false;
        state.loading = false;
      })
      .addCase(Signin.rejected, (state, action) => { state.loading = false; console.log("Login Failed:", action.payload); })

      // Signup
      .addCase(Signup.pending, (state) => { state.loading = true; })
      .addCase(Signup.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.user.role;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.otpSent = false;
        state.loading = false;
      })
      .addCase(Signup.rejected, (state, action) => { state.loading = false; console.log("Signup Failed:", action.payload); })

      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;