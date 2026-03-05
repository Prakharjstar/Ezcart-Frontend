import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import {
  sendLoginSignupOtp,
  Signin,
  SigninWithGoogle,
  logout,
} from "../../../State/AuthSlice";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Loginform: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Formik for email + OTP login
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

  // Google login handler
  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    setGoogleLoading(true);

    const idToken = credentialResponse.credential; // JWT from Google
    if (!idToken) {
      alert("Google login failed: no credential returned");
      setGoogleLoading(false);
      return;
    }

    // Dispatch to Redux with correct property
    dispatch(SigninWithGoogle({ accessToken: idToken }));
    setGoogleLoading(false);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
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

            {/* OTP input */}
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
                  onBlur={formik.handleBlur}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                />
              </div>
            )}

            {/* OTP / Login Button */}
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

            {/* Google Sign-In Button */}
            <div className="mt-2">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  alert("Google Login Failed");
                  setGoogleLoading(false);
                }}
                useOneTap
              />
            </div>

            {/* Optional loading indicator for Google */}
            {googleLoading && (
              <div className="flex justify-center mt-2">
                <CircularProgress size={24} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Loginform;