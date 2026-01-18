import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Product } from "../../types/ProductTypes";


export const fetchSellerProduct= createAsyncThunk<Product[],any>("/sellerProduct/fetchSellerProducts",
    async(jwt : string ,{rejectWithValue})=>{

        try{
            const response = await api.get(`/sellers/products`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,

                },
            })
            
            const data =  response.data;
            return data;
        }catch(error){
             console.log("error ---",error);
             throw error;
        }

    }
)

export const createProduct = createAsyncThunk<Product,{request:any,jwt:string |null}>("/sellerProduct/createProduct" , 
    async(args , {rejectWithValue})=>{
        const {request , jwt} =args;
        try{
            const response = await api.post(`/sellers/product`,request,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            return response.data;
        }catch(error){
            console.log("error --- " , error);
            throw error;
        }
    }
)

