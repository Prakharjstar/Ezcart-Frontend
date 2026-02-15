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
    cursor: 'pointer',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function OrderTable() {
  const  {sellerOrder} = useAppSelector(store => store)

  const dispatch = useAppDispatch();

  React.useEffect(()=>{
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Order Id</StyledTableCell>
            <StyledTableCell >Products</StyledTableCell>
            <StyledTableCell align="right">ShippingAddress</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell >
                <StyledTableCell>
  <div className="flex flex-col gap-4">

    {item.orderItems?.map((orderItem: any) => (
      <div
        key={orderItem.id}
        className="border p-3 rounded-md flex flex-col gap-3"
      >

        {/* ✅ SHOW ALL IMAGES */}
        <div className="flex gap-2 flex-wrap">
          {orderItem.product?.images?.length > 0 ? (
            orderItem.product.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt="product"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* ✅ PRODUCT DETAILS */}
        <div>
          <h1><b>Title:</b> {orderItem.product?.title}</h1>
          <h1><b>Price:</b> ₹{orderItem.product?.sellingPrice}</h1>
          <h1><b>Size:</b> {orderItem.size}</h1>
          <h1><b>Qty:</b> {orderItem.quantity}</h1>
        </div>

      </div>
    ))}

  </div>
</StyledTableCell>
                
              </StyledTableCell>
              {/* <StyledTableCell align="right">{item.fat}</StyledTableCell>
              <StyledTableCell align="right">{item.carbs}</StyledTableCell>
              <StyledTableCell align="right">{item.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}