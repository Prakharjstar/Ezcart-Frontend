import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import womenleveltwo from "../../../data/category/level two/womenLevelTwo";
import electronicsLevelTwo from "../../../data/category/level two/electroicsLevelTwo";
import furnitureLevelTwo from "../../../data/category/level two/furnitureLevelTwo";
import menLevelTwo from "../../../data/category/level two/menLevelTwo";

import menLevelThree from "../../../data/category/level three/menLevelThree";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import electronicsMobilesLevelThree from "../../../data/category/level three/electronicsLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";

const CategoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenleveltwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const CategoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsMobilesLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory }: any) => {
  const navigate = useNavigate();

  const childCategory = (category: any, parentCategoryId: any) => {
    return category?.filter(
      (child: any) => child.parentCategoryId === parentCategoryId
    );
  };

  return (
    <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
      <div className="flex text-sm flex-wrap">
        {CategoryTwo[selectedCategory]?.map((parent: any, index: number) => (
          <div
            key={parent.categoryId}   // ✅ KEY #1 (level two)
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="text-primary-color mb-5 font-semibold">
              {parent.name}
            </p>

            <ul className="space-y-3">
              {childCategory(CategoryThree[selectedCategory], parent.categoryId)
                ?.map((child: any) => (
                  <li
                    key={child.categoryId}   // ✅ KEY #2 (level three)
                    onClick={() => navigate("/products/" + child.categoryId)}
                    className="hover:text-primary-color cursor-pointer"
                  >
                    {child.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;