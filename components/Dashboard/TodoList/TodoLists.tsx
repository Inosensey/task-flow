"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// libs
import { getTodoLists } from "@/lib/todolistMethods";
import { getFrequencies, getPriorityLevel } from "@/lib/todolistMethods";

// types
import TodoListForm from "./TodoListForm";
import { ReturnInterface } from "@/Types/generalTypes";
import { todoListDetails } from "@/Types/todoListTypes";

interface props {
  TodoLists: ReturnInterface<todoListDetails[]>;
}

const TodoLists = ({ TodoLists }: props) => {
  // Use query
  const {
    data: todoListsData,
    error: todoListsError,
    isFetched: todoListsIsFetched,
  } = useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoLists,
    initialData: TodoLists,
  });
  const todoLists = todoListsData.Response

  useQuery({
    queryKey: ["priorityLevel"],
    queryFn: () => getPriorityLevel(),
  });
  useQuery({
    queryKey: ["frequencies"],
    queryFn: () => getFrequencies()
  })

  //States
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);

  return (
    <>
      <div className="flex-1">
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
        <div>
          {todoLists.map((details: todoListDetails) => (
            <div key={details.id}>
              <p>{details.title}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm setShowTodoListForm={setShowTodoListForm} />
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoLists;
