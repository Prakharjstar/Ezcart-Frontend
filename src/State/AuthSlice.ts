import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { User } from "../types/userTypes";


const getStoredUser = (): User | null => {
  try {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined" || stored === "null") {
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.warn("⚠️ Invalid user in localStorage. Clearing...");
    localStorage.removeItem("user");
    return null;
  }
};

const setStoredUser = (user?: User) => {
  if (user && typeof user === "object") {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 Send OTP                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* 🔹 Signin                                                                   */
/* -------------------------------------------------------------------------- */

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

      setStoredUser(user);

      return { jwt, role, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

/* -------------------------------------------------------------------------- */
/* 🔹 Signup                                                                   */
/* -------------------------------------------------------------------------- */

export const Signup = createAsyncThunk<
  { message: string },
  { email: string; fullName: string; otp: string },
  { rejectValue: string }
>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);


      return { message: response.data.message };

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Signup Failed"
      );
    }
  }
);
/* -------------------------------------------------------------------------- */
/* 🔹 Fetch Profile                                                            */
/* -------------------------------------------------------------------------- */

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

      setStoredUser(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

/* -------------------------------------------------------------------------- */
/* 🔹 Logout                                                                   */
/* -------------------------------------------------------------------------- */

export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    dispatch(authSlice.actions.logout());
  }
);

/* -------------------------------------------------------------------------- */
/* 🔹 STATE                                                                    */
/* -------------------------------------------------------------------------- */

interface AuthState {
  jwt: string | null;
  role: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt"),
  role: localStorage.getItem("role"),
  otpSent: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user: getStoredUser(), // ✅ SAFE HYDRATION
  loading: false,
};

/* -------------------------------------------------------------------------- */
/* 🔹 SLICE                                                                    */
/* -------------------------------------------------------------------------- */

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
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state) => {
        state.loading = false;
      })

      // Signin
      .addCase(Signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signin.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.user = action.payload.user || null;
        state.isLoggedIn = true;
        state.otpSent = false;
        state.loading = false;
      })
      .addCase(Signin.rejected, (state) => {
        state.loading = false;
      })

      // Signup
      .addCase(Signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup.fulfilled, (state, action) => {
        
     
        state.otpSent = false;
        state.loading = false;
      })
      .addCase(Signup.rejected, (state) => {
        state.loading = false;
      })

      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;