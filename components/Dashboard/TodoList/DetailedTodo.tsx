"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTodoDetails, getTodoNotes } from "@/lib/TanStackQueryFns";
import Link from "next/link";

// Components
import { DisplayNotes } from "@/components/ReusableComponents/DisplayNotes";
import NoteForm from "@/components/Dashboard/Notes/NoteForm";
import TodoListForm from "./TodoListForm";

// Icons
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

// Types
import { noteType } from "@/Types/noteTypes";
import { todoListDetails } from "@/Types/todoListTypes";
interface props {
  todoDetails: todoListDetails;
  notes: noteType[];
}

// Variants
const popUpVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export default function DetailedTodo({ notes, todoDetails }: props) {
  // Use query
  const { data: todoData } = useQuery({
    queryKey: [`todo#${todoDetails.id}`],
    queryFn: () => getTodoDetails(todoDetails.id),
    initialData: todoDetails
  });
  const { data: noteList } = useQuery({
    queryKey: [`TodoNotes#${todoDetails.id}`],
    queryFn: () => getTodoNotes(todoDetails.id),
    initialData: notes
  })

  // States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);
  const [selectedTodoList, setSelectedTodoList] = useState<
    todoListDetails | undefined
  >(undefined);

  const [noteFormAction, setNoteFormAction] = useState<string>("Add");
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<noteType | undefined>(
    undefined
  );
  return (
    <>
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary relative p-3 phone:w-full phone:h-full"
      >
        <Link href={`/dashboard/todolist`}>
          <motion.button
            className="text-base text-LightPrimary w-max px-3 py-[0.3rem] rounded-md flex gap-1 items-center"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon className="text-sm" icon={faAngleDoubleLeft} />
            Todos
          </motion.button>
        </Link>
        <div className="mt-2 mx-auto flex flex-col phone:w-11/12 laptop:max-w-[500px]">
          <div className=" flex flex-col gap-2">
            <div className="p-2 bg-Secondary rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-LightPrimary font-semibold text-base">
                  {todoData?.title}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-LightPrimary w-max px-4 py-[0.2rem] rounded-md flex gap-1 text-[0.8rem]"
                  onClick={() => {
                    setSelectedTodoList(todoData);
                    setFormAction("Edit");
                    setShowTodoListForm((prev) => !prev);
                  }}
                >
                  <span className="w-4">
                    <FontAwesomeIcon
                      className="text-sm text-LightSecondary"
                      icon={faPenToSquare}
                    />
                  </span>
                  Edit
                </motion.button>
              </div>
              <div className="flex gap-2">
                <p className="text-[0.9rem] font-semibold">Priority Level:</p>
                <p className="text-sm text-justify leading-5">
                  {todoData?.PriorityLevel.description}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-[0.9rem] font-semibold">Frequency:</p>
                <p className="text-sm text-justify leading-5">
                  {todoData?.Frequencies.frequency}
                </p>
              </div>
              <div>
                <p className="text-[0.9rem] font-semibold">Description:</p>
                <p className="text-sm text-justify leading-5">
                  {todoData?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DisplayNotes
          setSelectedNote={setSelectedNote}
          setShowNoteForm={setShowNoteForm}
          notes={noteList}
          setNoteFormAction={setNoteFormAction}
          noteType="todo"
          todoId={todoData!.id}
        />
      </motion.div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm
            setShowTodoListForm={setShowTodoListForm}
            action={formAction}
            data={selectedTodoList}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showNoteForm && (
          <NoteForm
            setShowNoteForm={setShowNoteForm}
            action={noteFormAction}
            data={noteFormAction === "Add" ? undefined : selectedNote}
            selectedTodo={todoData}
          />
        )}
      </AnimatePresence>
    </>
  );
}
