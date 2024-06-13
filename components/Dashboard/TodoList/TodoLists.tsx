"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { CheckBoxInput } from "@/components/ReusableComponents/inputs/Input";
import PriorityBasedTodoList from "./PriorityBasedTodoList";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// Utils
import { getCurrentDate } from "@/utils/useDate";

// types
import TodoListForm from "./TodoListForm";
import {
  sortedTodoListInterface,
  todoListDetails,
} from "@/Types/todoListTypes";
import { getFrequencies, getPriorityLevels, getTodoList } from "@/lib/TanStackQueryFns";
import { TableRow } from "@/Types/database.types";

interface todoListsTypes {
  unsortedTodoList: todoListDetails[];
  sortedTodoList: sortedTodoListInterface;
}
interface props {
  TodoLists: todoListsTypes;
  frequencies: TableRow<"Frequencies">[] | []
  priorityLevels: TableRow<"PriorityLevel">[] | []
}

const TodoLists = ({ TodoLists, frequencies, priorityLevels }: props) => {
  const formattedDate = getCurrentDate();

  // Use query
  const { data: todoListsData } = useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoList,
    initialData: TodoLists,
  });
  useQuery({
    queryKey: ["frequencies"],
    queryFn: getFrequencies,
    initialData: frequencies,
  });
  useQuery({
    queryKey: ["priorityLevels"],
    queryFn: getPriorityLevels,
    initialData: priorityLevels,
  });

  const unSortedTodoList = todoListsData.unsortedTodoList as todoListDetails[];
  const sortedTodoList =
    todoListsData.sortedTodoList as sortedTodoListInterface;

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
    setSelectedTodoListStatus(value);
  };

  const handleCheckBoxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

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
            addTodoFn={() => {
              setFormAction("Add");
              setShowTodoListForm((prev) => !prev);
            }}
          />
          <PriorityBasedTodoList
            priority={"High Priority"}
            color={sortedTodoList.HighPriority.color}
            todoLists={sortedTodoList.HighPriority.todoList}
            selectedStatus={selectedTodoListStatus}
            addTodoFn={() => {
              setFormAction("Add");
              setShowTodoListForm((prev) => !prev);
            }}
          />
          <PriorityBasedTodoList
            priority={"Medium Priority"}
            color={sortedTodoList.MedPriority.color}
            todoLists={sortedTodoList.MedPriority.todoList}
            selectedStatus={selectedTodoListStatus}
            addTodoFn={() => {
              setFormAction("Add");
              setShowTodoListForm((prev) => !prev);
            }}
          />
          <PriorityBasedTodoList
            priority={"Low Priority"}
            color={sortedTodoList.LowPriority.color}
            todoLists={sortedTodoList.LowPriority.todoList}
            selectedStatus={selectedTodoListStatus}
            addTodoFn={() => {
              setFormAction("Add");
              setShowTodoListForm((prev) => !prev);
            }}
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
