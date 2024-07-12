"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Components
import { CheckBoxInput } from "@/components/ReusableComponents/inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteForm from "./NoteForm";

// Libs
import {
  getNoteTypes,
  getNotes,
  getSchedules,
  getTodoList,
} from "@/lib/TanStackQueryFns";

// Icons
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
//Types
import { TableRow } from "@/Types/database.types";
import { todoListResponseInterface } from "@/Types/todoListTypes";
import { noteType } from "@/Types/noteTypes";
import Note from "./Note";
import NoData from "@/components/ReusableComponents/NoData";
interface props {
  schedules: TableRow<"Schedules">[] | [];
  todoList: todoListResponseInterface;
  notes: noteType[];
  noteTypes: TableRow<"NoteType">[] | [];
}

const Notes = ({ notes, schedules, todoList, noteTypes }: props) => {
  // Use query
  const { data: notesData } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    initialData: notes,
  });
  useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
    initialData: schedules,
  });
  useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoList,
    initialData: todoList,
  });
  useQuery({
    queryKey: ["noteTypes"],
    queryFn: getNoteTypes,
    initialData: noteTypes,
  });

  // States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filters] = useState<Array<string>>(["All", "Schedules", "Todo-List"]);
  const [selectedNote, setSelectedNote] = useState<noteType | undefined>(
    undefined
  );

  const toggleFilter = (value: string) => {
    setSelectedFilter(value);
  };

  const handleCheckBoxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setSelectedFilter(value);
  };

  return (
    <>
      <div className="flex-1">
        <div className="text-LightSecondary py-4 px-2 border-b-2 border-LightPrimary flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormAction("Add");
              setShowNoteForm((prev) => !prev);
              setSelectedNote(undefined);
            }}
            className="bg-LightPrimary px-2 py-[3px] rounded-md text-sm flex items-center gap-1"
          >
            Add Note
            <span className="w-4">
              <FontAwesomeIcon className="text-sm" icon={faCirclePlus} />
            </span>
          </motion.button>
        </div>
        <div className="flex mt-5 gap-8 items-center justify-center">
          {filters.map((status: string) => (
            <CheckBoxInput
              key={status}
              label={status}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
              name="todo-list-status"
              customFunc={toggleFilter}
              onChange={handleCheckBoxOnChange}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between px-2 gap-2 mt-6">
          {notesData?.length !== 0 ? (
            notesData?.map((info: noteType, index: number) => {
              let data: noteType | undefined = undefined;
              if (selectedFilter === "Schedules" && info.Schedules !== null) {
                data = info;
              }
              if (selectedFilter === "Todo-List" && info.TodoList !== null) {
                data = info;
              }
              if (selectedFilter === "All") {
                data = info;
              }
              return (
                data && (
                  <Note
                    key={index}
                    info={data}
                    setFormAction={setFormAction}
                    setSelectedNote={setSelectedNote}
                    setShowNoteForm={setShowNoteForm}
                  />
                )
              );
            })
          ) : (
            <NoData
              setShowForm={setShowNoteForm}
              ButtonName="Add Note"
            />
          )}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showNoteForm && (
          <NoteForm
            setShowNoteForm={setShowNoteForm}
            action={formAction}
            data={selectedNote}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Notes;
