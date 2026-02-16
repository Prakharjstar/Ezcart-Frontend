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
import { fetchSellerOrders, updateOrderStatus } from '../../../State/seller/SellerOrderSlice';
import { Button, Menu, MenuItem } from '@mui/material';
import { OrderStatus } from '../../../types/orderTypes';


// ✅ ORDER STATUS COLOR + LABEL CONFIG
const ORDER_STATUS_CONFIG: any = {
  PENDING: { color: '#FFA500', label: 'Pending' },
  SHIPPED: { color: '#2196F3', label: 'Shipped' },
  DELIVERED: { color: '#4CAF50', label: 'Delivered' },
  CANCELLED: { color: '#F44336', label: 'Cancelled' },
};


// ✅ DROPDOWN OPTIONS
const ORDER_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending', color: '#FFA500' },
  { value: 'SHIPPED', label: 'Shipped', color: '#2196F3' },
  { value: 'DELIVERED', label: 'Delivered', color: '#4CAF50' },
  { value: 'CANCELLED', label: 'Cancelled', color: '#F44336' },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
  '&:hover': {
    backgroundColor: '#eef2ff',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function OrderTable() {
  const { orders } = useAppSelector(state => state.sellerOrder);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(null);

  const open = Boolean(anchorEl);

  // ✅ OPEN MENU
  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  // ✅ CLOSE MENU
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  // ✅ THIS WAS YOUR MAIN BUG — NOW FIXED
  const handleStatusChange = (orderId: number, orderStatus: OrderStatus) => {
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt") || "",
        orderId,
        orderStatus,
      })
    );

    handleClose(); // close dropdown after selecting
  };

  // ✅ FETCH ORDERS ON LOAD
  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
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
            <StyledTableCell align="right">Update</StyledTableCell>
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
                    {item.orderItems?.map((orderItem: any, index: number) => (
                      <div key={index} className="flex gap-4 items-center border p-2 rounded-md">
                        <img
                          className="w-20 h-20 object-cover rounded-md"
                          src={orderItem.product?.images?.[0]}
                          alt="product"
                        />
                        <div>
                          <h1>Title: {orderItem.product?.title}</h1>
                          <h1>Price: ₹{orderItem.product?.sellingPrice}</h1>
                          <h1>Color: {orderItem.product?.color}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </StyledTableCell>

                {/* ADDRESS */}
                <StyledTableCell align="right">
                  <div className="flex flex-col gap-y-1">
                    <h1>{item.shippingAddress?.name}</h1>
                    <h1>{item.shippingAddress?.address}, {item.shippingAddress?.city}</h1>
                    <h1>{item.shippingAddress?.state} - {item.shippingAddress?.pinCode}</h1>
                    <h1><strong>Mobile:</strong> {item.shippingAddress?.mobile}</h1>
                  </div>
                </StyledTableCell>

                {/* STATUS BADGE */}
                <StyledTableCell align="right">
                  <span
                    style={{
                      padding: '6px 16px',
                      borderRadius: '999px',
                      border: `1px solid ${statusConfig.color}`,
                      color: statusConfig.color,
                      fontWeight: 500,
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </StyledTableCell>

                {/* UPDATE MENU */}
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={(e) => handleClick(e, item.id)}>
                    STATUS
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedOrderId === item.id}
                    onClose={handleClose}
                  >
                    {ORDER_STATUS_OPTIONS.map((status) => (
                      <MenuItem
                        key={status.value}
                        onClick={() =>
                          handleStatusChange(item.id, status.value as OrderStatus)
                        }
                      >
                        <span style={{ color: status.color }}>
                          {status.label}
                        </span>
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>

              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}