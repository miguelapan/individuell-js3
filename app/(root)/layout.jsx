'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react';

function DashboardLayout({children}) {

    const { isLoaded, isSignedIn} = useAuth()


    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if(!isSignedIn) {
      return <div>Not signed in</div>
    }

  return (
    <div>{children}</div>
  )
}

export default DashboardLayout