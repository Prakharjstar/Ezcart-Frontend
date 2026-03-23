import { Avatar, Button } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Schedule } from '@mui/icons-material';
import React from 'react';
import { Order, OrderItem } from '../../../types/orderTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/store';
import { cancelOrder, fetchUserOrderHistory } from '../../../State/customer/orderSlice';

interface OrderItemCardProps {
  order: Order;
  item: OrderItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ order, item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder(order.id));
      // Refetch orders to update the list
      dispatch(fetchUserOrderHistory(localStorage.getItem('jwt') || ''));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <Avatar sx={{ bgcolor: teal[500] }}>
          <Schedule />
        </Avatar>
        <div>
          <h1 className="font-bold text-primary-color">{order.orderStatus}</h1>
          <p>Arriving By {order.deliverDate}</p>
        </div>
      </div>

      <div className="p-5 bg-teal-50 flex gap-3 items-center">
        <div>
          <img
            className="w-[70px]"
            src={item.product?.images?.[0] || '/placeholder.png'}
            alt={item.product?.title || 'Product'}
          />
        </div>

        <div className="w-full space-y-2">
          <h1 className="font-bold">{item.product?.seller?.businessDetails?.businessName || 'Seller'}</h1>
          <p>{item.product?.title}</p>
          <p><strong>Size:</strong> {item.size || 'FREE'}</p>
        </div>

        <div className="flex flex-col justify-center">
          {order.orderStatus !== 'CANCELLED' && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                handleCancelOrder();
              }}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;