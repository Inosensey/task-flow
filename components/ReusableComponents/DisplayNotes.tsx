"use client";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Actions
import { deleteNote } from "@/actions/noteAction";

// Store
import { useNotificationStore } from "@/store/useNotificationStore";

// Icons
import SvgSpinners8DotsRotate from "@/Icones/SvgSpinners8DotsRotate";
import PhTrash from "@/Icones/PhTrash";

// Types
import { noteType } from "@/Types/noteTypes";
import PhNotePencilThin from "@/Icones/PhNotePencilThin";
interface props {
  setSelectedNote: React.Dispatch<React.SetStateAction<noteType | undefined>>;
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteFormAction: React.Dispatch<React.SetStateAction<string>>;
  notes: noteType[];
  scheduleId?: string,
  todoId?: number,
  noteType: string
}

export const DisplayNotes = ({
  setShowNoteForm,
  setNoteFormAction,
  notes,
  setSelectedNote,
  scheduleId,
  todoId,
  noteType
}: props) => {
  // Initialize useQuery
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();

  // Mutation
  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: (noteId: number) => {
      const id = noteType === "schedule" ? scheduleId! : todoId!
      return deleteNote(noteId, noteType, id);
    },
    onSuccess: (data) => {
      if(noteType === "schedule") {
        queryClient.invalidateQueries({ queryKey: [`ScheduleNotes#${scheduleId}`] });
      } else {
        queryClient.invalidateQueries({ queryKey: [`TodoNotes#${todoId}`] });
      }
      onNoteActionSuccess(`Note: ${data.Response[0].note}, Deleted`);
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const onNoteActionSuccess = (message: string) => {
    const notifMessage = message;
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };
  return (
    <div className="mx-auto flex flex-col phone:w-11/12 tablet:max-w-[850px] gap-1 mt-4">
      <div className="flex items-end phone:justify-between tablet:justify-start tablet:gap-2">
        <p className="text-LightPrimary font-semibold text-lg">Notes</p>
        <motion.button
          className="text-xs bg-LightPrimary w-max px-3 py-[0.2rem] rounded-md flex gap-1 mt-3"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowNoteForm(true);
            setNoteFormAction("Add");
          }}
        >
          Add Note
        </motion.button>
      </div>
      <div className="flex flex-col gap-1 mt-1">
        {notes?.map((noteDetails: noteType, index) => (
          <div
            key={noteDetails.id}
            className="text-base bg-SmoothDark p-3 rounded-lg text-LightSecondary"
          >
            <div className="flex justify-between items-center">
              <p>Note #{index + 1}</p>
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedNote(noteDetails);
                    setNoteFormAction("Edit");
                    setShowNoteForm((prev) => !prev);
                  }}                >
                  
                  <PhNotePencilThin color="#00ADB5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    deleteMutate(noteDetails.id!);
                  }}
                  className={`cursor-pointer ${
                    deleting && "pointer-events-none"
                  }`}
                >
                  {deleting ? (
                    <SvgSpinners8DotsRotate color="#ff4d4d" />
                  ) : (
                    <PhTrash color="#ff4d4d" />
                  )}
                </motion.button>
              </div>
            </div>
            <p>{noteDetails.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
