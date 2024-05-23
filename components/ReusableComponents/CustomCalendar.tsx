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

// Stores
import { useDateStore } from "@/store/useDateStore";

// Types
type calendarDate = {
  date: number;
  status: string;
};
  const date = new Date();
  const datesOfAMonth = getDateMonths({
    currentDate: new Date(),
    selectedMonth: date.getMonth(),
  });
  const days = getDays();

export default function CustomCalendar() {
  const months = useMonths();

  // Store
  const { dateSelected } = useDateStore();

  // States
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [monthDates, setMonthDates] = useState<calendarDate[]>([]);
  const [currentDate, setCurrentDate] = useState<number>(date.getDate()); 

  // Events
  const nextMonth = () => {
    if (currentMonth < 12) {
      date.setMonth(currentMonth + 1);
      const calendarDates = getCalendarDates(date);
      setCurrentMonth((prev) => prev + 1);
      setMonthDates(calendarDates);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 1) {
      date.setMonth(currentMonth - 1);
      const calendarDates = getCalendarDates(date);
      setCurrentMonth((prev) => prev - 1);
      setMonthDates(calendarDates);
    }
  };
  useEffect(() => {
  
    setMonthDates(getCalendarDates());
  }, []);
  return (
    <Overlay>
      <div className="w-screen h-screen flex justify-center phone:mt-4 laptop:items-center ">
        <div className="p-4 bg-Primary h-max rounded-lg phone:w-11/12">
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
          <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-1 flex-wrap text-center">
            <p className="select-none w-[calc(90%/7)]">Sun</p>
            <p className="select-none w-[calc(90%/7)]">Mon</p>
            <p className="select-none w-[calc(90%/7)]">Tue</p>
            <p className="select-none w-[calc(90%/7)]">Wed</p>
            <p className="select-none w-[calc(90%/7)]">Thu</p>
            <p className="select-none w-[calc(90%/7)]">Fri</p>
            <p className="select-none w-[calc(90%/7)]">Sat</p>
          </div>
          <div className="flex gap-1 flex-wrap text-center">
            {monthDates.map((calendarDate: calendarDate) => (
              <p
                style={{
                  color:
                    calendarDate.status === "inactive" ? "#b3b3b3" : "#fff",
                  cursor:
                    calendarDate.status === "inactive" ? "" : "pointer",
                  background: currentDate === calendarDate.date ? "#393E46" : ""
                }}
                className="select-none w-[calc(90%/7)] border-2 rounded-lg border-Secondary hover:bg-Secondary py-2"
                key={Math.random() * 1000}
              >
                {calendarDate.date}
              </p>
            ))}
          </div>

          </div>
        </div>
      </div>
    </Overlay>
  );
}
