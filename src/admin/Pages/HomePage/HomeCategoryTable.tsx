import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { HomeCategory } from "../../../types/HomeCategoryTypes";

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

interface Props {
  data: HomeCategory[];
}

export default function HomeCategoryTable({ data }: Props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>

        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {data?.map((category, index) => (

            <StyledTableRow key={category.id}>

              <StyledTableCell>
                {index + 1}
              </StyledTableCell>

              <StyledTableCell>
                {category.id}
              </StyledTableCell>

              <StyledTableCell>

                <img
                  src={category.image}
                  alt="category"
                  className="w-20 h-20 object-cover rounded-md"
                />

              </StyledTableCell>

              <StyledTableCell>
                {category.categoryId}
              </StyledTableCell>

              <StyledTableCell>

                <Button variant="contained" size="small">
                  <Edit />
                </Button>

              </StyledTableCell>

            </StyledTableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}