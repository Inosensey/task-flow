"use client";

import React from "react";
import { motion } from "framer-motion";

// Zustand store
import { useNotificationStore } from "@/store/useNotificationStore";

// Icons
import { deleteNote } from "@/actions/noteAction";
import SvgSpinners8DotsRotate from "@/Icones/SvgSpinners8DotsRotate";

// Types
import { noteType } from "@/Types/noteTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PhTrash from "@/Icones/PhTrash";
interface props {
  info: noteType;
  setSelectedNote: React.Dispatch<React.SetStateAction<noteType | undefined>>;
  setFormAction: React.Dispatch<React.SetStateAction<string>>;
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Note = ({
  info,
  setFormAction,
  setSelectedNote,
  setShowNoteForm,
}: props) => {
  // Initialize useQuery
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();

  // Mutation
  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: (noteId: number) => {
      return deleteNote(noteId);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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
    <div className="bg-SmoothDark p-3 flex flex-col gap-1 rounded-lg text-LightSecondary mdphone:w-[49%]">
      <p className="font-semibold ">
        {info.Schedules ? "Schedule:" : "Todo:"}{" "}
      </p>
      <p className="font-semibold text-sm">
        {info.Schedules ? info.Schedules.title : info.TodoList.title}
      </p>
      <div className="w-full h-20 line-clamp-4 text-sm">
        <p className="font-semibold ">Note:</p>
        <p>{info.note}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <motion.button
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setSelectedNote(info);
            setFormAction("Edit");
            setShowNoteForm((prev) => !prev);
          }}
          className="cursor-pointer bg-Secondary rounded-md text-LightSecondary phone:text-sm phone:w-28 phone:py-1"
        >
          More Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            deleteMutate(info.id!);
          }}
          className={`cursor-pointer ${deleting && "pointer-events-none"}`}
        >
          {deleting ? (
            <SvgSpinners8DotsRotate color="#ff4d4d" />
          ) : (
            <PhTrash color="#ff4d4d" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Note;
