import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { createDeal } from "../../../State/admin/dealSlice";

const CreateDealForm = () => {

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      discount: "",
      category: ""
    },

    onSubmit: (values) => {
      console.log("submit ", values);

      const reqData = {
        discount: Number(values.discount),
        category: {
          id: values.category
        }
      };

      dispatch(createDeal(reqData));
    }
  });

  return (
    <div>
      <Box component="form" onSubmit={formik.handleSubmit} className="space-y-6">

        <Typography variant="h4" className="text-center">
          Create Deal
        </Typography>

        {/* Discount Field */}
        <TextField
          fullWidth
          name="discount"
          label="Discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
        />

        {/* Category Select */}
        <FormControl fullWidth>

          <InputLabel>Category</InputLabel>

          <Select
            name="category"
            value={formik.values.category}
            label="Category"
            onChange={formik.handleChange}
          >

            {customer.homePageData?.dealCategories?.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}

          </Select>

        </FormControl>

        {/* Submit Button */}
        <Button
          fullWidth
          sx={{ py: ".9rem" }}
          type="submit"
          variant="contained"
        >
          Create Deal
        </Button>

      </Box>
    </div>
  );
};

export default CreateDealForm;