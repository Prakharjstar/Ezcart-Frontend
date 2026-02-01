import React, { useState } from "react";
import { Button, TextField, Card, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loginform from "./Loginform";
import Registerform from "./Registerform";

const Auth = () => {
 const [isLogin , setIsLogin] =useState(true);

 return(
  <div className="flex justify-center h -[90vh] items-center">
    <div className="max-w-md h-[85] rounded-md shadow-lg">
      <img src= "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="" />

     <div className="mt-8 px-10">
       {isLogin ? <Loginform/> : <Registerform/>}

      <div className="flex items-center gap-1 justify-center mt-5">
        <p>{isLogin && "Don't"} have Account </p>
        <Button size="small" onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Create Account" : "login"}</Button>

      </div>
     </div>
    </div>

  </div>
 )
  
}
export default Auth;

