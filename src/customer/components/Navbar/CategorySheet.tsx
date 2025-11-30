import React from "react";

import womenleveltwo from "../../../data/category/level two/womenLevelTwo";
import electronicsLevelTwo from "../../../data/category/level two/electroicsLevelTwo";
import furnitureLevelTwo from "../../../data/category/level two/furnitureLevelTwo";
import menLevelThree from "../../../data/category/level three/menLevelThree";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import electronicsMobilesLevelThree from "../../../data/category/level three/electronicsLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";
import { Box } from "@mui/material";
import menLevelTwo from "../../../data/category/level two/menLevelTwo";

const CategoryTwo={
    men:menLevelTwo ,
    women:womenleveltwo,
    electronics: electronicsLevelTwo,
    home_furniture: furnitureLevelTwo,
    
}

const CategoryThree={
    men: menLevelThree,
    women: womenLevelThree,
    electronics: electronicsMobilesLevelThree,
    home_furniture:furnitureLevelThree
}

const CategorySheet = () =>{
    
    return(
       

      <Box  className= 'shadow-lg lg:h-[500px] overflow-y-auto'>
        <div className='flex text-sm flex-wrap'>

     {
        CategoryTwo["men"]?.map((item)=><div>
            <p className='text-primary-color  mb-5 font-semibold'>{item.name}</p>
        </div>)
     }

        </div>

      </Box>
    )
}

export default CategorySheet;