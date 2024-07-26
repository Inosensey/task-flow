"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCalendar,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import {
  formatHourTo12,
  formatSelectedDate,
  getCurrentDate,
  getCurrentDay,
  getDays,
  useHours,
} from "@/utils/useDate";
import DetailedSchedule from "./DetailedSchedule";

// Components
import ScheduleForm from "./ScheduleForm";

//types
import { TableRow } from "@/Types/database.types";

// Stpre
import { useFormStore } from "@/store/useFormStore";
import { useDateStore } from "@/store/useDateStore";
import NoData from "@/components/ReusableComponents/NoData";
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";

// Props
import { ScheduleDetails } from "@/Types/scheduleType";
type props = {
  scheduleData: ScheduleDetails[] | [];
};
type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

const Schedule = ({ scheduleData }: props) => {
  // Store
  const { setFormAction } = useFormStore();
  const { dateSelected } = useDateStore();

  const date = new Date(dateSelected);
  const days = getDays();

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

  return (
    <>
      <div className="flex-1">
        <div className="text-LightSecondary py-4 px-2 border-b-2 border-LightPrimary flex items-center phone:justify-between laptop:justify-start laptop:gap-6">
          <p className="select-none p-0 h-max">{days[date.getDay()]}</p>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowScheduleForm((prev) => !prev);
              setFormAction("add");
            }}
            className="bg-LightPrimary px-2 py-[3px] rounded-md text-sm flex items-center gap-1 select-none"
          >
            Add schedule
            <span className="w-4">
              <FontAwesomeIcon className="text-sm" icon={faCirclePlus} />
            </span>
          </motion.button>
        </div>

        {/* Desktop */}
        <div className="flex flex-col phone:hidden laptop:flex">
          {scheduleData?.length !== 0 ? (
            scheduleData?.map((info: ScheduleDetails, index: number) => (
              <div key={info.id} className="px-2 flex mt-2">
                <div className="w-max justify-start flex flex-col text-lg text-right px-2">
                  <p className="flex justify-end gap-1">
                    <span className="w-4">
                      <FontAwesomeIcon
                        className="text-lg text-LightPrimary"
                        icon={faCalendar}
                      />
                    </span>
                    {getCurrentDay(info.date!)}
                  </p>
                  <div className="w-full flex items-center gap-1 justify-end">
                    <span className="w-4">
                      <FontAwesomeIcon
                        className="text-lg text-LightPrimary"
                        icon={faClock}
                      />
                    </span>
                    <div className="flex gap-1 text-base">
                      <p>{formatHourTo12(info.timeStart)}</p>
                      {info.timeEnd !== "" && (
                        <span className="w-4">
                          <FontAwesomeIcon
                            className="text-base"
                            icon={faArrowRight}
                          />
                        </span>
                      )}
                      <p className="text-base">
                        {formatHourTo12(info.timeEnd)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-LightPrimary px-2">
                  <div>
                    <p className="text-LightPrimary text-lg font-bold">
                      {info.title}
                    </p>
                    <p className="text-base text-justify leading-5">
                      {info.description}
                    </p>
                  </div>
                  <div className="font-semibold text-base text-LightSecondary">
                    <p className="flex items-end">
                      <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                      {info.ScheduleLocation[0].namePlace},
                    </p>
                    <p className="flex items-end">
                      <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                      {info.ScheduleLocation[0].city}
                    </p>
                  </div>
                  <Link href={`/dashboard/schedules/${info.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowDetailedSchedule((prev) => !prev);
                        setSelectedSchedule(info);
                      }}
                      className="cursor-pointer mt-4 bg-Secondary rounded-md text-LightSecondary phone:text-sm phone:w-28 phone:py-1"
                    >
                      More Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <NoData
              setShowForm={setShowScheduleForm}
              ButtonName="Add schedule"
            />
          )}
        </div>

        {/* Mobile */}
        <div className="flex-wrap items-center justify-between px-2 gap-2 mt-2 phone:flex laptop:hidden">
          {scheduleData?.length !== 0 ? (
            scheduleData?.map((info: TableRow<"Schedules">, index: number) => (
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
            ))
          ) : (
            <NoData
              setShowForm={setShowScheduleForm}
              ButtonName="Add schedule"
            />
          )}
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
