"use client";

import React, { useState } from "react";

import styles from "@/css/DashboardComponent/Events.module.css";

// Icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";

// Utils
import getDate, { getDays, useMonths, getDateMonths, getCurrentDate } from "@/utils/useDate";

// Types
interface dateType {
  date: number;
  day: number;
  month: number;
  year: number;
}

// store
import {useDateStore} from "@/store/useDateStore";

const CalendarNav = () => {
  const date = new Date();
  const months = useMonths();
  const daysList = getDays();
  const datesOfAMonth = getDateMonths({
    currentDate: new Date(),
    selectedMonth: date.getMonth(),
  });
  const {setDate} = useDateStore();

  // States
  const [days, setDays] = useState<string[]>(daysList);
  const [datesOfMonth, setDatesOfMonth] = useState<string[]>(datesOfAMonth);
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [showDateList, setShowDateList] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  const setSelectedDate = (dateNumber: number = 0):string => {
    const date = new Date();
    date.setMonth(currentMonth);
    date.setDate(dateNumber + 1);
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const dateSelected = getCurrentDate(date)
    setCurrentDate(`${dayOfMonth}, ${days[dayOfWeek]}`);
    setDate(dateSelected)
    return `${dayOfMonth}, ${days[dayOfWeek]}`
  };

  return (
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
                setSelectedDate()
                setDatesOfMonth(getDateOfMonth);
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
          <p className="select-none text-sm">{currentDate === "" ? setSelectedDate(date.getDate() - 1) : currentDate}</p>
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
    </div>
  );
};

export default CalendarNav;
