"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Components
import TodoListForm from "./TodoListForm";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

// Types
import { todoListDetails } from "@/Types/todoListTypes";
interface props {
  priority: string;
  color: string;
  todoLists: todoListDetails[];
  selectedStatus: string;
}

const PriorityBasedTodoList = ({
  priority,
  color,
  todoLists,
  selectedStatus,
}: props) => {
  // States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);
  const [selectedTodoList, setSelectedTodoList] = useState<todoListDetails | undefined>(undefined)

  if (todoLists.length === 0) return;
  return (
    <>
      <div className="phone:w-11/12 mx-auto">
        <p style={{ background: `${color}` }} className="px-2 w-max">
          {priority}
        </p>
        <div>
          {todoLists.map((details: todoListDetails) => (
            <div
              style={{ borderLeft: `2px solid ${details.PriorityLevel.color}` }}
              className={`flex justify-between items-center p-2`}
              key={details.id}
            >
              <div
                onClick={() => {
                  setSelectedTodoList(details)
                  setFormAction("Edit");
                  setShowTodoListForm((prev) => !prev);
                }}
                className="max-h-[3.3rem] line-clamp-2"
              >
                <div className="flex gap-1">
                  <p className="phone:text-sm underline cursor-pointer">
                    {details.title}
                  </p>
                  <p className="phone:text-sm text-LightPrimary">
                    {details.Frequencies.frequency}
                  </p>
                  <p
                    style={{
                      color:
                        details.TodoListStatus.id === 1 ? "#007FFF" : "#008000",
                    }}
                    className="phone:text-sm"
                  >
                    {details.TodoListStatus.status}
                  </p>
                </div>
                <p className="phone:text-xs">{details.description}</p>
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm
            setShowTodoListForm={setShowTodoListForm}
            action={formAction}
            data={selectedTodoList}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PriorityBasedTodoList;
