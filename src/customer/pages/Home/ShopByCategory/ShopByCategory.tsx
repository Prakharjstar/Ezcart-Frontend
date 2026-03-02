import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/store";
import { Category } from "@mui/icons-material";

const ShopByCategory = ()=>{
    const {customer} = useAppSelector(store=>store)
    return (
        <div className= 'flex flex-wrap  justify-between lg:px-20 gap-7'> 
          {customer?.homePageData?.shopByCategories.map((item)=><ShopByCategoryCard key={item.id} item={item}/>) }
        </div>
    )
}

export default ShopByCategory;