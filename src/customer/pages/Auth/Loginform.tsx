import React from "react";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { sendLoginSignupOtp, Signin, logout } from "../../../State/AuthSlice";

const SellerLoginForm: React.FC = () => {

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: (values) => dispatch(Signin(values)),
  });

  const handleSendOtp = () =>
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));

  const handleLogout = () => {
    dispatch(logout());
    formik.resetForm();
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Seller Login
      </h1>

      <div className="space-y-5">

        {/* Logged-in view */}
        {auth.isLoggedIn && auth.user ? (
          <div className="text-center space-y-3">
            <p className="font-medium text-lg text-primary-color">
              Welcome, {auth.user.fullName || auth.user.email}!
            </p>

            <Button
              onClick={handleLogout}
              fullWidth
              variant="outlined"
              sx={{ py: "11px" }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            {/* Email Field */}
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {/* OTP Field */}
            {auth.otpSent && (
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

            {/* Buttons */}
            {auth.otpSent ? (
              <Button
                onClick={() => formik.handleSubmit()}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={handleSendOtp}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                {auth.loading ? <CircularProgress size={24} /> : "Send OTP"}
              </Button>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default SellerLoginForm;