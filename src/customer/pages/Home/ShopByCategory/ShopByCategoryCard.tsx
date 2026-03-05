import React from "react";
import "./ShopByCategory.css"
import { HomeCategory } from "../../../../types/HomeCategoryTypes";

const ShopByCategoryCard = ({item, onClick}:{item:HomeCategory, onClick: () => void})=>{

    return(
        <div className= 'flex gap-3 flex-col justify-center items-center  group cursor-pointer' onClick={onClick}>

            <div className='custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full'>
                <img
                    className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full'
                    src={item.image}
                    alt={item.name}
                />
            </div>
            <h1 className="text-center text-sm lg:text-base font-medium mt-2">{item.name}</h1>

        </div>
    )
}
export default ShopByCategoryCard