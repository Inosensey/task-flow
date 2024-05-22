import React, { useEffect, useState } from "react";

// Components
import Overlay from "./Overlay";

// Utils
import {
  getDateMonths,
  getDays,
  useMonths,
  getCalendarDates,
} from "@/utils/useDate";
import MaterialSymbolsLightKeyboardDoubleArrowLeftRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowLeftRounded";
import MaterialSymbolsLightKeyboardDoubleArrowRightRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowRightRounded";

export default function CustomCalendar() {
  const date = new Date();
  const datesOfAMonth = getDateMonths({
    currentDate: new Date(),
    selectedMonth: date.getMonth(),
  });
  const days = getDays();
  const months = useMonths();

  // States
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [monthDates, setMonthDates] = useState<number[]>([]);

  // Events
  const nextMonth = () => {
    if (currentMonth < 12) {
      date.setMonth(currentMonth);
      console.log(date);
      const calendarDates = getCalendarDates(date);
      setCurrentMonth((prev) => prev + 1);
      setMonthDates(calendarDates);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 1) {
      date.setMonth(currentMonth);
      const calendarDates = getCalendarDates(date);
      setCurrentMonth((prev) => prev - 1);
      setMonthDates(calendarDates);
    }
  };
  useEffect(() => {
    setMonthDates(getCalendarDates())
  },[])
  return (
    <Overlay>
      <div className="w-screen h-screen flex justify-center phone:mt-4 laptop:items-center">
        <div className="p-2 bg-Primary h-max phone:w-11/12">
          <div className="flex items-center justify-between gap-1 w-full">
            <p className="select-none">{months[currentMonth]}</p>
            <div className="flex items-center w-max">
              <MaterialSymbolsLightKeyboardDoubleArrowLeftRounded
                onClick={prevMonth}
                className="cursor-pointer"
                color="#fff"
              />
              <MaterialSymbolsLightKeyboardDoubleArrowRightRounded
                onClick={nextMonth}
                className="cursor-pointer"
                color="#fff"
              />
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            <p className="select-none w-[calc(100%/8)]">Sun</p>
            <p className="select-none w-[calc(100%/8)]">Mon</p>
            <p className="select-none w-[calc(100%/8)]">Tue</p>
            <p className="select-none w-[calc(100%/8)]">Wed</p>
            <p className="select-none w-[calc(100%/8)]">Thu</p>
            <p className="select-none w-[calc(100%/8)]">Fri</p>
            <p className="select-none w-[calc(100%/8)]">Sat</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {monthDates.map((dates: number) => (
              <p
                className="select-none w-[calc(100%/8)]"
                key={Math.random() * 1000}
              >
                {dates}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
