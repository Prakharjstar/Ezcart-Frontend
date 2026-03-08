import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">
        Contact Details
      </p>

      <div className="space-y-9">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          name="gstin"
          label="GSTIN"
          value={formik.values.gstin}
          onChange={formik.handleChange}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;