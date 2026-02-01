import React from 'react'
import { useAppDispatch } from '../../../State/store'
import { useFormik } from 'formik'
import { sendLoginSignupOtp } from '../../../State/AuthSlice'
import { Button, TextField } from '@mui/material'

const Registerform = () => {

     const dispatch = useAppDispatch()
    
         const formik = useFormik({
            initialValues:{
              email:"",
              otp:"",
              fullName :"",
            },
            onSubmit:(values)=>{
              console.log("form data" , values)
             
            }
          })
    
          const handleSendOtp=()=>{
              dispatch(sendLoginSignupOtp({email:formik.values.email}))
          
            }
  return (
    <div>
      <h1 className='text-center font-bold text-xl text-primary-color pb-8'> Signup</h1>

       <div className='space-y-3'>

      

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


                   
       { true  && <div className='space-y-3'>
        <p className='font-medium text-sm text-primary-color'>Enter OTP sent to your email</p>

         <TextField
                   fullWidth
                   name="otp"
                   label="Otp"
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
        </div>}

       { false && <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{py:"11px"}}>Sent Otp</Button>} 

        <Button onClick={()=>formik.handleSubmit()} fullWidth variant='contained' sx={{py:"11px"}}>Login</Button>

      </div>

      
      
    </div>
  )
}

export default Registerform
