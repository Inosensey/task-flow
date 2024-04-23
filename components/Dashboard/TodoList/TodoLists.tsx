"use client"

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";


// types
import { TableRow } from '@/Types/database.types'
import TodoListForm from './TodoListForm';

interface props {
  TodoLists: TableRow<"TodoList">[]
}

const TodoLists = ({TodoLists}:props) => {
    //States
    const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);

  return (
    <>
    <div className='flex-1'>
        <div className="text-LightSecondary py-4 px-2 border-b-2 border-LightPrimary flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowTodoListForm((prev) => !prev);
            }}
            className="bg-LightPrimary px-2 py-[3px] rounded-md text-sm flex items-center gap-1"
            >
            Add TodoList
            <span className="w-4">
              <FontAwesomeIcon className="text-sm" icon={faCirclePlus} />
            </span>
          </motion.button>
        </div>
    </div>
    
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm
          setShowTodoListForm={setShowTodoListForm}
          />
        )}
      </AnimatePresence>
            </>
  )
}

export default TodoLists