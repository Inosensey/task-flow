import React, { useEffect, useState } from "react";

// Components
import Overlay from "./Overlay";

// Utils
import {
  getDateMonths,
  getDays,
  useMonths,
  getCalendarDates,
  getCurrentDate,
} from "@/utils/useDate";
import MaterialSymbolsLightKeyboardDoubleArrowLeftRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowLeftRounded";
import MaterialSymbolsLightKeyboardDoubleArrowRightRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowRightRounded";

// Stores
import { useDateStore } from "@/store/useDateStore";

// Types
interface props {
  setShowCustomCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}
type calendarDate = {
  date: number;
  status: string;
};

export default function CustomCalendar({ setShowCustomCalendar }: props) {
  // Store
  const { setDate, dateSelected } = useDateStore();

  const date = new Date(dateSelected);
  const months = useMonths();

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
  const dateHandler = (selectedDate: number) => {
    const newDate = new Date(date);
    newDate.setDate(selectedDate);
    const formattedDaTe = getCurrentDate(newDate);
    setDate(formattedDaTe);
    setCurrentDate(selectedDate);
    setShowCustomCalendar((prev) => !prev);
  };

  useEffect(() => {
    setMonthDates(getCalendarDates());
  }, []);
  return (
    <Overlay>
      <div
        onClick={() => setShowCustomCalendar((prev) => !prev)}
        className="w-screen h-screen flex justify-center phone:mt-4 laptop:items-center "
      >
        <div className="p-3 bg-Primary h-max rounded-lg phone:w-[95%]">
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
            <div className="flex gap-1 flex-wrap text-center phone:text-sm laptop:text-base">
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Sun
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Mon
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Tue
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Wed
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Thu
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Fri
              </p>
              <p className="select-none  phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)]">
                Sat
              </p>
            </div>
            <div className="flex gap-1 flex-wrap text-center">
              {monthDates.map((calendarDate: calendarDate) => (
                <p
                  onClick={(event) => {
                    event.stopPropagation()
                    dateHandler(calendarDate.date);
                  }}
                  style={{
                    pointerEvents:
                      calendarDate.status === "inactive" ? "none" : "all",
                    color:
                      calendarDate.status === "inactive" ? "#b3b3b3" : "#fff",
                    cursor: calendarDate.status === "inactive" ? "" : "pointer",
                    background:
                      currentDate === calendarDate.date &&
                      calendarDate.status === "active"
                        ? "#393E46"
                        : "",
                  }}
                  className="select-none py-2 border-2 rounded-lg border-Secondary hover:bg-Secondary phone:text-sm phone:w-[calc(100%/8)] laptop:w-[calc(90%/7)] laptop:text-sm"
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
