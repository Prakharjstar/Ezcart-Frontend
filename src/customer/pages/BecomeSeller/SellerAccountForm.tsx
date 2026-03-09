import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";

import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      gstin: "",

      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },

      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },

      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
      },

      sellerName: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {

        const payload = {
          ...values,
          gstin: values.gstin.trim(),
        };

        console.log("SELLER REGISTER DATA", payload);

        const response = await axios.post(
          "http://localhost:5454/api/sellers/register",
          payload
        );

        console.log("SELLER REGISTER SUCCESS", response.data);

        alert("Seller registered successfully!");

      } catch (error) {
        console.error("SELLER REGISTER ERROR", error);
        alert("Registration failed");
      }
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">

        <div>
          {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
          {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
          {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
          {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
        </div>

        <div className="flex items-center justify-between">

          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1
              ? "Create Account"
              : "Continue"}
          </Button>

        </div>

      </section>

    </div>
  );
};

export default SellerAccountForm;