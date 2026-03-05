import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/store";
import { Category } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ShopByCategory = ()=>{
    const {customer} = useAppSelector(store=>store)
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: string) => {
       
        const categoryMap: { [key: string]: string } = {
            // Electronics
            tablets: "electronics_tablets",
            laptops: "electronics_laptops_desktop_pcs",
            mobiles: "electronics_mobiles",
            mobile_accessories: "electronics_mobile_accessories",
            smart_wearable_tech: "electronics_smart_wearables",
           
            home_decor: "furniture_home_decors",
            flooring: "furniture_flooring",
            lamps: "furniture_lamps",
            kitchen_table: "furniture_kitchen_table",
            // Women
            women_sports_active_wear: "women_sports_and_active_wear_general",
            women_lingerie_sleepwear: "women_lingerie_and_sleepwear",
         
            men_shirts: "men_topwear",
            
            beauty: "beauty",
            sports: "sports",
            bags: "bags",
            kitchen_dining: "kitchen_dining"
        };
        
        const navigatePath = categoryMap[categoryId] || categoryId;
        navigate(`/products/${navigatePath}`);
    };

    return (
        <div className= 'flex flex-wrap  justify-between lg:px-20 gap-7'> 
          {customer?.homePageData?.shopByCategories.map((item)=><ShopByCategoryCard key={item.id} item={item} onClick={() => handleCategoryClick(item.categoryId)} />) }
        </div>
    )
}

export default ShopByCategory;