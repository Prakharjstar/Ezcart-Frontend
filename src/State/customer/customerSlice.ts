import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";
import { api } from "../../config/api";



export const createHomeCategories = createAsyncThunk<HomeData , HomeCategory[]>(
    'home/createHomeCategories', async(homeCategories , {rejectWithValue})=>{
        try{
            const response = await api.post('/home/categories',homeCategories);
            console.log("home categories " , response.data)
            return response.data;
        }catch(error:any){
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create ';
            console.log("errr " , errorMessage,error)
            return rejectWithValue(errorMessage)
        }
    }

);


interface HomeState {
    homePageData : HomeData | null ;
    homeCategories: HomeCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    homePageData:null,
    homeCategories:[],
    loading:false,
    error:null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(createHomeCategories.pending , (state)=>{
            state.loading =true;
            state.error= null;
        });

        builder.addCase(createHomeCategories.fulfilled , (state, action)=>{
            state.loading = false;
            state.homePageData=action.payload;
        });
        builder.addCase(createHomeCategories.rejected , (state, action)=>{
            state.loading = false;
            state.error = action.error.message || 'Failed to create home categories'
        });
        
    },
});


export default homeSlice.reducer;