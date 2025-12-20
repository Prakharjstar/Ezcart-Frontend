import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, Favorite, FavoriteBorder, Storefront } from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import mainCategory from "../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const theme=useTheme();
    const isLarge=useMediaQuery(theme.breakpoints.up("lg"));
    const [selectedCategory,setSelectedCategory]= useState("men");
    const [showCategorySheet , setShowCategorySheet]=useState(false);
    const navigate = useNavigate()
    return(
        <>
            <Box className='bg-white sticky top-0 left-0 right-0' sx={{zIndex:2}}>

                <div className='flex  items-center  justify-between px-5 lg:px-20 h-[70px] border-b '>

                 <div className='flex items-center gap-9'>

                  <div className='flex items-center gap-2'>
                  {!isLarge &&  <IconButton>
                        <MenuIcon className='text-gray-800'/>
                    </IconButton>}
                    <h1 onClick={()=> navigate("/")} className='logo cursor-pointer text-2xl md:text-2xl text-[#009278]'>
                        Ezcart
                    </h1>
                    </div>
                   

                    <ul className='flex items-center font-medium text-gray-800'>
                   {mainCategory.map((item) => (
                            <li  onMouseLeave={()=>{
                                setShowCategorySheet(false)
                         }}
                         onMouseEnter={()=>{
                         setShowCategorySheet(true);
                         setSelectedCategory(item.categoryId); }}
                         className='mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center cursor-pointer'  >
                            {item.name}</li>))}
                                                     </ul>
                </div>

                <div className='flex gap-1 lg:gap-6 items-center' >
                    <IconButton >
                        <SearchIcon className='text-gray-800'/>
                    </IconButton>
                    {
                        true?<Button onClick={()=> navigate("/account/orders")} className='flex items-center gap-2'> 
                             <Avatar
                             sx={{width: 29 , height: 29}}
                              src='https://th.bing.com/th/id/OIP.LLQPg_tu53I3Od8kXM5cFgHaNN?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' /><h1 className="font-semibold hidden lg:block text-[#009278]">Ezcart
                            </h1> 
                            </Button> :<Button variant="contained">Login</Button>
                    }

                    <IconButton>
                    <FavoriteBorder className='text-red-400' sx={{fontSize: 29}}/>
                    </IconButton>

                    <IconButton onClick={()=> navigate("cart")}>
                        <AddShoppingCart className='text-blue-800' sx ={{fontSize:29}}/>
                    </IconButton>

                    { isLarge && <Button onClick={()=> navigate("become-seller")} startIcon={<Storefront />} variant='outlined' ><h1 >Become Seller</h1> 
                    </Button>}   



                </div>
                
             </div>
             { showCategorySheet &&<div  onMouseLeave={()=> setShowCategorySheet(false)}  onMouseEnter={()=> setShowCategorySheet(true)} className='categorySheet absolute top-[4.41rem] left-20 right-20 border '>
                <CategorySheet selectedCategory={selectedCategory}/>
             </div>}

            </Box>

        </>
    )
}
export default Navbar;