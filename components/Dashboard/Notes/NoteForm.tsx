import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// libs
import { getNoteTypes } from "@/lib/TanStackQueryFns";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import CustomSelect, { MobileSelectOptions } from "@/components/ReusableComponents/inputs/CustomSelect";

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
interface props {
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  data?: TableInsert<"Notes">;
}

// Initials
const noteInitial: TableInsert<"Notes"> = {
  noteType: null,
  scheduleId: null,
  todoId: null,
  note: "",
};

const NoteForm = ({ setShowNoteForm, action, data }: props) => {
  // Queries
  const {data: noteTypesData} = useQuery({
    queryKey: ["noteTypes"],
    queryFn: getNoteTypes,
  })

  // States
  const [noteInput, setNoteInput] = useState<TableInsert<"Notes">>(noteInitial);
  const [toggleNoteTypeSelect, setToggleNoteTypeSelect] = useState<boolean>(false);
  const [toggleScheduleSelect, setToggleScheduleSelect] = useState<boolean>(false);
  const [toggleTodoSelect, setToggleSelect] = useState<boolean>(false);
  const [optionType, setOptionType] = useState<string>("")
  const [toggleMobileOptions, setToggleMobileOptions] = useState<boolean>(false);
  const [mobileOptionHeader, setMobileOptionHeader] = useState<string>("");
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<any[] | undefined>(undefined)
  // Zustand Store
  const { resetValidation } = useScheduleFormStore();

  return (
    <>
      <Overlay>
        <motion.form
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
                selected={"Note Types"
                }
                placeHolder={"Note Types"}
                showChoices={toggleNoteTypeSelect}
                setToggleDesktopOptions={() => {
                  setToggleNoteTypeSelect((prev) => !prev);
                  setOptionType("noteType");
                }}
                setToggleMobileOptions={() => {
                  setToggleMobileOptions((prev) => !prev);
                  setOptionType("noteType");
                  setMobileOptionHeader("Note Type");
                  setSelectedMobileOptions(noteTypesData!);
                }}
              >wew</CustomSelect>
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
              setState={setNoteInput}
            />
          )}
        </AnimatePresence>
      </Overlay>
    </>
  );
};

export default NoteForm;
