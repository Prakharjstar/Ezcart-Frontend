import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const SellerLogin = createAsyncThunk<any, any>(
  "/sellerAuth/sellerLogin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);

      console.log("seller login response", response.data);

      const { jwt, role } = response.data;

   
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", role);

    
      return response.data;

    } catch (error: any) {
      console.log("error --- ", error);
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);