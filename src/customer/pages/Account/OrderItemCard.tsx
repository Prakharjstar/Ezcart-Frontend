import { CalendarViewDay, ElectricBolt, Inventory2, Schedule } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { Order, OrderItem } from '../../../types/orderTypes'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../State/store'
import { cancelOrder, fetchUserOrderHistory } from '../../../State/customer/orderSlice'

function OrderItemCard({item ,order}:{item:OrderItem , order:Order}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCancelOrder = async () => {
        try {
            await dispatch(cancelOrder(order.id));
            // Refetch orders to update the list
            dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

  return (
    <div className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>

        <div className='flex items-center gap-5'>

            <div>
                <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
                    <Schedule/>
                </Avatar>
            </div>

            <div>
                <h1 className='font-bold text-primary-color'>PENDING</h1>
                <p>Arriving By {order.deliverDate}</p>
            </div>
        </div>

        <div className='p-5 bg-teal-50 flex gap-3'>

            <div><img className='w-[70px]' src= {item.product.images?.[0]} alt="" />
            </div>

            <div className='w-full space-y-2'>
                <h1 className='font-bold'>{item.product.seller?.businessDetails.businessName}</h1>
                <p>{item.product.title}</p>
                <p><strong>size :</strong>FREE</p>
            </div>
            
            <div className='flex flex-col justify-center'>
                <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking cancel
                        handleCancelOrder();
                    }}
                >
                    Cancel Order
                </Button>
            </div>
            
        </div>
      
    </div>
  )
}

export default OrderItemCard
