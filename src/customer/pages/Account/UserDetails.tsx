import React from 'react'
import ProfileFieldCard from '../../../component/ProfileFieldCard'
import { Divider } from '@mui/material'

function UserDetails() {
  return (
    <div className='flex justify-center py-10'>
        <div className='w-full  lg:w-[70%]' >
            <div className='flex items-center pb-3 justify-between'>
                <h1 className='text-2xl font-bold text-gray-600'>Persional Details</h1>
            </div>

            <div className=''>
                 <ProfileFieldCard keys='Name' value={'Prakhar'}/> 
                 <Divider/>
                 
                <ProfileFieldCard keys='Email' value={"prakharjoshi960@gmail.com"}/> 
                <Divider/>

                <ProfileFieldCard keys='Mobile' value={"8746374628"}/> 

            </div>
        </div>
      
    </div>
  )
}

export default UserDetails
