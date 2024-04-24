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

// Actions
import { mutateTodoList } from "@/actions/todolistActions";

// store
import { useNotificationStore } from "@/store/useNotificationStore";
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// utils
import { useDays } from "@/utils/useDate";

// types
import { TableInsert, TableRow } from "@/Types/database.types";
import { getPriorityLevel } from "@/lib/todolistMethods";
import CustomSelect from "@/components/ReusableComponents/inputs/CustomSelect";

// Icons
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";
import { useFormSerialize } from "@/utils/formUtils";
import FormValidation from "@/utils/validation";

// Types
interface props {
  setShowTodoListForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

const todoListInputInitials: TableInsert<"TodoList"> = {
  title: "",
  description: "",
  priorityLevel: 0,
  userId: "",
  frequency: "",
};

const TodoListForm = ({ setShowTodoListForm }: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();
  const { setValidation, validations, resetValidation, formAction } =
    useScheduleFormStore();

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
  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: (todoListInfo: TableInsert<"TodoList">) => {
      return mutateTodoList(todoListInfo, "add");
    },
    onSuccess: (data) => {
      console.log(data);
      onTodoListAddSuccess();
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const onTodoListAddSuccess = () => {
    const notifMessage = "TodoList Successfully Added";
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
    setShowTodoListForm(false);
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldsToCheck = ["date", "title", "timeStart", "timeEnd", "city"];
    const formValues: TableInsert<"TodoList"> & { [key: string]: string } =
      useFormSerialize(event);
    console.log(formValues);
    if (scheduleFormValidate(fieldsToCheck, formValues)) {
      console.log("valid");
      mutate(formValues);
    } else {
      console.log("not valid");
      return;
    }
  };

  const scheduleFormValidate = (
    fieldsToCheck: Array<string>,
    formValues: TableInsert<"TodoList"> & { [key: string]: string }
  ) => {
    let isValid = true;
    fieldsToCheck.some((field) => {
      if (formValues[field] === "") {
        isValid = false;
        const validationParams = {
          value: formValues[field],
          stateName: field,
        };
        const result: validation = FormValidation(validationParams);
        setValidation(result);
      }
    });
    return isValid;
  };

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

  // Variants
  const popUpVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.25,
      },
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.25,
      },
    },
  };

  return (
    <Overlay>
      <motion.form
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        onSubmit={useHandleFormSubmit}
        className="bg-Primary p-3 phone:w-11/12 rounded-md"
      >
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
                selectedFrequent === ""
                  ? "Frequencies"
                  : selectedFrequent
              }
              placeHolder={"Frequencies"}
              showChoices={toggleFrequentSelect}
              setShowChoices={setToggleFrequentSelect}
            >
              <div
                onClick={() => {
                  setSelectedFrequent("Everyday");
                  setTodoListInput((prev) => ({
                    ...prev,
                    frequency: "Everyday",
                  }));
                  setToggleFrequentSelect(false);
                }}
                className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
              >
                <p className="select-none">Everyday</p>
              </div>
              {days?.map((frequency: string) => (
                <div
                  onClick={() => {
                    setTodoListInput((prev) => ({
                      ...prev,
                      frequency: frequency,
                    }));
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
          <div className="hidden">
            <Input
              state={todoListInput.priorityLevel?.toString()!}
              type="hidden"
              name="priorityLevel"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={todoListInput.frequency!}
              type="hidden"
              name="frequency"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
          </div>
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
