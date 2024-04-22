"use server"

import React from 'react'

// Components
import Header from '@/components/Dashboard/Header'

// Icones
import IonTodayOutline from '@/Icones/IonTodayOutline'

// types
import { TableRow } from '@/Types/database.types'

// Libs
import { getTodoLists } from '@/lib/todolistMethods'

const Page = async () => {
  const todoLists: TableRow<"TodoList">[] = await getTodoLists();
  console.log(todoLists)

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