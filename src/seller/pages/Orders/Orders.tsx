import React, { useEffect } from 'react'
import OrderTable from './OrderTable'
import { useAppDispatch, useAppSelector } from '../../../State/store'
import { fetchUserOrderHistory } from '../../../State/customer/orderSlice';

const Orders = () => {

  return (
    <div>
      <h1 className='font-bold mb-5 text-xl'>All Orders</h1>
      <OrderTable/>
    </div>
  )
}

export default Orders
