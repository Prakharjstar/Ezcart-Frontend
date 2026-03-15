import { HomeCategory } from "../types/HomeCategoryTypes";

export const homeCategories :HomeCategory[]= [

  // ================= ELECTRIC CATEGORIES =================

  {
    categoryId: "gaming_laptops",
    section: "ELECTRIC_CATEGORIES",
    name: "Gaming Laptop",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/x/9/j/-original-imahyjzh7m2zsqdg.jpeg?q=70"
  },
  {
    categoryId: "mobiles",
    section: "ELECTRIC_CATEGORIES",
    name: "Mobile",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUquDFrgS0C3D8aemRxfmaeUpdgfi5bav7XLha8kj65A&s"
  },
  {
    categoryId: "smart_watches",
    section: "ELECTRIC_CATEGORIES",
    name: "Smartwatch",
    image: "https://m.media-amazon.com/images/I/71Qo9+t9T3L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    categoryId: "television",
    section: "ELECTRIC_CATEGORIES",
    name: "TV",
    image: "https://kannankandy.com/wp-content/uploads/2025/06/TCL-55-UHD-SMART-GOOGLE-TV-494410492-i-1-1200Wx1200H-800x800.jpeg"
  },
  {
    categoryId: "cameras",
    section: "ELECTRIC_CATEGORIES",
    name: "Camera",
    image: "https://my.canon/media/image/2023/02/06/d2a14a492cb94cbab491012c291fd6f5_EOS+R8+RF24-50mm+f4.5-6.3+IS+STM+Front+Slant.png"
  },

  // ================= GRID (FASHION HIGHLIGHT) =================

  {
    categoryId: "women_lehenga_cholis",
    section: "GRID",
    name: "Women Lehenga Cholis",
    image: "https://www.kollybollyethnics.com/image/catalog/data/31Aug2017/Sonal-chauhan-blue-green-georgette-party-wear-anarkali-suit-4705.jpg"
  },
  {
    categoryId: "men_formal_shoes",
    section: "GRID",
    name: "Men Formal Shoes",
    image: "https://images.unsplash.com/photo-1595950653128-46bb078c9f46?auto=format&fit=crop&w=800&q=80"
  },
  {
    categoryId: "women_sarees",
    section: "GRID",
    name: "Men Sherwanis",
    image: "https://images.unsplash.com/photo-1520974735196-48ad189d6553?auto=format&fit=crop&w=800&q=80"
  },
  {
    categoryId: "women_jewellery",
    section: "GRID",
    name: "Women Jewellery",
    image: "https://images.unsplash.com/photo-1564538074104-8f594603dca1?auto=format&fit=crop&w=800&q=80"
  },
  {
    categoryId: "women_footwear",
    section: "GRID",
    name: "Women Footwear",
    image: "https://images.unsplash.com/photo-1515562141247-45095ddda306?auto=format&fit=crop&w=800&q=80"
  },

  // ================= SHOP BY CATEGORIES =================

  {
    name: "Home Décor",
    categoryId: "home_decor",
    section: "SHOP_BY_CATEGORIES",
    image: "ADD_IMAGE_HERE"
  },
  {
    name: "Kitchen & Table",
    categoryId: "kitchen_table",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1540508614847-096a7d3e8b42?auto=format&fit=crop&w=800&q=80"
  },
  {
    parentCategoryId: "women",
    name: "Sports & Active Wear",
    categoryId: "women_sports_active_wear",
    section: "SHOP_BY_CATEGORIES",
    image: "https://media.istockphoto.com/id/466367844/photo/clothes-make-running.jpg?s=612x612&w=0&k=20&c=eGOSP7X2MoXpGKhv8a3UlYHplvKvIIdUPmVKBSd3bMI="
  },
  {
    parentCategoryId: "women",
    name: "Lingerie & Sleepwear",
    categoryId: "women_lingerie_sleepwear",
    section: "SHOP_BY_CATEGORIES",
    image: "https://s.alicdn.com/@sc04/kf/Hb51bb6fc2ee645c6b357af59899d6fbd7/With-Cheap-Price-Loose-Satin-Sexy-Sleepwear-Sexy-Mature-Woman-Lingerie-Photos-Silk-Nightdress-Pyjama-Sexy-Pour-Femme.jpg"
  },


  {
    name: "Kitchen & Dining",
    categoryId: "kitchen_dining",
    section: "SHOP_BY_CATEGORIES",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbuxOfw1dwgbWeav4KqMYF9ZimA0YfPIML8g&s"
  },
  {
    name: "Beauty & Care",
    categoryId: "beauty",
    section: "SHOP_BY_CATEGORIES",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/8/XN/NF/SB/157564005/beauty-personal-care.jpg"
  },
  {
    name: "Sports & Fitness",
    categoryId: "sports",
    section: "SHOP_BY_CATEGORIES",
    image: "https://img.freepik.com/free-photo/strong-man-training-gym_1303-23478.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    name: "Bags & Accessories",
    categoryId: "bags",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1526178615851-9f207f3e0a8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Women Saree",
    categoryId: "women_sarees",
    section: "SHOP_BY_CATEGORIES",
    image: "https://diademstore.com/cdn/shop/collections/Saree_7699a67e-f424-4525-aa79-ce73e2d335ed_1200x1200.jpg?v=1741269128"
  },
  {
    name: "Men Shirts",
    categoryId: "men_shirts",
    section: "SHOP_BY_CATEGORIES",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/24505482/2023/8/15/64c33c99-2c8c-4474-a54b-f55cd3f18a331692108535803MISCHIEFMONKEYMenNavyBlueClassicOpaqueCasualShirt1.jpg"
  },
  {
    name: "Laptops",
    categoryId: "laptops",
    section: "SHOP_BY_CATEGORIES",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/x/9/j/-original-imahyjzh7m2zsqdg.jpeg?q=70"
  },
  {
    name: "Mobile Accessories",
    categoryId: "mobile_accessories",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1584801297693-07c96d5d0a4f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smart Wearable Tech",
    categoryId: "smart_wearable_tech",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tablets",
    categoryId: "tablets",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1581276879432-15a7432b7a50?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Flooring",
    categoryId: "flooring",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1586201375761-83865001ca21?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Lamps",
    categoryId: "lamps",
    section: "SHOP_BY_CATEGORIES",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
  },


  // ================= DEALS =================

  {
    name: "Women Skirts",
    categoryId: "women_skirts_palazzos",
    section: "DEALS",
    image: "ttps://thefebruarycompany.in/cdn/shop/files/jpeg-optimizer_6_9832e297-d61e-4315-b421-1f49b464d535.png?v=1756579837"
  },
  {
    name: "Men Formal Shirts",
    categoryId: "men_formal_shirts",
    section: "DEALS",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/24505482/2023/8/15/64c33c99-2c8c-4474-a54b-f55cd3f18a331692108535803MISCHIEFMONKEYMenNavyBlueClassicOpaqueCasualShirt1.jpg"
  },
  {
    name: "Women Saree",
    categoryId: "women_sarees",
    section: "DEALS",
    image: "https://diademstore.com/cdn/shop/collections/Saree_7699a67e-f424-4525-aa79-ce73e2d335ed_1200x1200.jpg?v=1741269128"
  },
  {
    name: "Smart Watches",
    categoryId: "smart_watches",
    section: "DEALS",
    image: "https://static.vecteezy.com/system/resources/thumbnails/036/780/706/small/ai-generated-innovative-smart-watch-mockup-for-tech-marketing-ai-generated-photo.jpg"
  },

  {
    name : "Men Festive Wear",
    categoryId: "men_indian_and_festive_wear",
    section: "DEALS",
    image: "https://img.faballey.com/images/Product/XMS27009Z/1.jpg"
  },
  {
    name: "Mobile Phones",
    categoryId: "mobiles",
    section: "DEALS",
    image: "https://cdn.beebom.com/mobile/apple-iphone-17-pro-front-back.png"
  },

];