import { Radio } from '@mui/material'
import React from 'react'

function AddressCard() {
    const handleChange=(event:any)=>{
        console.log(event.target.checked)
    }
  return (
    <div className='p-5 border rounded-md flex'>
      <div>
        <Radio  
        checked={true}
        onChange={handleChange}
        value=""
        name="radio-button"
        />
      </div>

      <div className='space-y-3 pt-3'>
        <h1>Prakhar</h1>
        <p className='w-[320px]'>Vaishali Colony , Kashipur, Uttarakhand - 530067</p>

        <p>
            <strong>Mobile :</strong> 9536830242
        </p>

      </div>
    </div>
  )
}

export default AddressCard

