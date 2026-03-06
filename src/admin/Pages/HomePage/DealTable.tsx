import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Icon, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/store';
import { useEffect, useState } from 'react';
import React from 'react';
import { getAllDeals, updateDeal } from '../../../State/admin/dealSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
  '&:hover': {
    backgroundColor: '#eef2ff',
    cursor: 'pointer',
  }
}));

export default function DealTable() {

  const dispatch = useAppDispatch();
  const { deal } = useAppSelector(store => store);

  const [open, setOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  const handleEdit = (item: any) => {
    setSelectedDeal(item);
    setDiscount(item.discount);
    setOpen(true);
  };

 const handleUpdate = () => {

  dispatch(updateDeal({
    id: selectedDeal.id,
    data: {
      ...selectedDeal,
      discount: discount
    }
  }));

  setOpen(false);
};

  return (
    <>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {deal.deals.map((item: any, index: number) => (

            <StyledTableRow key={item.id}>
              
              <StyledTableCell>
                {index + 1}
              </StyledTableCell>

              <StyledTableCell>
                <img className='w-20 rounded-md' src={item.category.image} />
              </StyledTableCell>

              <StyledTableCell>
                {item.category.categoryId}
              </StyledTableCell>

              <StyledTableCell align="right">
                {item.discount}
              </StyledTableCell>

              <StyledTableCell align="right">
                <Button onClick={() => handleEdit(item)}>
                  <Edit />
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Icon>
                  <Delete sx={{ color: "red" }} />
                </Icon>
              </StyledTableCell>

            </StyledTableRow>

          ))}

        </TableBody>
      </Table>
    </TableContainer>


{/* UPDATE DEAL DIALOG */}

<Dialog open={open} onClose={()=>setOpen(false)}>

<DialogTitle>Update Deal</DialogTitle>

<DialogContent>

<TextField
label="Discount"
fullWidth
value={discount}
onChange={(e)=>setDiscount(e.target.value)}
/>

</DialogContent>

<DialogActions>

<Button onClick={()=>setOpen(false)}>Cancel</Button>

<Button variant="contained" onClick={handleUpdate}>
Update
</Button>

</DialogActions>

</Dialog>

</>
  );
}