import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

/**
 * 🔹 SAFE LOCAL STORAGE PARSER
 * Prevents crash when value = "undefined"
 */
const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");

    if (!data || data === "undefined" || data === "null") {
      return null;
    }

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
}

const initialState: SellerLoginState = {
  loading: false,
  jwt: localStorage.getItem("jwt"),
  user: getStoredUser(),
  error: null,
};

//
// 🔹 LOGIN (OTP)
// Backend returns: { jwt, role }
// NOT user anymore
//
export const SellerLogin = createAsyncThunk<
  { jwt: string },
  { email: string; otp: string }
>("seller/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/signing", loginData);
    const { jwt, role } = response.data;

    // ✅ store only safe values
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("role", role);

    // ❌ NEVER store undefined user
    localStorage.removeItem("user");

    return { jwt };
  } catch (err: any) {
    return rejectWithValue(err.response?.data || { message: "Login Failed" });
  }
});

//
// 🔹 FETCH SELLER PROFILE AFTER LOGIN
// THIS is where we get actual seller data
//
export const fetchSellerProfile = createAsyncThunk<any>(
  "seller/profile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/api/sellers/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const seller = response.data;

      // ✅ store VALID JSON ONLY
      localStorage.setItem("user", JSON.stringify(seller));

      return seller;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch seller profile");
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

      // LOGIN
      .addCase(SellerLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(SellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
      })
      .addCase(SellerLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // PROFILE FETCH
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = sellerSlice.actions;
export default sellerSlice.reducer;