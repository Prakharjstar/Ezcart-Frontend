import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

import { Edit } from "@mui/icons-material";
import { HomeCategory } from "../../../types/HomeCategoryTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9fafb"
  },
  "&:hover": {
    backgroundColor: "#eef2ff"
  }
}));

interface Props {
  data: HomeCategory[];
}

export default function HomeCategoryTable({ data }: Props) {

  const [categories, setCategories] = useState<HomeCategory[]>(data);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);

  const handleEditClick = (category: HomeCategory) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleChange = (field: keyof HomeCategory, value: string) => {
    if (!selectedCategory) return;

    setSelectedCategory({
      ...selectedCategory,
      [field]: value
    });
  };

  // UPDATE CATEGORY
  const handleSave = async () => {

    if (!selectedCategory) return;

    try {

      const res = await axios.patch(
        `http://localhost:5454/home-category/${selectedCategory.id}`,
        selectedCategory
      );

      // update table instantly
      const updatedData = categories.map((cat) =>
        cat.id === selectedCategory.id ? res.data : cat
      );

      setCategories(updatedData);

      alert("Category Updated Successfully");

      handleClose();

    } catch (error) {
      console.error("Update failed", error);
    }

  };

  return (
    <>
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

            {categories?.map((category, index) => (

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

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEditClick(category)}
                  >
                    <Edit />
                  </Button>

                </StyledTableCell>

              </StyledTableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>

      {/* EDIT DIALOG */}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>

        <DialogTitle>Edit Home Category</DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="Category Id"
            fullWidth
            value={selectedCategory?.categoryId || ""}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          />

          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={selectedCategory?.image || ""}
            onChange={(e) => handleChange("image", e.target.value)}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>

        </DialogActions>

      </Dialog>
    </>
  );
}