import { TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <div className="space-y-6">
      <TextField
        fullWidth
        name="sellerName"
        label="Seller Name"
        value={formik.values.sellerName}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        name="password"
        type="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        name="businessDetails.businessName"
        label="Business Name"
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        name="businessDetails.businessEmail"
        label="Business Email"
        value={formik.values.businessDetails.businessEmail}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        name="businessDetails.businessMobile"
        label="Business Mobile"
        value={formik.values.businessDetails.businessMobile}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default BecomeSellerFormStep4;