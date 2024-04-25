"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// libs
import { getTodoLists } from "@/lib/todolistMethods";
import { getFrequencies, getPriorityLevel } from "@/lib/todolistMethods";

// types
import TodoListForm from "./TodoListForm";
import { ReturnInterface } from "@/Types/generalTypes";
import { todoListDetails } from "@/Types/todoListTypes";
import { CheckBoxInput } from "@/components/ReusableComponents/inputs/Input";

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
  const todoLists = todoListsData.Response;

  useQuery({
    queryKey: ["priorityLevel"],
    queryFn: () => getPriorityLevel(),
  });
  useQuery({
    queryKey: ["frequencies"],
    queryFn: () => getFrequencies(),
  });

  //States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);
  const [selectedTodoListStatus, setSelectedTodoListStatus] =
    useState<string>("");
  const [todoListStatuses] = useState<Array<string>>([
    "All",
    "Completed",
    "Active",
  ]);

  const handleCheckboxOnchange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSelectedTodoListStatus(value);
  };

  return (
    <>
      <div className="flex-1">
        <div className="text-LightSecondary py-4 px-2 border-b-2 border-LightPrimary flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormAction("Add");
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
        <div className="flex mt-5 gap-8 items-center justify-center">
          {todoListStatuses.map((status: string) => (
            <CheckBoxInput
              key={status}
              label={status}
              selected={selectedTodoListStatus}
              setSelected={setSelectedTodoListStatus}
              name="todo-list-status"
              onChange={handleCheckboxOnchange}
            />
          ))}
        </div>
        <div className="w-10/12 mx-auto mt-8">
          <p className="bg-Urgent px-2 w-max">Urgent</p>
          <div>
            {todoLists.map((details: todoListDetails) => (
              <div
                className="border-l-2 border-l-Urgent flex justify-between items-center p-2"
                key={details.id}
              >
                <div className="h-[3.3rem] line-clamp-3">
                  <p className="phone:text-sm underline cursor-pointer">
                    {details.title}
                  </p>
                  <p className="phone:text-xs">
                    {details.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="cursor-pointer w-4">
                    <FontAwesomeIcon
                      className="text-xl text-Success"
                      icon={faCircleCheck}
                    />
                  </span>
                  <span className="cursor-pointer w-4">
                    <FontAwesomeIcon
                      className="text-xl text-Error"
                      icon={faCircleXmark}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm
            setShowTodoListForm={setShowTodoListForm}
            action={formAction}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoLists;
