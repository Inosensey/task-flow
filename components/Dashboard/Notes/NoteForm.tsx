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
import { TableInsert, TableRow } from "@/Types/database.types";
import { useFormStateType } from "@/Types/formStates";
type selectedTypes = {
  selectedNoteType: string | undefined;
  selectedSchedule: string | undefined;
  selectedTodo: string | undefined;
};
type toggleTypes = {
  toggleNoteTypeSelect: boolean;
  toggleScheduleSelect: boolean;
  toggleTodoSelect: boolean;
  toggleMobileOptions: boolean;
};
interface props {
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  data?: TableInsert<"Notes"> & { Schedules: TableRow<"Schedules"> } & {
    TodoList: TableRow<"TodoList">;
  } & { NoteType: TableRow<"NoteType"> };
}

// Initials
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const toggleInitials: toggleTypes = {
  toggleNoteTypeSelect: false,
  toggleScheduleSelect: false,
  toggleTodoSelect: false,
  toggleMobileOptions: false,
};

const NoteForm = ({ setShowNoteForm, action, data }: props) => {
  // Note Initial
  const selectedInitials: selectedTypes = {
    selectedNoteType: data ? data.NoteType.type! : "Assign Notes to",
    selectedSchedule: data?.scheduleId ? data.Schedules.title! : "Schedules",
    selectedTodo: data?.todoId ? data.TodoList.title! : "Todos",
  };
  const noteDataInitial: TableInsert<"Notes"> = {
    id: data ? data?.id! : 0,
    noteType: data ? data?.noteType! : 0,
    scheduleId: data?.scheduleId ? data?.scheduleId! : 0,
    todoId: data?.todoId ? data?.todoId! : 0,
    note: data ? data?.note! : "",
  };

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
  const [toggle, setToggle] = useState<toggleTypes>(toggleInitials);
  const [optionType, setOptionType] = useState<string>("");
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
              showChoices={toggle.toggleNoteTypeSelect}
              setToggleDesktopOptions={() => {
                setToggle((prev) => ({ ...prev, toggleNoteTypeSelect: !prev }));
                setOptionType("noteType");
              }}
              setToggleMobileOptions={() => {
                setToggle((prev) => ({ ...prev, toggleMobileOptions: !prev }));
                setOptionType("noteType");
                setMobileOptionHeader("Assign Notes to");
                setSelectedMobileOptions(noteTypesData!);
              }}
            >
              {windowCurrentWidth >= 769 &&
                optionType === "noteType" &&
                getMobileSelectOption<
                  TableInsert<"Notes">,
                  selectedTypes,
                  toggleTypes
                >({
                  optionType,
                  setSelected: setSelected,
                  setState: setNoteInput,
                  setToggleOptions: setToggle,
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
                showChoices={toggle.toggleScheduleSelect}
                setToggleDesktopOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleScheduleSelect: !prev,
                  }));
                  setOptionType("setSchedulesNote");
                }}
                setToggleMobileOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleMobileOptions: !prev,
                  }));
                  setOptionType("setSchedulesNote");
                  setMobileOptionHeader("Schedules");
                  setSelectedMobileOptions(schedulesData!);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "setSchedulesNote" &&
                  getMobileSelectOption<
                    TableInsert<"Notes">,
                    selectedTypes,
                    toggleTypes
                  >({
                    optionType,
                    setSelected: setSelected,
                    setState: setNoteInput,
                    setToggleOptions: setToggle,
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
                showChoices={toggle.toggleTodoSelect}
                setToggleDesktopOptions={() => {
                  setToggle((prev) => ({ ...prev, toggleTodoSelect: !prev }));
                  setOptionType("setTodosNote");
                }}
                setToggleMobileOptions={() => {
                  setToggle((prev) => ({
                    ...prev,
                    toggleMobileOptions: !prev,
                  }));
                  setOptionType("setTodosNote");
                  setMobileOptionHeader("Todos");
                  setSelectedMobileOptions(todoListsData?.unsortedTodoList!);
                }}
              >
                {windowCurrentWidth >= 769 &&
                  optionType === "setTodosNote" &&
                  getMobileSelectOption<
                    TableInsert<"Notes">,
                    selectedTypes,
                    toggleTypes
                  >({
                    optionType,
                    setSelected: setSelected,
                    setState: setNoteInput,
                    setToggleOptions: setToggle,
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
              state={noteInput!.noteType!.toString()}
              type="hidden"
              name="noteType"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={noteInput!.scheduleId!.toString()}
              type="hidden"
              name="scheduleId"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={noteInput!.todoId!.toString()}
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
              isPending === null || !isPending
                ? "bg-LightPrimary text-LightSecondary"
                : ""
            } ${
              isPending && "bg-LightPrimaryDisabled text-Disabled"
            }  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
            type="submit"
          >
            {isPending === null || !isPending ? (
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
          {toggle.toggleMobileOptions && (
            <MobileSelectOptions<any, selectedTypes, toggleTypes>
              setToggleOptions={setToggle}
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
