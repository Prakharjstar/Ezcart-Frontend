export const mainCategory = [
  // ===================== MEN =====================
  {
    name: "Men",
    categoryId: "men",
    level: 1,

    levelTwoCategory: [
      {
        name: "Topwear",
        categoryId: "men_topwear",
        parentCategoryId: "men",
        level: 2
      },
      {
        name: "Bottomwear",
        categoryId: "men_bottomwear",
        parentCategoryId: "men",
        level: 2
      },
      {
        name: "Innerwear & Sleepwear",
        categoryId: "men_innerwear_and_sleepwear",
        parentCategoryId: "men",
        level: 2
      },
      {
        name: "Footwear",
        categoryId: "men_footwear",
        parentCategoryId: "men",
        level: 2
      },
      {
        name: "Personal Care & Grooming",
        categoryId: "men_personal_care",
        parentCategoryId: "men",
        level: 2
      }
    ]
  },

  // ===================== WOMEN (UPDATED) =====================
  {
    name: "Women",
    categoryId: "women",
    level: 1,

    levelTwoCategory: [
      {
        name: "Indian & Fusion Wear",
        categoryId: "women_indian_and_fusion_wear",
        parentCategoryId: "women",
        level: 2
      },
      {
        name: "Western Wear",
        categoryId: "women_western_wear",
        parentCategoryId: "women",
        level: 2
      },
      {
        name: "Footwear",
        categoryId: "women_footwear",
        parentCategoryId: "women",
        level: 2
      },
      {
        name: "Sports & Active Wear",
        categoryId: "women_sports_active_wear",
        parentCategoryId: "women",
        level: 2
      },
      {
        name: "Lingerie & Sleepwear",
        categoryId: "women_lingerie_and_sleepwear",
        parentCategoryId: "women",
        level: 2
      }
    ]
  },
   {
    name: "Home & Furniture",
    categoryId: "home_furniture",
    level: 1,
    levelTwoCategory: [
      {
        name: "Bed Linen & Furnishing",
        categoryId: "furniture_bed_linen_furnishing",
        parentCategoryId: "home_furniture",
        level: 2
      },
      {
        name: "Flooring",
        categoryId: "furniture_flooring",
        parentCategoryId: "home_furniture",
        level: 2
      },
      {
        name: "Bath",
        categoryId: "furniture_bath",
        parentCategoryId: "home_furniture",
        level: 2
      },
      {
        name: "Lamps",
        categoryId: "furniture_lamps",
        parentCategoryId: "home_furniture",
        level: 2
      },
      {
        name: "Home Decors",
        categoryId: "furniture_home_decors",
        parentCategoryId: "home_furniture",
        level: 2
      }
    ]
  },

   {
    name: "Electronics",
    categoryId: "electronics",
    level: 1,
    levelTwoCategory: [
      {
        name: "Mobiles",
        categoryId: "electronics_mobiles",
        parentCategoryId: "electronics",
        level: 2
      },
      {
        name: "Mobile Accessories",
        categoryId: "electronics_mobile_accessories",
        parentCategoryId: "electronics",
        level: 2
      },
      {
        name: "Smart Wearable Tech",
        categoryId: "electronics_smart_wearable_tech",
        parentCategoryId: "electronics",
        level: 2
      },
      {
        name: "Laptops",
        categoryId: "electronics_laptops",
        parentCategoryId: "electronics",
        level: 2
      },
      {
        name: "Tablets",
        categoryId: "electronics_tablets",
        parentCategoryId: "electronics",
        level: 2
      }
    ]
  }
];
export default mainCategory;
