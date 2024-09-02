"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

const DisplayError = () => {
    const pathname = usePathname()
    const params = new URLSearchParams(window.location.hash.slice())

    const errorCode = params.get('#error')
    const errorDesc = params.get('error_description')
  return (
    <div>
      <p>Error: {errorCode}</p>
      <p>Error Description: {errorDesc}</p>
    </div>
  )
}

export default DisplayError