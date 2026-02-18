import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { SellerLogin } from "../../../State/seller/SellerAuthSlice";
import { useNavigate } from "react-router-dom";

const SellerLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state);

  // Local state to show errors
  const [loginError, setLoginError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      setLoginError(null); // reset error
      if (!values.otp) {
        setLoginError("Please enter OTP.");
        return;
      }
      try {
        const res = await dispatch(SellerLogin(values)).unwrap();
        console.log("LOGIN SUCCESS", res);
        navigate("/seller/dashboard");
      } catch (err: any) {
        console.log("LOGIN FAILED", err);

        // Extract readable message from backend
        let message = "Login failed";
        if (err?.response?.data?.message) {
          message = err.response.data.message;
        } else if (err.message) {
          message = err.message;
        } else if (typeof err === "string") {
          message = err;
        } else if (err.status && err.error) {
          message = `${err.status} ${err.error}: ${err.message || "Access Denied"}`;
        } else {
          message = JSON.stringify(err);
        }

        setLoginError(message);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.email) {
      setLoginError("Enter your email first");
      return;
    }

    setLoginError(null); // reset error
    try {
      await dispatch(sendLoginSignupOtp({ email: formik.values.email })).unwrap();
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (err: any) {
      console.log("OTP SEND FAILED", err);
      let message = "Failed to send OTP";
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setLoginError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-center text-2xl text-primary-color font-bold mb-5">
        Login as Seller
      </h1>

      {loginError && (
        <p className="text-red-600 mb-2 font-medium">{loginError}</p>
      )}

      <div className="space-y-4">
        {/* Email */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {/* Send OTP Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSendOtp}
          disabled={auth.loading}
        >
          {auth.loading ? <CircularProgress size={24} /> : "Send OTP"}
        </Button>

        {/* OTP Field */}
        {otpSent && (
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

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={formik.handleSubmit as any}
          disabled={!formik.values.otp}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SellerLoginForm;