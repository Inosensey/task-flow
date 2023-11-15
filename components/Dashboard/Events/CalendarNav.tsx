"use client";

import React, { useState } from "react";

import styles from "@/css/DashboardComponent/Events.module.css";

// Icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";

// Utils
import getDate, { useDays, useMonths, useDateMonths } from "@/utils/useDate";

// Types
interface dateType {
  date: number;
  day: number;
  month: number;
  year: number;
}

const CalendarNav = () => {
  const date = new Date();
  const months = useMonths();
  const datesOfAMonth = useDateMonths({
    currentDate: date,
    selectedMonth: date.getMonth(),
  });
  const { result } = getDate({ date: new Date() });

  // States
  const [dates, setDates] = useState<dateType[]>(result);
  const [datesOfMonth, setDatesOfMonth] = useState<string[]>(datesOfAMonth);
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [showDateList, setShowDateList] = useState<boolean>(false);

  // Update date
  const updateDate = (newDate: Date) => {
    const { result } = getDate({ date: newDate });
    setDates(result);
  };

  // Change month
  const onChangeDate = (action: string) => {
    const newDate = new Date();
    if (action === "next") {
      if (currentMonth !== 11) {
        setCurrentMonth((prev) => prev + 1);
        newDate.setMonth(currentMonth + 1);
        updateDate(newDate);
      } else {
        // Changed year if the current month is in december
        newDate.setFullYear(currentYear + 1);
        newDate.setMonth(0);
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
        updateDate(newDate);
      }
    } else {
      if (currentMonth !== 0) {
        setCurrentMonth((prev) => prev - 1);
        newDate.setMonth(currentMonth - 1);
        updateDate(newDate);
      } else {
        // Change year if the current month is in january
        newDate.setFullYear(currentYear - 1);
        newDate.setMonth(11);
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
        updateDate(newDate);
      }
    }
  };
  console.log(dates);
  return (
    <div className="flex items-center gap-2 border-b-2 border-LightPrimary w-full h-14 px-2">
      <div className="relative">
        <div
          onClick={() => {
            setShowMonthList((prev) => !prev);
          }}
          className="phone:w-44 phone:h-9 rounded-md bg-SmoothDark flex justify-between px-2 items-center cursor-pointer"
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
          className="phone:w-44 phone:text-sm transition-all rounded-md absolute top-10 bg-SmoothDark overflow-auto"
        >
          {months.map((month, index) => (
            <div
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
          className="phone:w-44 phone:h-9 rounded-md bg-SmoothDark flex justify-between px-2 items-center cursor-pointer"
        >
          <p className="select-none text-sm">Select Date</p>
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
          className="phone:w-44 phone:text-sm transition-all rounded-md absolute top-10 bg-SmoothDark overflow-auto"
        >
          {datesOfMonth.map((date, index) => (
            <div
              key={index}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer"
            >
              <p className="select-none">{date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarNav;
