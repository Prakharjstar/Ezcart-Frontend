import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Deal, DealsState, ApiResponse } from "../../types/dealTypes";
import { api } from "../../config/api";

const API_URL = "/admin/deals";

/* ================= CREATE DEAL ================= */
export const createDeal = createAsyncThunk<Deal, Deal>(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, deal);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
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
    const response = await api.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update deal"
    );
  }
});

/* ================= DELETE DEAL ================= */
export const deleteDeal = createAsyncThunk<
  number,
  number
>("deals/deleteDeal", async (id, { rejectWithValue }) => {
  try {
    await api.delete<ApiResponse>(`${API_URL}/${id}`);
    return id; // return id so we remove from state
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete deal"
    );
  }
});

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
    builder.addCase(updateDeal.pending, (state) => {
      state.loading = true;
    });
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
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* ---- DELETE ---- */
    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = state.deals.filter(
        (deal) => deal.id !== action.payload
      );
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetDealState } = dealSlice.actions;
export default dealSlice.reducer;