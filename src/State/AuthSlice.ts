import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

 export const sendLoginSignupOtp=createAsyncThunk("/auth/sendLoginSignupOtp" , async({email}:{email:string} , {rejectWithValue})=>{
    try {
        const response=await api.post("/auth/sent/login-signup-otp",{email , role:"ROLE_SELLER"} )
        console.log( "login otp " ,response)
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})

 export const Signin=createAsyncThunk<any,any>("/auth/signing" , async(loginRequest , {rejectWithValue})=>{
    try {
         const payload = { ...loginRequest, role: "ROLE_SELLER" };
        const response=await api.post("/auth/signing", payload   );
        console.log( "login otp "  ,response.data)
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})