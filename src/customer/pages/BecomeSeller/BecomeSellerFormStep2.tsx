import { Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="pickupAddress.name"
          label="Name"
          value={formik.values.pickupAddress.name}
          onChange={formik.handleChange}
        />
      </Grid>

     <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.mobile"
          label="Mobile"
          value={formik.values.pickupAddress.mobile}
          onChange={formik.handleChange}
        />
      </Grid>

    <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.pincode"
          label="Pincode"
          value={formik.values.pickupAddress.pincode}
          onChange={formik.handleChange}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="pickupAddress.address"
          label="Address"
          value={formik.values.pickupAddress.address}
          onChange={formik.handleChange}
        />
      </Grid>

    <Grid size={{ xs: 12}}>
        <TextField
          fullWidth
          name="pickupAddress.locality"
          label="Locality"
          value={formik.values.pickupAddress.locality}
          onChange={formik.handleChange}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.city"
          label="City"
          value={formik.values.pickupAddress.city}
          onChange={formik.handleChange}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.state"
          label="State"
          value={formik.values.pickupAddress.state}
          onChange={formik.handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default BecomeSellerFormStep2;