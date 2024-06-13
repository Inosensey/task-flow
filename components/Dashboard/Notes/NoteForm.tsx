import React, { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";

// Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";
import { TableInsert } from "@/Types/database.types";

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
  // States
  const [noteInput, setNoteInput] = useState<TableInsert<"Notes">>(noteInitial);

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
        </motion.form>
      </Overlay>
    </>
  );
};

export default NoteForm;
