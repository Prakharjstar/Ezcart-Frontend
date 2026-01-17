import React from "react";
import { Button, TextField, Card, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
<Card className="p-10 w-[380px] min-h-[520px] space-y-8 flex flex-col items-center justify-center -mt-20">


      
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
          sx={{ width: 80, height: 80 }}
        />

        <h1 className="text-2xl font-semibold text-center text-[#009278] cursor-pointer">
          Login to Ezcart
        </h1>

        <TextField
          fullWidth
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#009278",
            paddingY: "10px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#007f6d" }
          }}
        >
          Send OTP
        </Button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-[#009278] cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Create Account
          </span>
        </p>

      </Card>
    </div>
  );
};

export default Auth;
