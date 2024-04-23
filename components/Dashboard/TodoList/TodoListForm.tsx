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
} from "@/components/ReusableComponents/inputs/Input";

// utils
import { useDays } from "@/utils/useDate";

// types
import { TableInsert, TableRow } from "@/Types/database.types";
import { getPriorityLevel } from "@/lib/todolistMethods";
import CustomSelect from "@/components/ReusableComponents/inputs/CustomSelect";

// Icons
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

interface props {
  setShowTodoListForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const todoListInputInitials: TableInsert<"TodoList"> = {
  title: "",
  description: "",
  priorityLevel: 0,
  userId: "",
};

const TodoListForm = ({ setShowTodoListForm }: props) => {
  // States
  const [todoListInput, setTodoListInput] = useState<TableInsert<"TodoList">>(
    todoListInputInitials
  );
  const [togglePrioritySelect, setTogglePrioritySelect] =
    useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [toggleFrequentSelect, setToggleFrequentSelect] =
    useState<boolean>(false);
  const [selectedFrequent, setSelectedFrequent] = useState<string>("");

  const days: Array<string> = useDays();

  // Use Query
  const {
    data: priorityLevels,
    error: priorityLevelError,
    isFetched: priorityLevelsIsFetch,
  } = useQuery({
    queryKey: ["priorityLevel"],
    queryFn: () => getPriorityLevel(),
  });

  console.log(priorityLevels);
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
  };
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
          <div>
            <label className="phone:text-sm">Set Priority Level</label>
            <CustomSelect
              selected={
                todoListInput.priorityLevel == 0
                  ? "Priority Levels"
                  : selectedPriority
              }
              placeHolder={"Priority Levels"}
              showChoices={togglePrioritySelect}
              setShowChoices={setTogglePrioritySelect}
            >
              {priorityLevels?.map((level: TableRow<"PriorityLevel">) => (
                <div
                  onClick={() => {
                    setTodoListInput((prev) => ({
                      ...prev,
                      priorityLevel: level.level,
                    }));
                    setSelectedPriority(
                      `${level.level} - ${level.description!}`
                    );
                    setTogglePrioritySelect(false);
                  }}
                  key={level.level}
                  className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                >
                  <p className="select-none">
                    {level.level} - {level.description}
                  </p>
                </div>
              ))}
            </CustomSelect>
          </div>
          <div>
            <label className="phone:text-sm">
              Choose how frequent your Todo
            </label>
            <CustomSelect
              selected={
                todoListInput.priorityLevel == 0
                  ? "Frequencies"
                  : selectedPriority
              }
              placeHolder={"Frequencies"}
              showChoices={toggleFrequentSelect}
              setShowChoices={setToggleFrequentSelect}
            >
              <div
                onClick={() => {
                  setSelectedFrequent("Everyday");
                  setToggleFrequentSelect(false);
                }}
                className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
              >
                <p className="select-none">Everyday</p>
              </div>
              {days?.map((frequency: string) => (
                <div
                  onClick={() => {
                    setSelectedFrequent(frequency);
                    setToggleFrequentSelect(false);
                  }}
                  key={frequency}
                  className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                >
                  <p className="select-none">{frequency}</p>
                </div>
              ))}
            </CustomSelect>
          </div>
          <TextareaInput
            name="description"
            label="Description"
            state={todoListInput.description!}
            cols={30}
            rows={7}
            onChange={handleTextareaChange}
            onBlur={handleTextareaChange}
          />

          <div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className={`bg-LightPrimary text-LightSecondary  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
              type="submit"
            >
              <span className="w-4">
                <FontAwesomeIcon className="text-sm" icon={faClipboardCheck} />
              </span>
              Save Todo
            </motion.button>
          </div>
        </div>
      </motion.form>
    </Overlay>
  );
};

export default TodoListForm;
