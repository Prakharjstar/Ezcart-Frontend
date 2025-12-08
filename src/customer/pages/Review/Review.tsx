import React from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";
import ReviewBarCard from "./ReviewBarCard";

const Review= ()=>{
    return(
        <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
            <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
            <img src="http://res.cloudinary.com/dxoqwusir/image/upload/v1727451187/SoftSilkZariBanarasiSaree_1_fwms3w.jpg" alt="" />
            
            <div>
                <div>
                    <p className="font-bold text-xl">Vicky Clothing</p>
                    <p className="text-lg text-gray-600">Women's Saree</p>
                </div>

                <div>
                        <div className="price flex items-center gap-3 mt-5 text-2xl">

                <span className="font-sans text-gray-800"> <CurrencyRupeeIcon/>1200
                </span>
                <span className="line-through text-gray-400"> <CurrencyRupeeIcon/>2000</span>
                <span className="text-green-500 font-semibold">60%</span> 


                </div>

               
                    </div>
            </div>
            </section>
            
            <section></section>

            <section className="space-y-5 w-full">
               
                   <ReviewBarCard/>
                {[1,1,1,1,1,1].map((item)=> <div className="spy3 space-y-3"> <ReviewCard/> <Divider/> </div>)}
              
            </section>

        </div>

    )
}
export default Review