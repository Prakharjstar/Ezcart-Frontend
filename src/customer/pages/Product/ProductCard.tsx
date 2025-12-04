import { Button, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProductCard.css"
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const images=[
    "https://www.yourdesignerwear.com/media/catalog/product/cache/a0979443816098060a7c4564522c3a96/r/a/rani-pink-meenakari-weaving-dola-silk-saree-prf238303.jpg","https://resources.indianclothstore.com/productimages/Magenta-Banarasi-Silk-Saree-With-Blouse-206611032025.jpg"
]

const ProductCard = ()=>{

    const[currentImage,setCurrentImage]=useState(0)
    const[isHovered , setIsHovered]=useState(false)

   useEffect(()=>{

    let interval:any

    if(isHovered){
        interval=setInterval(()=>{
            setCurrentImage((prevImage) => (prevImage+1) % images.length);
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
                {images.map((item,index)=> <img className='card-media object-top' src={item} alt=""  style={{transform:`translateX(${(index-currentImage)*100}%)`}}  />)}
            
            { <div className="indicator flex flex-col items-center space-y-2">
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
                    <h1>MOHEYS</h1>
                    <p> Red Saree</p>

                </div>

                <div className="price flex items-center gap-3">

                <span className="font-sans text-gray-800"> rs 1200
                </span>
                <span className="thin-line-through text-gray-400"> rs 2000</span>
                <span className="text-green-500 font-semibold">60%</span> 


                </div>

            </div>

          

        </div>
            
        </>
    )
}

export default ProductCard