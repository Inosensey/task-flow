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
import { TableInsert } from "@/Types/database.types";
import { getFrequencies, getPriorityLevels } from "@/lib/TanStackQueryFns";
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
import { getMobileSelectOption } from "@/utils/getMobileSelectOption";
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
type toggleTypes = {
  toggleFrequency: boolean;
  togglePriorityLevel: boolean;
  toggleMobileOptions: boolean;
};
type selectedTypes = {
  selectedFrequency: string;
  selectedPriorityLevel: string;
};

// Initials
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const toggleInitials: toggleTypes = {
  toggleFrequency: false,
  togglePriorityLevel: false,
  toggleMobileOptions: false,
};

const TodoListForm = ({ setShowTodoListForm, action, data }: props) => {
  const windowCurrentWidth = window.innerWidth;

  // TodoList Initialize
  const selectedInitials: selectedTypes = {
    selectedPriorityLevel:
      action !== "add" && data !== undefined
        ? data.PriorityLevel.description
        : "Priority Levels",
    selectedFrequency:
      action !== "add" && data !== undefined
        ? data.Frequencies.frequency
        : "Frequencies",
  };
  const initializeTodoListInput = (): TableInsert<"TodoList"> => ({
    id: action !== "add" && data !== undefined ? data.id : 0,
    title: action !== "add" && data !== undefined ? data.title : "",
    description: action !== "add" && data !== undefined ? data.description : "",
    priorityLevel:
      action !== "add" && data !== undefined ? data.PriorityLevel.level! : 0,
    frequency: action !== "add" && data !== undefined ? data.Frequencies.id : 0,
  });

  // Use query
  const queryClient = useQueryClient();
  const { data: priorityLevels } = useQuery({
    queryKey: ["priorityLevels"],
    queryFn: () => getPriorityLevels(),
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
  const [selected, setSelected] = useState<selectedTypes>(selectedInitials);
  const [toggle, setToggle] = useState<toggleTypes>(toggleInitials);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  // Toggle mobile options UI
  const [optionType, setOptionType] = useState<string>("");
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<
    any[] | undefined
  >(undefined);
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
      if (action === "Add") {
        queryClient.invalidateQueries({ queryKey: ["todolists"] });
      } else {
        queryClient.invalidateQueries({ queryKey: [`todo#${data?.id}`], });
      }
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
                selected={selected.selectedPriorityLevel}
                setToggleMobileOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleMobileOptions: !prev,
                  }));
                  setOptionType("PriorityLevel");
                  setMobileOptionHeader("Priority Levels");
                  setSelectedMobileOptions(priorityLevels!);
                }}
                placeHolder={"Priority Levels"}
                showChoices={toggle.togglePriorityLevel}
                setToggleDesktopOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    togglePriorityLevel: !prev,
                  }));
                  setOptionType("PriorityLevel");
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "PriorityLevel" &&
                  getMobileSelectOption<
                    TableInsert<"TodoList">,
                    selectedTypes,
                    toggleTypes
                  >({
                    optionType,
                    setSelected: setSelected,
                    setState: setTodoListInput,
                    setToggleOptions: setToggle,
                    choices: priorityLevels!,
                  })}
              </CustomSelect>
            </div>
            <div>
              <label className="phone:text-sm">
                Choose how frequent your Todo
              </label>
              <CustomSelect
                valid={validations?.frequency?.valid}
                validationMessage={validations?.frequency?.validationMessage}
                selected={selected.selectedFrequency}
                placeHolder={"Frequencies"}
                showChoices={toggle.toggleFrequency}
                setToggleDesktopOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleFrequency: !prev,
                  }));
                  setOptionType("Frequencies");
                }}
                setToggleMobileOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleMobileOptions: !prev,
                  }));
                  setOptionType("Frequencies");
                  setMobileOptionHeader("Frequencies");
                  setSelectedMobileOptions(frequencies!);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "Frequencies" &&
                  getMobileSelectOption<
                    TableInsert<"TodoList">,
                    selectedTypes,
                    toggleTypes
                  >({
                    optionType,
                    setSelected: setSelected,
                    setState: setTodoListInput,
                    setToggleOptions: setToggle,
                    choices: frequencies!,
                  })}
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
                state={todoListInput!.priorityLevel!.toString()}
                type="hidden"
                name="priorityLevel"
                placeholder=""
                label=""
                valid={null}
                validationMessage={""}
              />
              <Input
                state={todoListInput!.frequency!.toString()}
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
                placeholder=""
                label="Title"
              />
              <Input
                state={todoListInput.id!.toString()}
                type="hidden"
                name="todoId"
                placeholder=""
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
          {toggle.toggleMobileOptions && (
            <MobileSelectOptions<any, selectedTypes, toggleTypes>
              setSelected={setSelected}
              setToggleOptions={setToggle}
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
