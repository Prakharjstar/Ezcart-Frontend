import React from 'react'

import { Avatar, Box, Divider } from '@mui/material';

const Profile = () => {
 
     return (
    <Box className="bg-white p-6 rounded-lg shadow-md max-w-4xl">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Seller Account
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT : PROFILE IMAGE */}
        <div className="flex flex-col items-center gap-3">
          <Avatar
            src='https://th.bing.com/th/id/OIP.LLQPg_tu53I3Od8kXM5cFgHaNN?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
            sx={{ width: 120, height: 120 }}
          />
          <p className="text-sm text-gray-500">
            Seller Profile
          </p>
        </div>

        {/* RIGHT : DETAILS */}
        <div className="flex-1 space-y-4">

          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-800">
              Prakhar joshi
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg text-gray-800">
             prakharjoshi960@Gmail.com
            </p>
          </div>

          <Divider />

          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="text-lg text-gray-800">
              +91 98765 43210
            </p>
          </div>

        </div>

      </div>
    </Box>
  );
};

  


export default Profile
