"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { CheckBoxInput } from "@/components/ReusableComponents/inputs/Input";
import PriorityBasedTodoList from "./PriorityBasedTodoList";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// libs
import { getTodoLists } from "@/lib/todolistMethods";

// Utils
import { getCurrentDate } from "@/utils/useDate";

// types
import TodoListForm from "./TodoListForm";
import { ReturnInterface } from "@/Types/generalTypes";
import { todoListDetails } from "@/Types/todoListTypes";

interface todoListResponseInterface {
  unsortedTodoList: todoListDetails[];
  sortedTodoList: sortedTodoListInterface;
}
type sortedTodoListType = {
  todoList: todoListDetails[];
  color: string;
};
interface sortedTodoListInterface {
  Urgent: sortedTodoListType;
  HighPriority: sortedTodoListType;
  MedPriority: sortedTodoListType;
  LowPriority: sortedTodoListType;
}

interface props {
  TodoLists: ReturnInterface<todoListResponseInterface>;
}

const TodoLists = ({ TodoLists }: props) => {
  const formattedDate = getCurrentDate();

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
  const unSortedTodoList = todoListsData.Response
    .unsortedTodoList as todoListDetails[];
  const sortedTodoList = todoListsData.Response
    .sortedTodoList as sortedTodoListInterface;

  //States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);
  const [selectedTodoListStatus, setSelectedTodoListStatus] =
    useState<string>("All");
  const [todoListStatuses] = useState<Array<string>>([
    "All",
    "Completed",
    "Active",
  ]);

  
  const toggleFilter = (value: string) => {
    console.log(sortedTodoList);
    setSelectedTodoListStatus(value);
  };

  const handleCheckBoxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedTodoListStatus(value);
  }

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
              customFunc={toggleFilter}
              onChange={handleCheckBoxOnChange}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <PriorityBasedTodoList
            priority={"Urgent"}
            color={sortedTodoList.Urgent.color}
            todoLists={sortedTodoList.Urgent.todoList}
            selectedStatus={selectedTodoListStatus}
          />
          <PriorityBasedTodoList
            priority={"High Priority"}
            color={sortedTodoList.HighPriority.color}
            todoLists={sortedTodoList.HighPriority.todoList}
            selectedStatus={selectedTodoListStatus}
          />
          <PriorityBasedTodoList
            priority={"Medium Priority"}
            color={sortedTodoList.MedPriority.color}
            todoLists={sortedTodoList.MedPriority.todoList}
            selectedStatus={selectedTodoListStatus}
          />
          <PriorityBasedTodoList
            priority={"Low Priority"}
            color={sortedTodoList.LowPriority.color}
            todoLists={sortedTodoList.LowPriority.todoList}
            selectedStatus={selectedTodoListStatus}
          />
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
