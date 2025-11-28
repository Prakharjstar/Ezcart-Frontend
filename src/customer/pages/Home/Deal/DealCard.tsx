import React from "react";

const DealCard = ()=>{
    return(
        <div className='w-[13rem] cursor-pointer'>
            <img className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top' src="https://saumyasstores.com/cdn/shop/files/51UBLGZ3A2L.jpg?v=1744969384" alt="" />
            <div className='border-4 border-black text-white p-2 text-center bg-black'>
                <p className='text-lg font-semibold'>Smart Watch</p>
                <p className='text-2xl font-bold'>20% OFF</p>
                <p className='text-balance text-lg'>Shop now</p>
            </div>

            
        </div>
    )
}

export default DealCard