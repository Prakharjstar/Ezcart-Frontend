import React from "react";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { useFormik } from "formik";
import { sendLoginSignupOtp, Signup } from "../../../State/AuthSlice";
import { Button, TextField, CircularProgress } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
   onSubmit: async (values) => {
  const resultAction = await dispatch(Signup(values));

  if (Signup.fulfilled.match(resultAction)) {
    alert("Registration successful! Please login.");

    formik.resetForm();

    // Redirect to login page
    window.location.href = "/login";
  } else {
    alert(resultAction.payload || "Signup failed");
  }
},
  });

  const handleSendOtp = () => {
    if (!formik.values.email) return alert("Please enter your email");
    // Send OTP with only email
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Signup
      </h1>

      <div className="space-y-3">
        {/* Email input */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* OTP + Full Name inputs show only after OTP is sent */}
        {auth.otpSent && (
          <div className="space-y-3">
            <p className="font-medium text-sm text-primary-color">
              Enter OTP sent to your email
            </p>

            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />

            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}

        {/* Buttons */}
        {!auth.otpSent ? (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.loading ? <CircularProgress size={24} /> : "Send OTP"}
          </Button>
        ) : (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.loading ? <CircularProgress size={24} /> : "Signup"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;