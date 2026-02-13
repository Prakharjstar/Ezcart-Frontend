import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "../../../State/store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { SellerLogin } from "../../../State/seller/SellerAuthSlice";
import { useNavigate } from "react-router-dom";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();   

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: async (values) => {
      try {
        console.log("form data", values);

        
        const res = await dispatch(SellerLogin(values)).unwrap();

        console.log("LOGIN SUCCESS", res);

        
        navigate("/seller/dashboard");

      } catch (err) {
        console.log("LOGIN FAILED", err);
      }
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <div className="space-y-5">
        <h1 className="text-center text-2xl text-primary-color font-bold">
          Login as Seller
        </h1>

        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {/* OTP FIELD */}
        <div className="space-y-2">
          <p className="font-medium text-sm text-primary-color">
            Enter OTP sent to your email
          </p>

          <TextField
            fullWidth
            name="otp"
            label="Otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
          />
        </div>

        <Button onClick={handleSendOtp} fullWidth variant="contained">
          Send OTP
        </Button>

        <Button onClick={formik.handleSubmit as any} fullWidth variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
};

export default SellerLoginForm;