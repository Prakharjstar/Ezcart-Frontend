import { TextField } from '@mui/material';
import React from 'react'
interface BecomeSellerFormStep2Props{
    formik : any;
}

const BecomeSellerFormStep4 =({formik}:BecomeSellerFormStep2Props)=> {
  return (
   <div className='space-y-5'>
   
           <TextField
           fullWidth
           name="businessDetails.businessName"
           label="Business Name"
           value={formik.values.businessDetails.businessName}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
           helperText={formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName} 
           />
   
             <TextField
           fullWidth
           name="bankDetails.ifscCode"
           label="IFSC Code"
           value={formik.values.bankDetails.ifscCode}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
           helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode} 
           />
   
            <TextField
           fullWidth
           name="sellerName"
           label="Seller Name"
           value={formik.values.businessDetails.sellerName}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.businessDetails?.sellerName && Boolean(formik.errors.businessDetails?.sellerName)}
           helperText={formik.touched.businessDetails?.sellerName && formik.errors.businessDetails?.sellerName} 
           />


            <TextField
           fullWidth
           name="email"
           label="Email"
           value={formik.values.businessDetails.email}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.businessDetails?.email && Boolean(formik.errors.businessDetails?.email)}
           helperText={formik.touched.businessDetails?.email && formik.errors.businessDetails?.email} 
           />

            <TextField
           fullWidth
           name="password"
           label="Password"
           value={formik.values.businessDetails.password}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.businessDetails?.password && Boolean(formik.errors.businessDetails?.password)}
           helperText={formik.touched.businessDetails?.password && formik.errors.businessDetails?.password} 
           />
         
       </div>
  )
}

export default BecomeSellerFormStep4
