import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { User } from "../types/userTypes";

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
       
        const response=await api.post("/auth/signing", loginRequest  );
        console.log( "login otp "  ,response.data)
        localStorage.setItem("jwt" , response.data.jwt)
        return response.data.jwt;
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})


 export const Signup=createAsyncThunk<any,any>("/auth/signup" , async(signupRequest , {rejectWithValue})=>{
    try {
       
        const response=await api.post("/auth/signup", signupRequest  );
         const { jwt, user } = response.data
        localStorage.setItem("jwt" , response.data.jwt)
        localStorage.setItem("role", user.role); // store role too
      localStorage.setItem("user", JSON.stringify(user));
        return response.data.jwt;
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})

export const fetchUserProfile=createAsyncThunk<any,any>("auth/fetchUserProfile" , async({jwt} , {rejectWithValue})=>{
   
    try {
       
        const response=await api.get("/api/users/profile",{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        }  );
        console.log( "user profile "  ,response.data)
       
        return response.data;
        
    } catch (error) {
        console.log( "error --- " , error)
    }
})

export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch(authSlice.actions.logout());
  }
);





interface AuthState{
    jwt: string| null,
    otpSent:boolean,
    isLoggedIn:boolean,
    user:User | null,
    loading:boolean

}
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt"),
  otpSent: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  loading: false,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
             state.jwt = null;
    state.isLoggedIn = false;
    state.user = null;
    localStorage.removeItem("jwt");
    localStorage.removeItem("user")

        },
        
    },
    extraReducers: (builder) =>{

        builder.addCase(sendLoginSignupOtp.pending,(state)=>{
            state.loading=true;
        })
         builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
            state.loading=false;
            state.otpSent=true;
        })
        builder.addCase(Signin.fulfilled,(state,action)=>{
            state.jwt=action.payload
            state.isLoggedIn=true
        })
          builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
            state.loading=false;
        })

        builder.addCase(Signup.fulfilled ,(state,action)=>{
            state.jwt=action.payload
            state.isLoggedIn=true
        })

        builder.addCase(fetchUserProfile.fulfilled , (state,action)=>{
            state.user = action.payload
            state.isLoggedIn=true
            localStorage.setItem("user", JSON.stringify(action.payload));
 
        })
     
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer