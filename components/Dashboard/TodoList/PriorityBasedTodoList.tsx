"use client";

import React from "react";

// Component
import Todo from "./Todo";

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

  if (todoLists.length === 0) return;
  return (
    <>
      <div className="phone:w-11/12 mx-auto">
        <p style={{ background: `${color}` }} className="px-2 w-max">
          {priority}
        </p>
        <div>
          {todoLists.map((details: todoListDetails) => (
            <Todo key={details.id} details={details} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PriorityBasedTodoList;
