import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/store';
import React from 'react';
import { fetchSellerOrders } from '../../../State/seller/SellerOrderSlice';

const ORDER_STATUS_CONFIG: any = {
  PENDING: { color: '#FFA500', label: 'Pending' },
  SHIPPED: { color: '#2196F3', label: 'Shipped' },
  DELIVERED: { color: '#4CAF50', label: 'Delivered' },
  CANCELLED: { color: '#F44336', label: 'Cancelled' },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: '#f9fafb' },
  '&:hover': { backgroundColor: '#eef2ff' },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export default function OrderTable() {
  const { orders } = useAppSelector(state => state.sellerOrder);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem('jwt') || ''));
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(orders || []).map((item: any) => {
            const statusConfig = ORDER_STATUS_CONFIG[item.orderStatus] || {};

            return (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.id}</StyledTableCell>

                {/* PRODUCTS */}
                <StyledTableCell>
                  <div className="flex gap-2 flex-wrap">
                    {item.orderItems?.map((orderItem: any, index: number) => {
                      const product = orderItem.product;
                      if (!product) return null; // skip if product is null

                      return (
                        <div key={index} className="flex gap-4 items-center border p-2 rounded-md">
                          <img
                            className="w-20 h-20 object-cover rounded-md"
                            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
                            alt={product.title || 'product'}
                          />
                          <div>
                            <h1>Title: {product.title || 'N/A'}</h1>
                            <h1>Price: ₹{product.sellingPrice ?? 'N/A'}</h1>
                            <h1>Color: {product.color || 'N/A'}</h1>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </StyledTableCell>

                {/* SHIPPING ADDRESS */}
                <StyledTableCell align="right">
                  <div className="flex flex-col gap-y-1">
                    <h1>{item.shippingAddress?.name || 'N/A'}</h1>
                    <h1>{item.shippingAddress?.address || ''}, {item.shippingAddress?.city || ''}</h1>
                    <h1>{item.shippingAddress?.state || ''} - {item.shippingAddress?.pinCode || ''}</h1>
                    <h1><strong>Mobile:</strong> {item.shippingAddress?.mobile || 'N/A'}</h1>
                  </div>
                </StyledTableCell>

                {/* ORDER STATUS */}
                <StyledTableCell align="right">
                  <span style={{
                    padding: '6px 16px',
                    borderRadius: '999px',
                    border: `1px solid ${statusConfig.color}`,
                    color: statusConfig.color,
                    fontWeight: 500,
                  }}>
                    {statusConfig.label}
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}