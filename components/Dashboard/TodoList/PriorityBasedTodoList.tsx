"use client";

import React, { useEffect, useState } from "react";

// Component
import Todo from "./Todo";

// Types
import { todoListDetails } from "@/Types/todoListTypes";
interface props {
  priority: string;
  color: string;
  todoLists: todoListDetails[];
  selectedStatus: string;
  addTodoFn: () => void
}

const PriorityBasedTodoList = ({
  priority,
  color,
  todoLists,
  selectedStatus,
  addTodoFn
}: props) => {

  const [haveTodos, setHaveTodos] = useState<boolean>(true);

  const checkTodosLength = () => {
    console.log(selectedStatus);
    if (selectedStatus === "All") return setHaveTodos(true);
    const todosLength = todoLists.filter(
      (details: todoListDetails) =>
        details.TodoListStatus.status === selectedStatus
    ).length;
    todosLength === 0 ? setHaveTodos(false) : setHaveTodos(true);
  };

  useEffect(() => {
    checkTodosLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  return (
    <>
      <div className="phone:w-11/12 mx-auto">
        <p className="bg-LightPrimaryDisabled px-2 w-max phone:text-md">
          {priority}
        </p>
        <div>
          {haveTodos && todoLists.length !== 0 ? (
            todoLists.map((details: todoListDetails) => {
              if (selectedStatus === "All")
                return <Todo key={details.id} details={details} />;
              if (selectedStatus === details.TodoListStatus.status) {
                return <Todo key={details.id} details={details} />;
              }
            })
          ) : (
            <div
              className={`border-l-2 border-l-LightPrimaryDisabled flex justify-between items-center p-2`}
            >
              <p className="phone:text-xs laptop:text-sm">
                No {priority} To-do lists.{" "}
                <span onClick={addTodoFn} className="underline cursor-pointer text-LightPrimary">
                  Add {priority} To-do?
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PriorityBasedTodoList;
