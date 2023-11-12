"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";

// Utils
import getDate, { useDays, useMonths } from "@/utils/useDate";
import Header from "./Header";

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
  const { result } = getDate({ date: new Date() });

  // States
  const [dates, setDates] = useState<dateType[]>(result);
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());

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
    <div>
      <div className="flex items-center gap-2 border-b-2 border-LightPrimary w-full h-14 px-2 ">
        <span
          className="flex select-none"
          onClick={() => {
            onChangeDate("prev");
          }}
        >
          <FontAwesomeIcon
            className="cursor-pointer text-2xl"
            icon={faCircleLeft}
          />
        </span>
        <p className="phone:text-sm select-none">
          {months[currentMonth]}, {currentYear}
        </p>
        <span
          className="flex select-none"
          onClick={() => {
            onChangeDate("next");
          }}
        >
          <FontAwesomeIcon
            className="cursor-pointer text-2xl"
            icon={faCircleRight}
          />
        </span>
      </div>
    </div>
  );
};

export default CalendarNav;
