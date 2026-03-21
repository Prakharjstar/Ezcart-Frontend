import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'

// ✅ CORRECT IMPORTS (MUI v5)
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponform: React.FC = () => {

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0
    },

    // ✅ Validation
    validate: (values) => {
      const errors: Partial<Record<keyof CouponFormValues, string>> = {};

      if (!values.code) errors.code = "Required";
      if (values.discountPercentage <= 0) errors.discountPercentage = "Enter valid discount";
      if (!values.validityEndDate) errors.validityEndDate = "Required";
      if (values.minimumOrderValue <= 0) errors.minimumOrderValue = "Enter valid amount";

      return errors;
    },

    //  Submit
    onSubmit: async (values, { resetForm }) => {

      const payload = {
  code: values.code,
  discountPercentage: values.discountPercentage,         
  minimumOrderValue: values.minimumOrderValue,           
  validityStartDate: values.validityStartDate?.format("YYYY-MM-DD"), 
  validityEndDate: values.validityEndDate?.format("YYYY-MM-DD"),     
  isActive: true
};

      const jwt = localStorage.getItem("jwt"); 

      try {
        const res = await fetch("http://localhost:5454/api/coupons/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${jwt}`,
          },
          body: JSON.stringify(payload),
        });

        await res.json();

        alert("Coupon Created Successfully ");
        resetForm();

      } catch (err) {
        console.error("Error creating coupon", err);
        alert("Failed to create coupon ");
      }
    },
  });

  return (
    <div>

      <h1 className='text-2xl font-bold text-primary-color text-center pb-5'>
        Create New Coupon
      </h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

          <Grid container spacing={2}>

            {/* Coupon Code */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            {/* Discount */}
            <Grid  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                name="discountPercentage"
                label="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
              />
            </Grid>

            {/* Start Date */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                onChange={(value) => formik.setFieldValue("validityStartDate", value)}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </Grid>

            {/* End Date */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="Validity End Date"
                value={formik.values.validityEndDate}
                onChange={(value) => formik.setFieldValue("validityEndDate", value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.validityEndDate && Boolean(formik.errors.validityEndDate),
                    helperText: formik.touched.validityEndDate && formik.errors.validityEndDate
                  }
                }}
              />
            </Grid>

            {/* Minimum Order */}
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                type="number"
                name="minimumOrderValue"
                label="Minimum Order Value"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
              />
            </Grid>

            {/* Submit */}
            <Grid size={{xs:12}}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: ".8rem" }}
              >
                Create Coupon
              </Button>
            </Grid>

          </Grid>

        </Box>

      </LocalizationProvider>

    </div>
  )
}

export default AddNewCouponform;