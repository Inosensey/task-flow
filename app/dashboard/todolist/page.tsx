import React from 'react'

// Components
import Header from '@/components/Dashboard/Header'

// Icones
import IonTodayOutline from '@/Icones/IonTodayOutline'

const Page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header
          headerName="Todo-List"
          Icon={IonTodayOutline}
        />
      </div>
    </div>
  )
}

export default Page