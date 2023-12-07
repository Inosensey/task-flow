import React from 'react'

type props = {
    headerName: string
}

const Header = ({headerName}:props) => {
  return (
    <div className='flex items-center w-full h-14 px-2 '>
        <p className='select-none font-semibold text-lg text-LightSecondary'>{headerName}</p>
    </div>
  )
}

export default Header