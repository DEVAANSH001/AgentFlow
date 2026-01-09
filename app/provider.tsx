"use client"
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import  {api }from '../convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserDetails } from '@/context/UserData';

function Provider({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { user } = useUser();
    const createUser = useMutation(api.user.CreateNewUser)
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const CreateAndGetUser = async () => {
      if (!user) {
        setUserDetails(null);
        return;
      }

      try {
        const result = await createUser({
          name: user.fullName ?? '',
          email: user.primaryEmailAddress?.emailAddress ?? '',
        });
        setUserDetails(result ?? user);
      } catch (e) {
        setUserDetails(user);
        console.error('Error creating or fetching user:', e);
      }
    };

    CreateAndGetUser();
  }, [user, createUser]);

//   console.log("User Details in Provider:", userDetails);
  return (
    <UserDetails.Provider value={{ userDetails, setUserDetails }}>
      <div>{children}</div>
    </UserDetails.Provider>
  )
}

export default Provider