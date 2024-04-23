"use client";

// Core
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import Input, {
  TextareaInput,
  TimeInput,
} from "@/components/ReusableComponents/inputs/Input";

// types
import { TableInsert } from "@/Types/database.types";

interface props {
  setShowTodoListForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const todoListInputInitials: TableInsert<"TodoList"> = {
  title: "",
  description: "",
  priorityLevel: "",
  userId: "",
};

const TodoListForm = ({ setShowTodoListForm }: props) => {
  const [todoListInput, setTodoListInput] = useState<TableInsert<"TodoList">>(
    todoListInputInitials
  );

  return (
    <Overlay>
      <motion.form className="bg-Primary p-3 phone:w-11/12 rounded-md">
        <div className="flex justify-between items-center">
          <p className="py-0">TodoList Form</p>
          <p
            style={{ height: "max-content" }}
            className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
            onClick={() => setShowTodoListForm((prev) => !prev)}
          >
            X
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4"></div>
      </motion.form>
    </Overlay>
  );
};

export default TodoListForm;
