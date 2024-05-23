"use client";

import React, { useState } from "react";

import styles from "@/css/DashboardComponent/Events.module.css";

// Icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";

// Utils
import getDate, {
  getDays,
  useMonths,
  getDateMonths,
  getCurrentDate,
  formatSelectedDate,
} from "@/utils/useDate";

// Types
interface dateType {
  date: number;
  day: number;
  month: number;
  year: number;
}

// store
import { useDateStore } from "@/store/useDateStore";
import CustomCalendar from "@/components/ReusableComponents/CustomCalendar";
import { AnimatePresence } from "framer-motion";
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";

const CalendarNav = () => {
  const date = new Date();
  const months = useMonths();
  const daysList = getDays();
  const datesOfAMonth = getDateMonths({
    currentDate: new Date(),
    selectedMonth: date.getMonth(),
  });
  const { setDate, dateSelected } = useDateStore();

  // States
  const [days, setDays] = useState<string[]>(daysList);
  const [datesOfMonth, setDatesOfMonth] = useState<string[]>(
    datesOfAMonth.formattedDates
  );
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [showDateList, setShowDateList] = useState<boolean>(false);
  const [showCustomCalendar, setShowCustomCalendar] = useState<boolean>(false);

  const setSelectedDate = (dateNumber: number = 0) => {
    const date = new Date();
    date.setMonth(currentMonth);
    date.setDate(dateNumber + 1);
    const dateSelected = getCurrentDate(date);
    setDate(dateSelected);
  };

  return (
    <>
      <div className="flex text-LightSecondary items-center gap-2 border-b-2 border-LightPrimary w-full h-14 px-2">
        <div className="relative">
          <div
            onClick={() => {
              setShowMonthList((prev) => !prev);
            }}
            className="rounded-md bg-SmoothDark flex justify-between px-2 items-center cursor-pointer phone:w-40 phone:h-9 mdphone:w-44"
          >
            <p className="select-none text-sm">{months[currentMonth]}</p>
            <span
              className="transition-all"
              style={{
                transform: showMonthList ? "rotate(-90deg)" : "rotate(0deg)",
              }}
            >
              <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
            </span>
          </div>
          <div
            style={{ maxHeight: showMonthList ? "224px" : "0px" }}
            className="phone:text-sm transition-all rounded-md absolute top-10 bg-SmoothDark overflow-auto z-[100] phone:w-40 mdphone:w-44"
          >
            {months.map((month, index) => (
              <div
                onClick={() => {
                  const getDateOfMonth = getDateMonths({
                    currentDate: date,
                    selectedMonth: index,
                  });
                  setCurrentMonth(index);
                  setShowMonthList(false);
                  setSelectedDate();
                  setDatesOfMonth(getDateOfMonth.formattedDates);
                }}
                key={index}
                className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer"
              >
                <p className="select-none">{month}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setShowDateList((prev) => !prev);
            }}
            className="rounded-md bg-SmoothDark flex justify-between px-2 items-center cursor-pointer phone:w-40 mdphone:w-44 phone:h-9"
          >
            <p className="select-none text-sm">
              {formatSelectedDate(dateSelected)}
            </p>
            <span
              className="transition-all"
              style={{
                transform: showDateList ? "rotate(-90deg)" : "rotate(0deg)",
              }}
            >
              <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
            </span>
          </div>
          <div
            style={{ maxHeight: showDateList ? "224px" : "0px" }}
            className="transition-all rounded-md absolute top-10 bg-SmoothDark overflow-auto z-[100] phone:w-40 mdphone:w-44 phone:text-sm"
          >
            {datesOfMonth.map((date, index) => (
              <div
                onClick={() => {
                  setSelectedDate(index);
                  setShowDateList(false);
                }}
                key={index}
                className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer"
              >
                <p className="select-none">{date}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowCustomCalendar((prev) => !prev)}
            className="bg-SmoothDark px-4 py-[8px] rounded-md text-sm flex items-center gap-1 select-none"
          >
            Set Date
            <MaterialSymbolsCalendarMonthOutlineRounded color="#fff" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showCustomCalendar && (
          <CustomCalendar setShowCustomCalendar={setShowCustomCalendar} />
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarNav;
