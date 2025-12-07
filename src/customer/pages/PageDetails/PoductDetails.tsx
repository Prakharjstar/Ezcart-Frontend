import React, { useState } from "react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { AddShoppingCart, CurtainsTwoTone, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
const ProductDetails = ()=>{
   const[quantity , setQuantity] = useState(1);





    return (
        <div className="px-5 lg:px-20 pt-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <section className="flex flex-col lg:flex-row gap-5">

                    <div className="w-full lg:w-[15%]  flex flex-wrap lg:flex-col gap-3">
                        {[1,1,1,1].map((item)=> <img className="lg:w-full w-[50px] cursor-pointer rounded-md" src= "http://res.cloudinary.com/dxoqwusir/image/upload/v1727451187/SoftSilkZariBanarasiSaree_1_fwms3w.jpg" alt="" />)}

                    </div>

                    <div className=" w-full lg:w-[85%]">
                        <img className="w-full rounded-md" src="http://res.cloudinary.com/dxoqwusir/image/upload/v1727451205/SoftSilkZariBanarasiSaree_4_fyohzg.jpg" alt="" />


                    </div>
                </section>

                <section>
                  <h1 className="font-bold text-lg text-primary-color ">Raam Clothing</h1>
                   <p className="text-gray-500 font-semibold"> men black shirt </p>
                   <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
                    <div className="flex gap-1 items-center">
                         <span>4</span> <StarRateIcon sx={{color:teal[500],fontSize:"17px"}} />
                    
                     </div>

                      <Divider orientation="vertical" flexItem/>
                   <span>234 Ratings</span>
                   </div>
                    <div>
                        <div className="price flex items-center gap-3 mt-5 text-2xl">

                <span className="font-sans text-gray-800"> <CurrencyRupeeIcon/>1200
                </span>
                <span className="line-through text-gray-400"> <CurrencyRupeeIcon/>2000</span>
                <span className="text-green-500 font-semibold">60%</span> 


                </div>

                <p className="text-sm">Inclusive of all taxes. Free Shipping above <span className="text-2xl"> <CurrencyRupeeIcon/>1500</span> </p>
                    </div>


                    <div className="mt-7 space-y-3 ">
                        <div className=" flex items-center gap-4">
                            <Shield sx={{color:teal[500]}} />
                            <p>Autentic & Quality Assured</p>

                        </div>

                         <div className=" flex items-center gap-4">
                            <WorkspacePremium sx={{color:teal[500]}} />
                            <p>100% money back guarantee</p>

                        </div>

                         <div className=" flex items-center gap-4">
                            <LocalShipping sx={{color:teal[500]}} />
                            <p>Free shipping & Returns</p>

                        </div>


                        <div className=" flex items-center gap-4">
                            <Wallet sx={{color:teal[500]}} />
                            <p>Pay on delivery might be available</p>

                        </div>

                    </div>


                    <div className="mt-7 space-y-2">

                        <h1>QUANTITY</h1>

                        <div className="flex items-center gap-2 w-[140px] justify-between">
                         
                         <Button disabled={quantity==1} onClick={()=> setQuantity(quantity-1)}>
                            <Remove/>
                         </Button>

                         <span> {quantity}</span>

                         <Button onClick={()=> setQuantity(quantity+1)}>
                            <AddIcon />
                         </Button>
 

                        </div>

                    </div>
                  

                  <div className="mt-12 flex items-center gap-5">

                    <Button  fullWidth variant="contained" startIcon={<AddShoppingCart/>} sx={{py:"1rem"}}>
                        Add To Bag
                    </Button>
                      <Button fullWidth variant="outlined" startIcon={<FavoriteBorder/>} sx={{py:"1rem"}}>
                        WishList
                    </Button>
                  </div>

                       <div className="mt-5 font-semibold">
                        <p>The saree comes with an unstitched blouse piece The blouse worn by the model might be for modelling purpose only.
                            Check the image of the blouse piece to undersatand how the actual blouse piece looks like.
                        </p>
                       </div>

                       <div className="mt-12 space-y-5">
                        <ReviewCard/>
                        <Divider/>

                       </div>


                </section>
            </div>


            <div className="mt-20">
                <h1 className="text-lg font-bold text-center"> Similar Product</h1>
                <div className="pt-5">  <SimilarProduct/></div>
               
            </div>

        </div>
    )
}

export default ProductDetails
