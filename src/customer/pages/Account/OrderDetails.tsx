import { Box, Button } from '@mui/material'
import React from 'react'
import Orders from './Orders'
import { Navigate, useNavigate } from 'react-router-dom'

const OrderDetails = () => {
    const navigate = useNavigate()
  return (
   <Box className= "space-y-5">

    <section className='flex flex-col gap-5 justify-center items-center'>
        <img className='w-[100px]' src={"http://res.cloudinary.com/dxoqwusir/image/upload/v1727452042/pro-ray-andriod-ios-cellecor-yes-original-imagydnsrany7qhy_1_m9n9t5.webp"} alt= "" />
        <div className='text-sm space-y-1 text-center' >

            <h1 className='font-bold'>{"Virani Clothing"}
            </h1>
             <p>Cellecor RAY 1.43" AMOLED Display | 700 NITS |AOD | BT-Calling | AI Voice | Split Screen Smartwatch (Black Strap , Free Sizes)</p>
                <p><strong>Size:</strong>M</p>

        </div>
        <div>
            <Button onClick = {() => navigate(`/reviews/${5}/create`)}> Write Review </Button>
        </div>
        
        
        
        </section>  




   </Box>
  )
}

export default OrderDetails
