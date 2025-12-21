import { Label } from '@mui/icons-material';
import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'



const steps = [
 "Tax Details & Mobile",
 "Pickup Address",
 "Bank Details",
 "Supplier Details",
];


const SellerAccountForm =()=> {

  const [activeStep , setActiveStep] = useState(1)

const handleStep = (value:number)=>()=>{
  setActiveStep(activeStep + value)

}

  return (
    <div>
      <Stepper activeStep ={activeStep} alternativeLabel >

        {steps.map((label, index)=> (

          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>



        ))}

      </Stepper>

      <section>
        <div className='flex items-center justify-between'>
          <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep==0}>
            Back

          </Button>

           <Button onClick={handleStep(1)} variant='contained'> {activeStep==(steps.length-1)?"Create Account":"Continue"}
         

          </Button>

        </div>
      </section>
      
    </div>
  )
}

export default SellerAccountForm
