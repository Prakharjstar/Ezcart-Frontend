import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";



export const fetchSellers = createAsyncThunk(
  "seller/fetchSellers",
  async (status: string | null, { rejectWithValue }) => {
    try {

      let url = "/api/sellers";

      // ✅ Only add query param if status exists
      if (status && status !== "ALL") {
        url = `/api/sellers?status=${status}`;
      }

      const response = await api.get(url);

      console.log("API URL:", url); // 🔍 debug
      console.log("Sellers Data:", response.data);

      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async ({ id, status }: { id: number; status: string }, { rejectWithValue }) => {
    try {

      const response = await api.put(`/api/sellers/${id}/status?status=${status}`)

      return response.data

    } catch (error: any) {

      return rejectWithValue(error.response?.data)

    }
  }
)



export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* FETCH ALL SELLERS */

    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   

    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      }).addCase(updateSellerStatus.fulfilled, (state, action) => {

    const index = state.sellers.findIndex(
        (seller) => seller.id === action.payload.id
    )

    if(index !== -1){
        state.sellers[index] = action.payload
    }

})
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default sellerSlice.reducer;