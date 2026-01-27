import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
  return (
    <div>

    <div className='font-bold text-2xl mt-4 text-center flex justify-center'>Profile</div>
    <div className="p-5 flex justify-center">

    <UserProfile/>
    </div>
    </div>
  )
}

export default ProfilePage