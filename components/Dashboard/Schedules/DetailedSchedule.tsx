"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDoubleLeft,
  faArrowRight,
  faCheck,
  faXmark,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Import components
import ScheduleForm from "./ScheduleForm";
import DisplayMap from "@/components/ReusableComponents/DisplayMap";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";

// Utils
import { formatHourTo12, formatSelectedDate } from "@/utils/useDate";

// Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// Types
import { TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";
import {
  getScheduleDetails,
  getScheduleNotes,
  getSchedules,
  getTodoList,
} from "@/lib/TanStackQueryFns";
import { noteType } from "@/Types/noteTypes";
import { DisplayNotes } from "@/components/ReusableComponents/DisplayNotes";
import NoteForm from "../Notes/NoteForm";
type props = {
  scheduleId: string;
  scheduleInfo?: TableRow<"Schedules">;
  setShowPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  details: reactQueryType;
  notes: noteType[];
};
type mapAttrInfo = {
  width: string;
  height: string;
  lon: string;
  lat: string;
  iconType: string;
};
interface reactQueryType {
  schedule: ScheduleDetails[];
}

const DetailedSchedule = ({ details, scheduleId, notes }: props) => {
  const scheduleDate = new Date(details.schedule[0].date!);

  // Use query
  const { data: data } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(parseInt(scheduleId)),
    initialData: details,
  });
  const { data: noteList } = useQuery({
    queryKey: [`ScheduleNotes#${scheduleId}`],
    queryFn: () => getScheduleNotes(parseInt(scheduleId)),
    initialData: notes,
  });

  // Store
  const { setFormAction } = useScheduleFormStore();

  // State
  const [mapToggle, setMapToggle] = useState<boolean>(false);
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);

  const [noteFormAction, setNoteFormAction] = useState<string>("Add");
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<noteType | undefined>(
    undefined
  );

  const detailsData = data as unknown as reactQueryType;
  const locationDetails = detailsData.schedule[0].ScheduleLocation[0];

  const mapAttrInfo: mapAttrInfo = {
    height: "400",
    width: "600",
    lon: locationDetails.long,
    lat: locationDetails.lat,
    iconType: "landmark",
  };

  // Variants
  const popUpVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  return (
    <>
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary relative p-3 phone:w-full phone:h-full"
      >
        <Link href={`/dashboard/schedules`}>
          <motion.button
            className="text-base text-LightPrimary w-max px-3 py-[0.3rem] rounded-md flex gap-1 items-center"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon className="text-sm" icon={faAngleDoubleLeft} />
            Schedules
          </motion.button>
        </Link>
        <div className="mt-2 mx-auto flex flex-col phone:w-11/12 laptop:max-w-[500px]">
          <div className=" flex flex-col gap-2">
            <div className="p-2 bg-Secondary rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-LightPrimary font-semibold text-base">
                  {detailsData.schedule[0].title}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-LightPrimary w-max px-4 py-[0.2rem] rounded-md flex gap-1 text-[0.8rem]"
                  onClick={() => {
                    setShowScheduleForm((prev) => !prev);
                    setFormAction("edit");
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
              <div className="phone:w-10/12 flex items-center gap-1 text-sm">
                <span className="w-4">
                  <FontAwesomeIcon
                    className="text-sm text-LightPrimary"
                    icon={faCalendarAlt}
                  />
                </span>
                <p>
                  {formatSelectedDate(details.schedule[0].date!)}{" "}
                  {scheduleDate.getFullYear()}
                </p>
              </div>
              <div className="phone:w-10/12 flex items-center gap-1">
                <span className="w-4">
                  <FontAwesomeIcon
                    className="text-sm text-LightPrimary"
                    icon={faClock}
                  />
                </span>
                <div className="flex gap-1 text-sm">
                  <p>{formatHourTo12(detailsData.schedule[0].timeStart)}</p>
                  {detailsData.schedule[0].timeEnd !== "" && (
                    <span className="w-4">
                      <FontAwesomeIcon
                        className="text-sm"
                        icon={faArrowRight}
                      />
                    </span>
                  )}
                  <p>{formatHourTo12(detailsData.schedule[0].timeEnd)}</p>
                </div>
              </div>
              <div>
                <p className="text-[0.9rem] font-semibold">Description:</p>
                <p className="text-sm text-justify leading-5">
                  {detailsData.schedule[0].description}
                </p>
              </div>
            </div>
            <div className="p-2 bg-Secondary rounded-md">
              <p className="text-LightPrimary font-semibold text-base">
                Location:
              </p>
              <div className="font-semibold text-sm text-LightSecondary">
                <p className="flex items-center">
                  <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                  {locationDetails.namePlace},
                </p>
                <p className="flex items-center">
                  <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                  {locationDetails.city}
                </p>
              </div>
              <motion.button
                className="text-xs bg-LightPrimary w-max px-3 py-[0.2rem] rounded-md flex gap-1 mt-3"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setMapToggle((prev) => !prev);
                }}
              >
                View Map
              </motion.button>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-11/12 mx-auto"></div>
        <DisplayNotes
          setSelectedNote={setSelectedNote}
          setShowNoteForm={setShowNoteForm}
          notes={noteList}
          setNoteFormAction={setNoteFormAction}
        />
      </motion.div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {mapToggle && (
          <DisplayMap setMapToggle={setMapToggle} mapAttrInfo={mapAttrInfo} />
        )}
        {showScheduleForm && (
          <ScheduleForm
            setShowScheduleForm={setShowScheduleForm}
            scheduleId={scheduleId}
            scheduleData={detailsData.schedule}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showNoteForm && (
          <NoteForm
            setShowNoteForm={setShowNoteForm}
            action={noteFormAction}
            data={selectedNote}
            selectedSchedule={detailsData}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailedSchedule;
