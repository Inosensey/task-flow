import React, { useState } from "react";

// Components
import Overlay from "./Overlay";

// Utils
import { getDateMonths, getDays, useMonths } from "@/utils/useDate";
import MaterialSymbolsLightKeyboardDoubleArrowLeftRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowLeftRounded";
import MaterialSymbolsLightKeyboardDoubleArrowRightRounded from "@/Icones/MaterialSymbolsLightKeyboardDoubleArrowRightRounded";

export default function CustomCalendar() {
  const date = new Date();
  let datesOfAMonth = getDateMonths({
    currentDate: date,
    selectedMonth: date.getMonth(),
  });
  const days = getDays();
  const months = useMonths();

  // States
  const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  const [monthDates, setMonthDates] = useState<number[]>(datesOfAMonth.dates);

  // Events
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
      datesOfAMonth = getDateMonths({
        currentDate: date,
        selectedMonth: currentMonth + 1,
      });
      setMonthDates(datesOfAMonth.dates);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
      datesOfAMonth = getDateMonths({
        currentDate: date,
        selectedMonth: currentMonth - 1,
      });
      setMonthDates(datesOfAMonth.dates);
    }
  };
  return (
    <Overlay>
      <div className="w-screen h-screen flex justify-center phone:mt-4 laptop:items-center">
        <div className="p-2 bg-Primary h-max phone:w-11/12">
          <div className="flex items-center justify-center gap-1 w-max">
            <MaterialSymbolsLightKeyboardDoubleArrowLeftRounded
              onClick={prevMonth}
              className="cursor-pointer"
              color="#fff"
            />
            <p className="select-none">{months[currentMonth]}</p>
            <MaterialSymbolsLightKeyboardDoubleArrowRightRounded
              onClick={nextMonth}
              className="cursor-pointer"
              color="#fff"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {monthDates.map((dates: number) => (
              <p className="select-none" key={dates}>
                {dates}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
