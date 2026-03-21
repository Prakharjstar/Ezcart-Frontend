import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// ✅ UPDATED TYPE (MATCH BACKEND)
interface CouponType {
  id: number;
  code: string;
  discountPercentage: number;
  minimumOrderValue: number;
  validityEndDate: string;
  isActive: boolean;
}

// ✅ Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
}));

const Coupon: React.FC = () => {

  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchCoupons = async (): Promise<void> => {
  try {
    const jwt = localStorage.getItem("jwt"); // ✅ get token

    const res = await fetch("http://localhost:5454/api/coupons/admin/all", {
      headers: {
        "Authorization": `Bearer ${jwt}`, // ✅ IMPORTANT
      }
    });

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("API DATA 👉", data);

    setCoupons(data);

  } catch (err) {
    console.error("Error fetching coupons", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ✅ DELETE (FIXED URL)
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fetch(`http://localhost:5454/api/coupons/admin/delete/${id}`, {
        method: "DELETE",
      });
      fetchCoupons();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ LOADING UI
  if (loading) {
    return <p>Loading coupons...</p>;
  }

  // ✅ EMPTY UI
  if (coupons.length === 0) {
    return <p>No coupons found 🚫</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>

        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell>Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Minimum Order</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coupons.map((coupon) => (
            <StyledTableRow key={coupon.id}>

              <StyledTableCell>
                {coupon.code}
              </StyledTableCell>

              <StyledTableCell>
                {coupon.validityEndDate
                  ? new Date(coupon.validityEndDate).toLocaleDateString()
                  : "N/A"}
              </StyledTableCell>

              <StyledTableCell align="right">
                ₹{coupon.minimumOrderValue}
              </StyledTableCell>

              <StyledTableCell align="right">
                {coupon.discountPercentage}%
              </StyledTableCell>

              <StyledTableCell align="right">
                <span style={{
                  color: coupon.isActive ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {coupon.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Button onClick={() => handleDelete(coupon.id)}>
                  <Delete />
                </Button>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default Coupon;