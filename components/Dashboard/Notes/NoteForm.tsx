import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormState } from "react-dom";

// Action
import { mutateNote } from "@/actions/noteAction";

// libs
import {
  getNoteTypes,
  getSchedules,
  getTodoList,
} from "@/lib/TanStackQueryFns";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import CustomSelect, {
  MobileSelectOptions,
} from "@/components/ReusableComponents/inputs/CustomSelect";
import { getMobileSelectOption } from "@/utils/getMobileSelectOption";
import Input, {
  TextareaInput,
} from "@/components/ReusableComponents/inputs/Input";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

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

// Types
import { TableInsert } from "@/Types/database.types";
import { useFormStateType } from "@/Types/formStates";
type selectedTypes = {
  selectedNoteType: string | undefined;
  selectedSchedule: string | undefined;
  selectedTodo: string | undefined;
};
interface props {
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  data?: TableInsert<"Notes">;
}

// Initials
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const noteDataInitial: TableInsert<"Notes"> = {
  noteType: null,
  scheduleId: null,
  todoId: null,
  note: "",
};
const selectedInitials: selectedTypes = {
  selectedNoteType: "Assign Notes to",
  selectedSchedule: "Schedules",
  selectedTodo: "Todos",
};

const NoteForm = ({ setShowNoteForm, action, data }: props) => {
  const windowCurrentWidth = window.innerWidth;

  // Queries
  const queryClient = useQueryClient();
  const { data: noteTypesData } = useQuery({
    queryKey: ["noteTypes"],
    queryFn: getNoteTypes,
  });
  const { data: schedulesData } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });
  const { data: todoListsData } = useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoList,
  });
  // UseFormState
  const [state, formAction] = useFormState(mutateNote, useFormStateInitials);

  // States
  const [noteInput, setNoteInput] =
    useState<TableInsert<"Notes">>(noteDataInitial);
  const [selected, setSelected] = useState<selectedTypes>(selectedInitials);
  const [toggleNoteTypeSelect, setToggleNoteTypeSelect] =
    useState<boolean>(false);
  const [toggleScheduleSelect, setToggleScheduleSelect] =
    useState<boolean>(false);
  const [toggleTodoSelect, setToggleTodoSelect] = useState<boolean>(false);
  const [optionType, setOptionType] = useState<string>("");
  const [toggleMobileOptions, setToggleMobileOptions] =
    useState<boolean>(false);
  const [mobileOptionHeader, setMobileOptionHeader] = useState<string>("");
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<
    any[] | undefined
  >(undefined);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  // Zustand Store
  const { resetValidation } = useScheduleFormStore();

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setIsPending(true);
    // const fieldsToCheck = ["title", "priorityLevel", "frequency"];
    // const formValues: TableInsert<"TodoList"> & { [key: string]: string } =
    //   useFormSerialize(event);
    // if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
    //   event.preventDefault();
    //   setIsPending(false);
    // }
  };
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setNoteInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UseEffect
  useEffect(() => {
    console.log(state);
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsPending(false);
      // onTodoListAddSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Overlay>
        <motion.form
          action={formAction}
          variants={popUpVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="bg-Primary p-3 phone:w-11/12 rounded-md phone:mt-2 phone:h-max"
        >
          <div className="flex justify-between items-center">
            <p className="py-0">Notes Form</p>
            <p
              style={{ height: "max-content" }}
              className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
              onClick={() => {
                setShowNoteForm((prev) => !prev);
                resetValidation();
              }}
            >
              X
            </p>
          </div>
          <div>
            <label className="phone:text-sm">
              Choose where you want to put your Note
            </label>
            <CustomSelect
              selected={selected.selectedNoteType}
              placeHolder={"Assign Notes to"}
              showChoices={toggleNoteTypeSelect}
              setToggleDesktopOptions={() => {
                setToggleNoteTypeSelect((prev) => !prev);
                setOptionType("noteType");
              }}
              setToggleMobileOptions={() => {
                setToggleMobileOptions((prev) => !prev);
                setOptionType("noteType");
                setMobileOptionHeader("Assign Notes to");
                setSelectedMobileOptions(noteTypesData!);
              }}
            >
              {windowCurrentWidth >= 769 &&
                optionType === "noteType" &&
                getMobileSelectOption<TableInsert<"Notes">, selectedTypes>({
                  optionType,
                  setSelected: setSelected,
                  setState: setNoteInput,
                  setToggleOptions: setToggleNoteTypeSelect,
                  choices: noteTypesData!,
                })}
            </CustomSelect>
          </div>
          {noteInput.noteType === 1 && (
            <div>
              <label className="phone:text-sm">
                Choose a schedule to assign your Note
              </label>
              <CustomSelect
                selected={selected.selectedSchedule}
                placeHolder={"Schedules"}
                showChoices={toggleScheduleSelect}
                setToggleDesktopOptions={() => {
                  setToggleScheduleSelect((prev) => !prev);
                  setOptionType("setSchedulesNote");
                }}
                setToggleMobileOptions={() => {
                  setToggleMobileOptions((prev) => !prev);
                  setOptionType("setSchedulesNote");
                  setMobileOptionHeader("Schedules");
                  setSelectedMobileOptions(schedulesData!);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "setSchedulesNote" &&
                  getMobileSelectOption<TableInsert<"Notes">, selectedTypes>({
                    optionType,
                    setSelected: setSelected,
                    setState: setNoteInput,
                    setToggleOptions: setToggleScheduleSelect,
                    choices: schedulesData!,
                  })}
              </CustomSelect>
            </div>
          )}
          {noteInput.noteType === 2 && (
            <div>
              <label className="phone:text-sm">
                Choose a Todo to assign your Note
              </label>
              <CustomSelect
                selected={selected.selectedTodo}
                placeHolder={"Todos"}
                showChoices={toggleTodoSelect}
                setToggleDesktopOptions={() => {
                  setToggleTodoSelect((prev) => !prev);
                  setOptionType("setTodosNote");
                }}
                setToggleMobileOptions={() => {
                  setToggleMobileOptions((prev) => !prev);
                  setOptionType("setTodosNote");
                  setMobileOptionHeader("Todos");
                  setSelectedMobileOptions(todoListsData?.unsortedTodoList!);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "setTodosNote" &&
                  getMobileSelectOption<TableInsert<"Notes">, selectedTypes>({
                    optionType,
                    setSelected: setSelected,
                    setState: setNoteInput,
                    setToggleOptions: setToggleTodoSelect,
                    choices: todoListsData?.unsortedTodoList!,
                  })}
              </CustomSelect>
            </div>
          )}
          {noteInput.scheduleId !== null || noteInput.todoId ? (
            <TextareaInput
              name="note"
              label="Note"
              state={noteInput.note!}
              cols={30}
              rows={7}
              onChange={handleTextareaChange}
              onBlur={handleTextareaChange}
            />
          ) : (
            ""
          )}
          <div className="hidden">
            <Input
              state={
                noteInput.noteType === undefined || noteInput.noteType === null
                  ? "0"
                  : noteInput.noteType.toString()
              }
              type="hidden"
              name="noteType"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={
                noteInput.scheduleId === undefined ||
                noteInput.scheduleId === null
                  ? "0"
                  : noteInput.scheduleId.toString()
              }
              type="hidden"
              name="scheduleId"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={
                noteInput.todoId === undefined || noteInput.todoId === null
                  ? "0"
                  : noteInput.todoId.toString()
              }
              type="hidden"
              name="todoId"
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
              state={
                noteInput.id === undefined || noteInput.id === null
                  ? "0"
                  : noteInput.id.toString()
              }
              type="hidden"
              name="todoId"
              placeholder=""
              label="Title"
            />
          </div>
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
                Save Note
              </>
            ) : (
              <>
                <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                Saving Note
              </>
            )}
          </motion.button>
        </motion.form>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {toggleMobileOptions && (
            <MobileSelectOptions
              setToggleOptions={setToggleMobileOptions}
              setSelected={setSelected}
              choices={selectedMobileOptions}
              optionType={optionType}
              header={mobileOptionHeader}
              setState={setNoteInput}
            />
          )}
        </AnimatePresence>
      </Overlay>
    </>
  );
};

export default NoteForm;
