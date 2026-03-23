import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types/orderTypes";
import { api } from "../../config/api";

interface SellerOrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
};

// ===================== FETCH SELLER ORDERS =====================
export const fetchSellerOrders = createAsyncThunk<Order[], string>(
    'sellerOrders/fetchSellerOrders',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/seller/orders', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    }
);

// ===================== UPDATE ORDER STATUS =====================
export const updateOrderStatus = createAsyncThunk<Order, { jwt: string; orderId: number; orderStatus: OrderStatus }>(
    'sellerOrders/updateOrderStatus',
    async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/api/orders/${orderId}/status/${orderStatus}`, null, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update status");
        }
    }
);

// ===================== DELETE ORDER =====================
// ===================== DELETE ORDER =====================
export const deleteOrderBySeller = createAsyncThunk<
  number,
  { jwt: string; orderId: number },
  { rejectValue: string }
>(
  'sellerOrders/deleteOrderBySeller',
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/orders/seller/${orderId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return orderId; // return deleted orderId to remove from state
    } catch (error: any) {
      console.error("DELETE ORDER ERROR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

// ===================== SLICE =====================
const sellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // --- FETCH ---
        builder.addCase(fetchSellerOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchSellerOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // --- UPDATE STATUS ---
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
            state.loading = false;
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) state.orders[index] = action.payload;
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // --- DELETE ORDER ---
        builder.addCase(deleteOrderBySeller.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteOrderBySeller.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order.id !== action.payload);
        });
        builder.addCase(deleteOrderBySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default sellerOrderSlice.reducer;