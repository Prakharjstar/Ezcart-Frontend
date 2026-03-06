import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Deal, DealsState, ApiResponse } from "../../types/dealTypes";
import { api } from "../../config/api";

const API_URL = "/admin/deals";

/* ================= CREATE DEAL ================= */
export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("created deal", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
      );
    }
  }
);

/* ================= GET ALL DEALS ================= */
export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("get all deals", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch deals"
      );
    }
  }
);

/* ================= UPDATE DEAL ================= */
export const updateDeal = createAsyncThunk<
  Deal,
  { id: number; data: Deal }
>("deals/updateDeal", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`${API_URL}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update deal"
    );
  }
});

/* ================= DELETE DEAL ================= */
export const deleteDeal = createAsyncThunk<number, number>(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete<ApiResponse>(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete deal"
      );
    }
  }
);

/* ================= INITIAL STATE ================= */
const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

/* ================= SLICE ================= */
const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    resetDealState: (state) => {
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    /* ---- GET DEALS ---- */
    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = action.payload;
    });

    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* ---- CREATE ---- */
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealCreated = true;
      state.deals.push(action.payload);
    });

    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* ---- UPDATE ---- */
    builder.addCase(updateDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealUpdated = true;

      const index = state.deals.findIndex(
        (d) => d.id === action.payload.id
      );

      if (index !== -1) {
        state.deals[index] = action.payload;
      }
    });

    /* ---- DELETE ---- */
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = state.deals.filter(
        (deal) => deal.id !== action.payload
      );
    });
  },
});

export const { resetDealState } = dealSlice.actions;
export default dealSlice.reducer;