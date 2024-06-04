import Link from 'next/link'
import React from 'react'

function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>

      <Link href="/dashboard"><h2 className='welcome-button'>ENTER THE WEBSITE</h2></Link>
    </>

  )
}

export default LandingPage