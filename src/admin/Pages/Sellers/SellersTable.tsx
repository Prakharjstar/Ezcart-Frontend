

import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const accountStatu = [
{
    status: 'PENDING_VERIFICATION',
    title: 'Pending Verification',
    description: 'Account verification is pending'
  },
  {
    status: 'ACTIVE',
    title: 'Active',
    description: 'Your account is active and fully accessible'
  },
  {
    status: 'SUSPENDED',
    title: 'Suspended',
    description: 'Your account has been temporarily suspended'
  },
  {
    status: 'DEACTIVATED',
    title: 'Deactivated',
    description: 'Your account has been deactivated'
  },
  {
    status: 'BANNED',
    title: 'Banned',
    description: 'Your account has been permanently banned'
  },
  {
    status: 'CLOSED',
    title: 'Closed',
    description: 'Your account has been permanently closed'
  }

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

const SellersTable = () => {

    const [accountStatus , setAccountStatus] =useState("ACTIVE")


    const handleChange = (event:any)=>{
        setAccountStatus(event.target.value)
    }
  return (
    <>
    <div className='pb-5 - w-60'>

        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={accountStatus}
    label="AccountStatus"
    onChange={handleChange}
  >
    { accountStatu.map((item)=><MenuItem value={item.status}>{item.title}</MenuItem> )
   }
  </Select>
</FormControl>
      
    </div>

     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Seller Name</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="right">GSTIN</StyledTableCell>
            <StyledTableCell align="right">Business Name</StyledTableCell>
               <StyledTableCell align="right">Account Status</StyledTableCell>
                  <StyledTableCell align="right">Change Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">      
              <Button>Change</Button></StyledTableCell>
        
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    
  )
}

export default SellersTable
