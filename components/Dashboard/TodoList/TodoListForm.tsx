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
    // States
  const [todoListInput, setTodoListInput] = useState<TableInsert<"TodoList">>(
    todoListInputInitials
  );

  // Events
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };
    setTodoListInput((prev) => ({
        ...prev,
        [name]: value,
      }));
 }
 const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setTodoListInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        <div className="mt-4 flex flex-col gap-4">
          <Input
            state={todoListInput.title!}
            type="text"
            name="title"
            placeholder="Enter the Title of your Todo"
            label="Title"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={null}
          />
          <TextareaInput
            name="description"
            label="Description"
            state={todoListInput.description!}
            cols={30}
            rows={7}
            onChange={handleTextareaChange}
            onBlur={handleTextareaChange}
          /></div>
      </motion.form>
    </Overlay>
  );
};

export default TodoListForm;
