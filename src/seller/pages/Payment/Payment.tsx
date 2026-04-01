import { Button, Card, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TransactionTable from './Transaction'

const Payment = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lastPayment, setLastPayment] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:5454/api/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {

        const completedOrders = data.filter(
          (order: any) => order.paymentStatus === "COMPLETED"
        );

        const revenue = completedOrders.reduce(
          (sum: number, order: any) => sum + order.totalSellingPrice,
          0
        );

        setTotalRevenue(revenue);

        if (completedOrders.length > 0) {
          const latest = [...completedOrders].sort(
            (a: any, b: any) =>
              new Date(b.orderDate).getTime() -
              new Date(a.orderDate).getTime()
          )[0];

          setLastPayment(latest.totalSellingPrice);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='space-y-5'>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className='text-gray-600 font-medium'>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1'>₹{totalRevenue}</h1>

        <Divider />

        <p className='text-gray-600 font-medium pt-1'>
          Last Payment : <strong>₹{lastPayment}</strong>
        </p>
      </Card>

      <div className='pt-20 space-y-3'>
        <Button variant='contained'>
          Transaction
        </Button>
        <TransactionTable />
      </div>
    </div>
  )
}

export default Payment