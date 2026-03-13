import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../State/store";
import { fetchSellers, updateSellerStatus } from "../../../State/seller/sellerSlice";

const accountStatusList = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
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
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9fafb",
  },
  "&:hover": {
    backgroundColor: "#eef2ff",
  },
}));

const SellersTable = () => {

  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((state) => state.seller);

  const [accountStatus, setAccountStatus] = useState("PENDING_VERIFICATION");

  const handleFilterChange = (event:any) => {
    setAccountStatus(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchSellers(accountStatus));
  }, [dispatch, accountStatus]);

  const handleStatusChange = async (sellerId :any , newStatus:any) => {

    await dispatch(
      updateSellerStatus({
        id: sellerId,
        status: newStatus,
      })
    );

    dispatch(fetchSellers(accountStatus));
  };

  return (
    <>
      {/* FILTER DROPDOWN */}

      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel>Account Status</InputLabel>

          <Select
            value={accountStatus}
            label="Account Status"
            onChange={handleFilterChange}
          >
            {accountStatusList.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* TABLE */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>

          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {sellers?.map((seller) => (

              <StyledTableRow key={seller.id}>

                <StyledTableCell>
                  {seller.name}
                </StyledTableCell>

                <StyledTableCell>
                  {seller.email}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {seller.mobile}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {seller.gstin}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {seller.businessName}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {seller.accountStatus}
                </StyledTableCell>

                <StyledTableCell align="right">

                  <Select
                    size="small"
                    value={seller.accountStatus}
                    onChange={(e) =>
                      handleStatusChange(seller.id, e.target.value)
                    }
                  >

                    {accountStatusList.map((item) => (
                      <MenuItem key={item.status} value={item.status}>
                        {item.title}
                      </MenuItem>
                    ))}

                  </Select>

                </StyledTableCell>

              </StyledTableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
};

export default SellersTable;