import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

/**
 * SAFE LOCAL STORAGE PARSER
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
// 🔹 SELLER LOGIN (OTP)
//
export const SellerLogin = createAsyncThunk<
  { jwt: string },
  { email: string; otp: string },
  { rejectValue: any }
>("seller/login", async (loginData, { rejectWithValue }) => {
  try {

    const response = await api.post("/sellers/login", loginData);

    const { jwt, role } = response.data;

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("role", role);

    // clear invalid stored user
    localStorage.removeItem("user");

    return { jwt };

  } catch (err: any) {
    return rejectWithValue(
      err.response?.data || { message: "Login Failed" }
    );
  }
});

//
// 🔹 FETCH SELLER PROFILE
//
export const fetchSellerProfile = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("seller/profile", async (_, { rejectWithValue }) => {
  try {

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      throw new Error("No JWT found");
    }

    const response = await api.get("/sellers/profile", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const seller = response.data;

    localStorage.setItem("user", JSON.stringify(seller));

    return seller;

  } catch (err) {
    return rejectWithValue("Failed to fetch seller profile");
  }
});

//
// 🔹 SELLER SLICE
//
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
        state.error = null;
      })

      .addCase(SellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.error = null;
      })

      .addCase(SellerLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // FETCH PROFILE
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile fetch failed";
      });

  },
});

export const { logout } = sellerSlice.actions;

export default sellerSlice.reducer;