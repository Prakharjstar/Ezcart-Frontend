import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import {
  sendSellerOtp,
  sellerLoginEmail, // ✅ new thunk for email+password
  sellerLoginOtp,
  fetchSellerProfile,
} from "../../../State/seller/SellerAuthSlice";
import { useNavigate } from "react-router-dom";

const SellerLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { sellerAuth } = useAppSelector((store) => store);
  const [useOtp, setUseOtp] = useState(false); // toggle between OTP & password login

  const formik = useFormik({
    initialValues: { email: "", password: "", otp: "" },
    onSubmit: async (values) => {
      try {
        if (useOtp) {
          // OTP login
          const res: any = await dispatch(
            sellerLoginOtp({ email: values.email, otp: values.otp })
          ).unwrap();
          console.log("SELLER LOGIN OTP RESPONSE", res);
        } else {
          // Email + password login
          const res: any = await dispatch(
            sellerLoginEmail({ email: values.email, password: values.password })
          ).unwrap();
          console.log("SELLER LOGIN EMAIL RESPONSE", res);
        }

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          await dispatch(fetchSellerProfile()).unwrap();
          navigate("/seller/dashboard");
        }
      } catch (error: any) {
        console.log("Seller Login Error", error);
        alert(error?.message || "Login Failed");
      }
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email) {
      alert("Please enter email first");
      return;
    }
    dispatch(sendSellerOtp(formik.values.email));
    setUseOtp(true);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Seller Login
      </h1>

      <div className="space-y-5">
        {/* EMAIL FIELD */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {/* PASSWORD FIELD */}
        {!useOtp && (
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        )}

        {/* OTP FIELD */}
        {useOtp && sellerAuth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm text-primary-color">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
            />
          </div>
        )}

        {/* BUTTON */}
        {useOtp ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {sellerAuth.loading ? <CircularProgress size={24} /> : "Login as Seller"}
          </Button>
        ) : (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {sellerAuth.loading ? <CircularProgress size={24} /> : "Login as Seller"}
          </Button>
        )}

        {/* TOGGLE LINK */}
        <p className="text-center text-sm text-gray-500 mt-2">
          {useOtp ? (
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setUseOtp(false)}
            >
              Login with password instead
            </span>
          ) : (
            <span
              className="cursor-pointer text-blue-600"
              onClick={handleSendOtp}
            >
              Login with OTP
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SellerLoginForm;