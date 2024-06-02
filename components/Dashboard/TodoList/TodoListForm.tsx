"use client";

// Core
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useFormState } from "react-dom";

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

// types
import { TableInsert, TableRow } from "@/Types/database.types";
import { getFrequencies, getPriorityLevel } from "@/lib/todolistMethods";
import CustomSelect, {
  MobileSelectOptions,
} from "@/components/ReusableComponents/inputs/CustomSelect";

// Icons
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Utils
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";
import FormValidation from "@/utils/validation";

// Types
import { todoListDetails } from "@/Types/todoListTypes";
import { useFormStateType } from "@/Types/formStates";
interface props {
  setShowTodoListForm: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  data?: todoListDetails;
}

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

// Initials
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const TodoListForm = ({ setShowTodoListForm, action, data }: props) => {
  const windowCurrentWidth = window.innerWidth;

  // TodoList Initialize
  const initializeTodoListInput = (): TableInsert<"TodoList"> => ({
    title: action !== "add" && data ? data.title : "",
    description: action !== "add" && data ? data.description : "",
    priorityLevel:
      action !== "add" && data ? data.PriorityLevel.level! : undefined,
    frequency: action !== "add" && data ? data.Frequencies.id : undefined,
  });

  // Use query
  const queryClient = useQueryClient();
  const { data: priorityLevels } = useQuery({
    queryKey: ["priorityLevels"],
    queryFn: () => getPriorityLevel(),
  });
  const { data: frequencies } = useQuery({
    queryKey: ["frequencies"],
    queryFn: () => getFrequencies(),
  });

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();
  const { setValidation, validations, resetValidation } =
    useScheduleFormStore();

  // UseFormState
  const [state, formAction] = useFormState(
    mutateTodoList,
    useFormStateInitials
  );

  // States
  const [todoListInput, setTodoListInput] = useState<TableInsert<"TodoList">>(
    initializeTodoListInput
  );
  const [togglePrioritySelect, setTogglePrioritySelect] = useState(false);
  const [toggleFrequentSelect, setToggleFrequentSelect] = useState(false);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  // Toggle mobile options UI
  const [optionType, setOptionType] = useState<string>("");
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<
    any[] | undefined
  >(undefined);
  const [toggleMobileOptions, setToggleMobileOptions] = useState(false);
  const [mobileOptionHeader, setMobileOptionHeader] = useState("");

  const onTodoListAddSuccess = () => {
    const notifMessage =
      action === "Add"
        ? "TodoList Successfully Added"
        : "TodoList Successfully Updated";
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
    // event.preventDefault();
    setIsPending(true);
    const fieldsToCheck = ["title", "priorityLevel", "frequency"];
    const formValues: TableInsert<"TodoList"> & { [key: string]: string } =
      useFormSerialize(event);
    if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
      event.preventDefault();
      setIsPending(false);
    }
  };

  const useHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };
    setTodoListInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    const result: validation = FormValidation(validationParams);
    setValidation(result);
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

  // UseEffect
  useEffect(() => {
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
      setIsPending(false);
      onTodoListAddSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
    <>
      <Overlay>
        <motion.form
          action={formAction}
          variants={popUpVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          onSubmit={useHandleFormSubmit}
          className="bg-Primary p-3 phone:w-11/12 rounded-md phone:mt-2 phone:h-max"
        >
          <div className="flex justify-between items-center">
            <p className="py-0">TodoList Form</p>
            <p
              style={{ height: "max-content" }}
              className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
              onClick={() => {
                setShowTodoListForm((prev) => !prev);
                resetValidation();
                setTodoListInput(initializeTodoListInput);
              }}
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
              onChange={useHandleInputChange}
              onBlur={useHandleInputChange}
              valid={validations?.title?.valid}
              validationMessage={validations?.title?.validationMessage}
            />
            <div>
              <label className="phone:text-sm">Set Priority Level</label>
              <CustomSelect
                valid={validations?.priorityLevel?.valid}
                validationMessage={
                  validations?.priorityLevel?.validationMessage
                }
                selected={
                  todoListInput.priorityLevel === undefined
                    ? "Priority Levels"
                    : priorityLevels.find(
                        (priorityLevelInfo: TableRow<"PriorityLevel">) =>
                          priorityLevelInfo.level ===
                            todoListInput.priorityLevel &&
                          priorityLevelInfo.description
                      ).description
                }
                setToggleMobileOptions={() => {
                  setToggleMobileOptions((prev) => !prev);
                  setOptionType("PriorityLevel");
                  setMobileOptionHeader("Priority Levels");
                }}
                setSelectedMobileOptions={() => {
                  setSelectedMobileOptions(priorityLevels);
                }}
                placeHolder={"Priority Levels"}
                showChoices={togglePrioritySelect}
                setToggleDesktopOptions={() => {
                  setTogglePrioritySelect((prev) => !prev);
                  setOptionType("PriorityLevel");
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "PriorityLevel" &&
                  priorityLevels?.map((level: TableRow<"PriorityLevel">) => (
                    <div
                      onClick={() => {
                        setTodoListInput((prev) => ({
                          ...prev,
                          priorityLevel: level.level,
                        }));
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
                valid={validations?.frequency.valid}
                validationMessage={validations?.frequency?.validationMessage}
                selected={
                  todoListInput.frequency === undefined
                    ? "Frequencies"
                    : frequencies.find(
                        (frequency: TableRow<"Frequencies">) =>
                          frequency.id === todoListInput?.frequency &&
                          frequency.frequency
                      ).frequency
                }
                placeHolder={"Frequencies"}
                showChoices={toggleFrequentSelect}
                setToggleDesktopOptions={() => {
                  setToggleFrequentSelect((prev) => !prev);
                  setOptionType("Frequencies");
                }}
                setToggleMobileOptions={() => {
                  setToggleMobileOptions((prev) => !prev);
                  setOptionType("Frequencies");
                  setMobileOptionHeader("Frequencies");
                }}
                setSelectedMobileOptions={() => {
                  setSelectedMobileOptions(frequencies);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "Frequencies" &&
                  frequencies?.map((frequency: TableRow<"Frequencies">) => (
                    <div
                      onClick={() => {
                        setTodoListInput((prev) => ({
                          ...prev,
                          frequency: frequency.id,
                        }));
                        setToggleFrequentSelect(false);
                      }}
                      key={frequency.frequency}
                      className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                    >
                      <p className="select-none">{frequency.frequency}</p>
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
                state={
                  todoListInput.priorityLevel === undefined ||
                  todoListInput.priorityLevel === null
                    ? "0"
                    : todoListInput.priorityLevel.toString()
                }
                type="hidden"
                name="priorityLevel"
                placeholder=""
                label=""
                valid={null}
                validationMessage={""}
              />
              <Input
                state={
                  todoListInput.frequency === undefined ||
                  todoListInput.frequency === null
                    ? "0"
                    : todoListInput.frequency.toString()
                }
                type="hidden"
                name="frequency"
                placeholder=""
                label=""
                valid={null}
                validationMessage={""}
              />
              
            <Input
              state={action}
              type="hidden"
              name="action"
              placeholder="Enter the Title of your schedule"
              label="Title"
            />
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isPending === null || isPending === false
                    ? "bg-LightPrimary text-LightSecondary"
                    : ""
                } ${
                  isPending && "bg-LightPrimaryDisabled text-Disabled"
                }  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
                type="submit"
              >
                {isPending === null || isPending === false ? (
                  <>
                    <span className="w-4">
                      <FontAwesomeIcon
                        className="text-sm"
                        icon={faClipboardCheck}
                      />
                    </span>
                    Save Todo List
                  </>
                ) : (
                  ""
                )}
                {isPending && (
                  <>
                    <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                    Saving Todo List
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.form>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {toggleMobileOptions && (
            <MobileSelectOptions
              setToggleMobileOptions={setToggleMobileOptions}
              choices={selectedMobileOptions}
              optionType={optionType}
              header={mobileOptionHeader}
              setState={setTodoListInput}
            />
          )}
        </AnimatePresence>
      </Overlay>
    </>
  );
};

export default TodoListForm;
