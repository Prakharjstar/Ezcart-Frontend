import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CouponState {
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  loading: false,
  error: null,
};

// ✅ APPLY COUPON
export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async ({ apply, code, orderValue, jwt }: any) => {

    const res = await fetch(
      `http://localhost:5454/api/coupons/apply?apply=${apply}&code=${code}&orderValue=${orderValue}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const data = await res.json();
    console.log("COUPON RESPONSE 👉", data);

    return data; // 🔥 returns updated cart
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default couponSlice.reducer;