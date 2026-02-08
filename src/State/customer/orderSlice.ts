import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderState } from "../../types/orderTypes";
import { api } from "../../config/api";
import { Address } from "../../types/userTypes";
import { create } from "domain";
import axios from "axios";
import { extractValidationProps } from "@mui/x-date-pickers";
import { access } from "fs";

const initialState: OrderState ={
    orders: [],
    orderItem: null,
    currentOrder:null,
    paymentOrder : null,
    loading:false,
    error:null,
    orderCanceled: false
};

const API_URL = "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[],string>(
    "orders/fetchUserOrderHistory", async(jwt , {rejectWithValue })=> {
        try {
            const response = await api.get<Order[]>(`${API_URL}/user`,{
                headers: {Authorization :`Bearer ${jwt}`},
            });
            console.log("Order History fetched " , response.data);
            return response.data;
        }catch(error:any){
            console.log("error " , error.response);
            return rejectWithValue(
                error.response.data.error || "Failed to fetch order history"
            );

        }
    }
);


export const fetchOrderById = createAsyncThunk<Order ,{orderId: number , jwt:string}>
('orders/fetchOrderById',async({orderId, jwt},{rejectWithValue})=>{
    try{
        const response = await api.get(`${API_URL}/${orderId}`,{
            headers: {Authorization: `Bearer ${jwt}`},
        });

        console.log("order fetched " , response.data);
        return response.data;
    }catch(error:any){
        console.log("error " , error.response)
        return rejectWithValue("Failed to fetch order");
    }
});

export const createOrder = createAsyncThunk<
  {
    payment_link_url: any;
    orderId: string;
    amount: number;
    currency: string;
    key: string;
  },
  { address: Address; jwt: string; paymentGateway: string }
>(
  "orders/createOrder",
  async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/orders",
        {
          shippingAddress: address,
          paymentMethod: paymentGateway, 
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("order created", response.data);
      return response.data; 
    } catch (error: any) {
      console.error("order creation error", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  }
);

export const fetchOrderItemById = createAsyncThunk<OrderItem , {orderItemId: number , jwt:string}>
("orders/fetchOrderItemById" , async({orderItemId , jwt} , {rejectWithValue})=>{
    try{
        const response = await api.get<OrderItem>(`${API_URL}/item/${orderItemId}`,{
            headers: {Authorization:`Bearer ${jwt}`},
        });

        console.log("order item fetched ", response.data);
        return response.data
    }catch(error:any){
        console.log("error " , error.response)
        return rejectWithValue("Failed to create order");
    }
});

export const paymentSuccess = createAsyncThunk<any, {paymentId: string , jwt: string , paymentLinkId:string},
{rejectValue:string }
>
('orders/paymentSuccess' , async({paymentId , jwt , paymentLinkId},{rejectWithValue})=>{
    try{
        const response = await api.get(`/api/payment/${paymentId}`,{
            headers: {
                Authorization :  `Bearer ${jwt}`,
            },
            params:{paymentLinkId}
        });

        console.log("payment success ", response.data)
        return response.data;
    }catch(error:any){
        console.log("error " , error.response)
         if(axios.isAxiosError(error) && error.response){
            return rejectWithValue(error.response.data);
         }
         return rejectWithValue("An error occurred while cancelling the order ");

    }


});

export const cancelOrder = createAsyncThunk<Order,any>(
    'orders/cancelOrder', async(orderId , {rejectWithValue })=>{
        try{
            const response = await api.put(`${API_URL}/${orderId}/cancel`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },

            });
            console.log("cancel order " , response.data )
            return response.data;
        }catch(error:any){
            console.log("error " , error.response)
            if(axios.isAxiosError(error) && error.response){
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while cancelling the order');
        }
    }
);


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.
        addCase(fetchUserOrderHistory.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.orderCanceled=false;
        })
        .addCase(fetchUserOrderHistory.fulfilled,(state,action:PayloadAction<Order[]>)=>{
            state.orders=action.payload;
            state.loading=false;
            
        })
        .addCase(fetchUserOrderHistory.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
        .addCase(fetchOrderById.pending , (state)=>{
            state.loading = true;
            state.error=null;
        })

        .addCase(fetchOrderById.fulfilled,(state,action:PayloadAction<Order>)=>{
            state.currentOrder=action.payload;
            state.loading=false;

        })

        .addCase(fetchOrderById.rejected , (state, action)=>{
            state.loading = false;
            state.error = action.payload as string
        })

        .addCase(createOrder.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(createOrder.fulfilled,(state, action: PayloadAction<any>)=>{
            state.paymentOrder = action.payload;
            state.loading=false;

        })

        .addCase(createOrder.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(fetchOrderItemById.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchOrderItemById.fulfilled , (state,action)=>{
            state.loading =false;
            state.orderItem=action.payload;
        })

        .addCase(fetchOrderItemById.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(paymentSuccess.pending , (state)=>{
            state.loading = true;
            state.error=null;
        })

        .addCase(paymentSuccess.fulfilled ,(state,action)=>{
            state.loading = false;
            console.log("Payment Successful: " , action.payload);
        })

        .addCase(paymentSuccess.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(cancelOrder.pending , (state)=> {
            state.loading = true;
            state.error = null;
            state.orderCanceled = false;
        })

        .addCase(cancelOrder.fulfilled , (state,action)=>{
            state.loading = false;
            state.orders = state.orders.map((order)=> order.id ===action.payload.id? action.payload : order);
            state.orderCanceled=true;
            state.currentOrder=action.payload
        })
        .addCase(cancelOrder.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default orderSlice.reducer;


