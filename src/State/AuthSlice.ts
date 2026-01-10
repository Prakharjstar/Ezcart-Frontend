import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

 export const sendLoginSignupOtp=createAsyncThunk("/auth/sendLoginSignupOtp" , async({email}:{email:string} , {rejectWithValue})=>{
    try {
        const response=await api.get("/auth/sent/login-signup-otp" )

        console.log( "login otp " ,response)
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})