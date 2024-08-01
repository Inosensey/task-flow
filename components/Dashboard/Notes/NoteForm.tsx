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

// Utils
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import CustomSelect, {
  MobileSelectOptions,
} from "@/components/ReusableComponents/inputs/CustomSelect";
import { getDesktopSelectOption } from "@/utils/getDesktopSelectOption";
import Input, {
  TextareaInput,
} from "@/components/ReusableComponents/inputs/Input";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Store
import { useFormStore } from "@/store/useFormStore";

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
import { useNotificationStore } from "@/store/useNotificationStore";
import { noteType } from "@/Types/noteTypes";
import { ScheduleDetails } from "@/Types/scheduleType";
import { todoListDetails } from "@/Types/todoListTypes";
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
  data?: noteType;
  selectedSchedule?: {
    schedule: ScheduleDetails[];
  };
  selectedTodo?: todoListDetails;
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

const NoteForm = ({
  setShowNoteForm,
  action,
  data,
  selectedSchedule,
  selectedTodo,
}: props) => {
  // Note Initial
  const selectedInitials: selectedTypes = {
    selectedNoteType: data ? data.NoteType.type! : "Assign Notes to",
    selectedSchedule:
      data && data.scheduleId !== null ? data.Schedules!.title! : "Schedules",
    selectedTodo:
      data && data.todoId !== null ? data.TodoList!.title! : "Todos",
  };
  const noteDataInitial: TableInsert<"Notes"> = {
    id: data ? data?.id! : 0,
    noteType: data ? data?.noteType! : null,
    scheduleId: data?.scheduleId ? data?.scheduleId! : null,
    todoId: data?.todoId ? data?.todoId! : null,
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
    enabled: selectedSchedule === undefined && selectedTodo === undefined,
  });
  const { data: todoListsData } = useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoList,
    enabled: selectedSchedule === undefined && selectedTodo === undefined,
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
  const { resetValidation, setValidation } = useFormStore();
  const { setMessage, setShowSlideNotification } = useNotificationStore();

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setIsPending(true);
    const fieldsToCheck = ["note", "noteType"];
    const formValues: TableInsert<"Notes"> & { [key: string]: string } =
      useFormSerialize(event);
    if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
      event.preventDefault();
      setIsPending(false);
    }
  };

  const onNoteActionSuccess = () => {
    const notifMessage =
      action === "Add"
        ? "Note Successfully Added"
        : "Note Successfully Updated";
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
    setShowNoteForm(false);
    setNoteInput(noteDataInitial);
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNoteInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UseEffect
  useEffect(() => {
    if (selectedSchedule) {
      setNoteInput((prev) => ({
        ...prev,
        noteType: 1,
        scheduleId: selectedSchedule.schedule[0].id,
      }));
    }
    if (selectedTodo) {
      setNoteInput((prev) => ({
        ...prev,
        noteType: 2,
        todoId: selectedTodo.id,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (state.success) {
      if (!selectedTodo && selectedSchedule!) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      } else if (selectedSchedule) {
        queryClient.invalidateQueries({
          queryKey: [`ScheduleNotes#${selectedSchedule.schedule[0].id}`],
        });
      } else if (selectedTodo) {
        queryClient.invalidateQueries({
          queryKey: [`TodoNotes#${selectedTodo.id}`],
        });
      }
      setIsPending(false);
      onNoteActionSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Overlay>
        <motion.form
          onSubmit={useHandleFormSubmit}
          action={formAction}
          variants={popUpVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="bg-Primary p-3 rounded-md phone:w-11/12 phone:mt-2 phone:h-max tablet:max-w-[420px]"
        >
          <div className="flex justify-between items-center">
            <p className="py-0">Notes Form</p>
            <p
              style={{ height: "max-content" }}
              className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
              onClick={() => {
                setShowNoteForm((prev) => !prev);
                resetValidation();
                setNoteInput(noteDataInitial);
              }}
            >
              X
            </p>
          </div>
          {!selectedSchedule && !selectedTodo && (
            <>
              <div>
                <label className="phone:text-sm">
                  Choose where you want to put your Note
                </label>
                <CustomSelect
                  selected={selected.selectedNoteType}
                  placeHolder={"Assign Notes to"}
                  showChoices={toggle.toggleNoteTypeSelect}
                  setToggleDesktopOptions={() => {
                    setToggle((prev) => ({
                      ...prev,
                      toggleNoteTypeSelect: !prev.toggleNoteTypeSelect,
                    }));
                    setOptionType("noteType");
                  }}
                  setToggleMobileOptions={() => {
                    setToggle((prev) => ({
                      ...prev,
                      toggleMobileOptions: !prev.toggleMobileOptions,
                    }));
                    setOptionType("noteType");
                    setMobileOptionHeader("Assign Notes to");
                    setSelectedMobileOptions(noteTypesData!);
                  }}
                >
                  {windowCurrentWidth >= 769 &&
                    optionType === "noteType" &&
                    getDesktopSelectOption<
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
                        toggleScheduleSelect: !prev.toggleScheduleSelect,
                      }));
                      setOptionType("setSchedulesNote");
                    }}
                    setToggleMobileOptions={() => {
                      setToggle((prev) => ({
                        ...prev,
                        toggleMobileOptions: !prev.toggleMobileOptions,
                      }));
                      setOptionType("setSchedulesNote");
                      setMobileOptionHeader("Schedules");
                      setSelectedMobileOptions(schedulesData!);
                    }}
                  >
                    {windowCurrentWidth >= 769 &&
                      optionType === "setSchedulesNote" &&
                      getDesktopSelectOption<
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
                      setToggle((prev) => ({
                        ...prev,
                        toggleTodoSelect: !prev.toggleTodoSelect,
                      }));
                      setOptionType("setTodosNote");
                    }}
                    setToggleMobileOptions={() => {
                      setToggle((prev) => ({
                        ...prev,
                        toggleMobileOptions: !prev.toggleMobileOptions,
                      }));
                      setOptionType("setTodosNote");
                      setMobileOptionHeader("Todos");
                      setSelectedMobileOptions(
                        todoListsData?.unsortedTodoList!
                      );
                    }}
                  >
                    {windowCurrentWidth >= 769 &&
                      optionType === "setTodosNote" &&
                      getDesktopSelectOption<
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
            </>
          )}

          {noteInput.todoId || noteInput.scheduleId ? (
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
              state={selectedSchedule ? "True" : "False"}
              type="hidden"
              name="preFilledSchedule"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
              onChange={handleInputChange}
            />
            <Input
              state={selectedTodo ? "True" : "False"}
              type="hidden"
              name="preFilledTodo"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
              onChange={handleInputChange}
            />
            <Input
              state={noteInput.noteType ? noteInput.noteType!.toString() : "0"}
              type="hidden"
              name="noteType"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
              onChange={handleInputChange}
            />
            <Input
              state={
                noteInput.scheduleId ? noteInput.scheduleId!.toString() : "0"
              }
              type="hidden"
              name="scheduleId"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
              onChange={handleInputChange}
            />
            <Input
              state={noteInput.todoId ? noteInput.todoId!.toString() : "0"}
              type="hidden"
              name="todoId"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
              onChange={handleInputChange}
            />
            <Input
              state={action}
              type="hidden"
              name="action"
              placeholder=""
              label="Title"
              onChange={handleInputChange}
            />
            <Input
              state={noteInput.id ? noteInput.id!.toString() : "0"}
              type="hidden"
              name="id"
              placeholder=""
              label="Title"
              onChange={handleInputChange}
            />
          </div>
          {noteInput.todoId || noteInput.scheduleId ? (
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className={`mt-3 ${
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
          ) : (
            ""
          )}
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
