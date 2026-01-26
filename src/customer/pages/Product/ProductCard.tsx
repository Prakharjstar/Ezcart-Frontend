import { Button, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProductCard.css"
import { Favorite, ModeComment } from "@mui/icons-material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { teal } from "@mui/material/colors";
import { Product } from "../../../types/ProductTypes";



const ProductCard = ({item}:{item:Product})=>{

    const[currentImage,setCurrentImage]=useState(0)
    const[isHovered , setIsHovered]=useState(false)

   useEffect(()=>{

    let interval:any

    if(isHovered){
        interval=setInterval(()=>{
            setCurrentImage((prevImage) => (prevImage+1) % item.images.length);
        },1000 )
    }
    else if(interval){
        clearInterval(interval)
    }
     return ()=> clearInterval(interval)

   },[isHovered])
    return (
        <>

        <div className="group px-4 relative">
            <div className='card' onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}  >
                {item.images.map((item,index)=> <img className='card-media object-top' src={item} alt=""  style={{transform:`translateX(${(index-currentImage)*100}%)`}}  />)}
            
            { isHovered && <div className="indicator flex flex-col items-center space-y-2">
                <div className="flex gap-3">

            <Button variant="contained" color="secondary">
                <Favorite sx={{color:teal[500]}}/>

            </Button>
              <Button variant="contained" color="secondary">
                <ModeComment sx={{color:teal[500]}}/>

            </Button>
                </div>
                



            </div>
             }
            
            </div>

            <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
                <div className="name">
                    <h1>{item.seller?.businessDetails.businessName}</h1>
                    <p>{item.title}</p>

                </div>

                <div className="price flex items-center gap-3">

                <span className="font-sans text-gray-800"> <CurrencyRupeeIcon sx={{fontSize :12}}/> {item.sellingPrice}
                </span>
                <span className="thin-line-through text-gray-400"> <CurrencyRupeeIcon sx={{fontSize :12}}/> {item.mrpPrice}</span>
                <span className="text-green-500 font-semibold">{item.discountPercent}%</span> 


                </div>

            </div>

          

        </div>
            
        </>
    )
}

export default ProductCard