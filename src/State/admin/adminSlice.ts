import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory } from "../../types/HomeCategoryTypes";
import { api } from "../../config/api";

const API_URL= '/admin';



export const updateHomeCategory = createAsyncThunk<HomeCategory, {id:number ; data: HomeCategory}>(
    'homeCategory/updateHomeCategory',
    async ({id,data},{rejectWithValue})=>{
        try {
            const response = await api.patch(`${API_URL}/home-category/${id}`,data);
            console.log("category updated ",response.data)
            return response.data;
        }catch(error : any){
        console.log("error " ,error)
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data);
        }else{
            return rejectWithValue('An error occurred while updating the category. ');
        }
        }
    }
);

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
    'homeCategory/fetchHomeCategories',async(__dirname,{rejectWithValue})=>{
        try{
        const response = await api.get(`${API_URL}/home-category`);
        console.log(" categories ", response.data)
        return response.data;

        }catch(error:any){
            console.log("error ", error.response)
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
        }
       
    }
);

interface HomeCategoryState {
    categories:HomeCategory[];
    loading: boolean;
    error: string | null;
    categoryUpdated:boolean;

}

const initialState: HomeCategoryState = {
    categories: [],
    loading: false,
    error:null,
    categoryUpdated: false,
}


const homeCategorySlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{

        // ================= UPDATE CATEGORY =================
        builder.addCase(updateHomeCategory.pending , (state)=>{
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        });

        builder.addCase(updateHomeCategory.fulfilled , (state, action)=>{
            state.loading = false;
            state.categoryUpdated = true;

           
            const index = state.categories.findIndex(
                (category) => category.id === action.payload.id
            );

            if(index !== -1){
                state.categories[index] = action.payload;
            }
        });

        builder.addCase(updateHomeCategory.rejected , (state, action:any)=>{
            state.loading = false;
            state.error = action.payload || "Update Failed";
            state.categoryUpdated = false;
        });


        // ================= FETCH CATEGORIES =================
        builder.addCase(fetchHomeCategories.pending , (state)=>{
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchHomeCategories.fulfilled , (state, action)=>{
            state.loading = false;
            state.categories = action.payload;
        });

        builder.addCase(fetchHomeCategories.rejected , (state, action:any)=>{
            state.loading = false;
            state.error = action.payload || "Fetch Failed";
        });
    }
});

export default homeCategorySlice.reducer;