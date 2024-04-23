"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import { formatHourTo12, useDays, useHours } from "@/utils/useDate";
import DetailedSchedule from "./DetailedSchedule";

// Components
import ScheduleForm from "./ScheduleForm";

//types
import { TableRow } from "@/Types/database.types";

// Stpre
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// Props
type props = {
  scheduleData: TableRow<"Schedules">[] | null;
};
type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

const Schedule = ({ scheduleData }: props) => {
  const date = new Date();
  const days = useDays();

  // Store
  const { setFormAction } = useScheduleFormStore();

  // States
  const [timeHeightNumber, setTimeHeightNumber] = useState<number>(0);
  const [showDetailedSchedule, setShowDetailedSchedule] =
    useState<boolean>(false);
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<
    TableRow<"Schedules">
  >({
    created_at: "",
    date: "",
    description: "",
    id: 0,
    themeColor: "",
    timeEnd: "",
    timeStart: "",
    title: "",
    userId: null,
  });
  const [currentDate, setCurrentDate] = useState<string>(days[date.getDay()]);

  useEffect(() => {
    if (window.innerWidth > 420) {
      setTimeHeightNumber(96);
    }
    if (window.innerWidth > 280) {
      setTimeHeightNumber(96);
    }
  }, []);
  const hours = useHours();
  return (
    <>
      <div className="flex-1">
        <div className="text-LightSecondary py-4 px-2 border-b-2 border-LightPrimary flex justify-between items-center">
          <p className="p-0 h-max">{currentDate}</p>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowScheduleForm((prev) => !prev);
              setFormAction("add");
            }}
            className="bg-LightPrimary px-2 py-[3px] rounded-md text-sm flex items-center gap-1"
          >
            Add schedule
            <span className="w-4">
              <FontAwesomeIcon className="text-sm" icon={faCirclePlus} />
            </span>
          </motion.button>
        </div>

        {/* Desktop */}
        <div className="flex flex-col pl-2 phone:hidden laptop:flex">
          {hours.map((hour, index: number) => (
            <div
              className="flex relative justify-center phone:h-20 mdphone:h-24"
              key={index}
            >
              {scheduleData?.map(
                (info: TableRow<"Schedules">, index: number) => {
                  if (info.timeStart === hour) {
                    const height = timeHeightNumber;
                    return (
                      <div
                        style={{ height: `${height}px` }}
                        className={`absolute flex items-center px-2 border-l-2 border-LightPrimary w-full rounded-2xl`}
                        key={index}
                      >
                        <div className="flex flex-col gap-1 bg-[#1a1a1a] rounded-lg w-full p-2 z-40">
                          <div className="flex text-LightSecondary phone:text-sm phone:flex-col phone:items-start mdphone:gap-3 mdphone:flex-row mdphone:items-center">
                            <p>{info.title}</p>
                            <div className="phone:w-10/12 flex items-center gap-1">
                              <span className="w-4">
                                <FontAwesomeIcon
                                  className="text-sm text-LightPrimary"
                                  icon={faClock}
                                />
                              </span>
                              <div className="flex gap-1 text-sm">
                                <p>{info.timeStart}</p>
                                {info.timeEnd !== "" && (
                                  <span className="w-4">
                                    <FontAwesomeIcon
                                      className="text-sm"
                                      icon={faArrowRight}
                                    />
                                  </span>
                                )}
                                <p>{info.timeEnd}</p>
                              </div>
                            </div>
                          </div>
                          <button className="cursor-pointer bg-Secondary phone:text-sm rounded-md text-LightSecondary phone:w-32 phone:py-1">
                            More Details
                          </button>
                        </div>
                      </div>
                    );
                  }
                }
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-wrap items-center justify-between px-2 gap-2 mt-2 ">
          {scheduleData?.map((info: TableRow<"Schedules">, index: number) => (
            <div
              key={index}
              className="bg-SmoothDark p-3 flex flex-col gap-2 rounded-lg text-LightSecondary mdphone:w-[49%]"
            >
              <div className="phone:w-10/12 flex items-center gap-1">
                <span className="w-4">
                  <FontAwesomeIcon
                    className="text-sm text-LightPrimary"
                    icon={faClock}
                  />
                </span>
                <div className="flex gap-1 text-sm">
                  <p>{formatHourTo12(info.timeStart)}</p>
                  {info.timeEnd !== "" && (
                    <span className="w-4">
                      <FontAwesomeIcon
                        className="text-sm"
                        icon={faArrowRight}
                      />
                    </span>
                  )}
                  <p>{formatHourTo12(info.timeEnd)}</p>
                </div>
              </div>
              <p className="font-semibold">{info.title}</p>
              <div className="w-full h-20 line-clamp-4">
                <p className="text-sm">{info.description}</p>
              </div>
              <Link href={`/dashboard/schedules/${info.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowDetailedSchedule((prev) => !prev);
                    setSelectedSchedule(info);
                  }}
                  className="cursor-pointer bg-Secondary rounded-md text-LightSecondary phone:text-sm phone:w-28 phone:py-1"
                >
                  More Details
                </motion.button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Detailed Schedule */}
      {/* <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showDetailedSchedule && (
          <DetailedSchedule
            setShowPopUp={setShowDetailedSchedule}
            scheduleInfo={selectedSchedule}
          />
        )}
      </AnimatePresence> */}

      {/* Schedule form */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showScheduleForm && (
          <ScheduleForm
            setShowScheduleForm={setShowScheduleForm}
            scheduleId={null}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Schedule;
