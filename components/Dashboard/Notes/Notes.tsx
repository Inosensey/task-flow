"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Components
import { CheckBoxInput } from "@/components/ReusableComponents/inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Libs
import {
  getNoteTypes,
  getNotes,
  getSchedules,
  getTodoList,
} from "@/lib/TanStackQueryFns";

// Icons
import { faCirclePlus, faClock } from "@fortawesome/free-solid-svg-icons";
import NoteForm from "./NoteForm";

//Types
import { TableInsert, TableRow } from "@/Types/database.types";
import { todoListResponseInterface } from "@/Types/todoListTypes";
interface props {
  schedules: TableRow<"Schedules">[] | [];
  todoList: todoListResponseInterface;
  notes:
    | (TableInsert<"Notes"> & { Schedules: TableRow<"Schedules"> } & {
        TodoList: TableRow<"TodoList">;
      } & { NoteType: TableRow<"NoteType"> }[])
    | [];
  noteTypes: TableRow<"NoteType">[] | [];
}

const Notes = ({ notes, schedules, todoList, noteTypes }: props) => {
  // Use query
  const { data: scheduleData } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
    initialData: schedules,
  });
  const { data: todoListsData } = useQuery({
    queryKey: ["todolists"],
    queryFn: getTodoList,
    initialData: todoList,
  });
  const { data: notesData } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    initialData: notes,
  });
  const { data: noteTypesData } = useQuery({
    queryKey: ["noteTypes"],
    queryFn: getNoteTypes,
    initialData: noteTypes,
  });

  console.log(notesData);

  // States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filters] = useState<Array<string>>(["All", "Schedules", "Todo-List"]);
  const [selectedNote, setSelectedNote] = useState<
    | (TableInsert<"Notes"> & { Schedules: TableRow<"Schedules"> } & {
        TodoList: TableRow<"TodoList">;
      } & { NoteType: TableRow<"NoteType"> })
    | undefined
  >(undefined);

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
            }}
            className="bg-LightPrimary px-2 py-[3px] rounded-md text-sm flex items-center gap-1"
          >
            Add Notes
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
          {notesData?.map(
            (
              info: TableRow<"Notes"> & { Schedules: TableRow<"Schedules"> } & {
                TodoList: TableRow<"TodoList">;
              } & { NoteType: TableRow<"NoteType"> },
              index: number
            ) => (
              <div
                key={index}
                className="bg-SmoothDark p-3 flex flex-col gap-1 rounded-lg text-LightSecondary mdphone:w-[49%]"
              >
                <p className="font-semibold ">
                  {info.Schedules ? "Schedule:" : "Todo:"}{" "}
                </p>
                <p className="font-semibold text-sm">{info.Schedules.title}</p>
                <div className="w-full h-20 line-clamp-4 text-sm">
                  <p className="font-semibold ">Note:</p>
                  <p>{info.note}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedNote(info);
                    setFormAction("Edit");
                    setShowNoteForm((prev) => !prev);
                    //   setShowDetailedSchedule((prev) => !prev);
                    //   setSelectedSchedule(info);
                  }}
                  className="cursor-pointer bg-Secondary rounded-md text-LightSecondary mt-2 phone:text-sm phone:w-28 phone:py-1"
                >
                  More Details
                </motion.button>
              </div>
            )
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
