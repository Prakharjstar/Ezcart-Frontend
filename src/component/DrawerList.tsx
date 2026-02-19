import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../State/store'
import { logout } from '../State/AuthSlice'

interface menuItem{
    name:string,
    path:string,
    icon: any,
    activeIcon: any
}

interface DrawerListProps{
    menu:menuItem[],
    menu2:menuItem[],
    toggleDrawer:()=>void
}

const DrawerList = ({menu,menu2,toggleDrawer}:DrawerListProps) => {

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    // ✅ Get logged-in role from Redux
    const { role } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    // ✅ Filter Menu Based On Role
    // Hide "Account" for ADMIN
    const filteredMenu = menu.filter((item) => {
        if (role === "ROLE_ADMIN" && item.name === "Account") return false;
        return true;
    });

    // Hide "Login" for ADMIN
    const filteredMenu2 = menu2.filter((item) => {
        if (role === "ROLE_ADMIN" && item.name === "Login") return false;
        return true;
    });

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>

                {/* 🔹 TOP MENU */}
                <div className='space-y-2'>
                    {
                        filteredMenu.map((item:any,index:number)=>
                            <div
                                onClick={() => {
                                    navigate(item.path)
                                    toggleDrawer()
                                }}
                                className='pr-9 cursor-pointer'
                                key={index}
                            >
                                <p className={`${item.path===location.pathname
                                    ? "bg-primary-color text-white"
                                    : "text-primary-color"}
                                    flex items-center px-5 py-3 rounded-r-full`}>

                                    <ListItemIcon>
                                        {item.path===location.pathname
                                            ? item.activeIcon
                                            : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name}/>
                                </p>
                            </div>
                        )
                    }
                </div>

                <Divider/>

                {/* 🔹 BOTTOM MENU */}
                <div className='space-y-2'>
                    {
                        filteredMenu2.map((item:any,index:number)=>
                            <div
                                onClick={() => {
                                    if(item.path === "/") {
                                        handleLogout();
                                    } else {
                                        navigate(item.path)
                                    }
                                    toggleDrawer()
                                }}
                                className='pr-9 cursor-pointer'
                                key={index}
                            >
                                <p className={`${item.path===location.pathname
                                    ? "bg-primary-color text-white"
                                    : "text-primary-color"}
                                    flex items-center px-5 py-3 rounded-r-full`}>

                                    <ListItemIcon>
                                        {item.path===location.pathname
                                            ? item.activeIcon
                                            : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name}/>
                                </p>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default DrawerList;