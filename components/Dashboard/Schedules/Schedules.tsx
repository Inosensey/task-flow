"use client";

import React from "react";
import { useQuery, useMutationState } from "@tanstack/react-query";

import { useHours } from "@/utils/useDate";
import Schedule from "./Schedule";
import styles from "@/css/DashboardComponent/events.module.css";

// Types
import { TableInsert, TableRow, TableUpdate } from "@/Types/database.types";

type props = {
  schedules: TableRow<"Schedules">[] | null,
  currentDaySchedules: TableRow<"Schedules">[] | null
}

type ScheduleInfo = TableRow<"Schedules">;

const Schedules = ({currentDaySchedules, schedules}:props) => {
  const hours = useHours();
  return (
    <div className="w-full flex">
      {/* desktop */}
      <div className="w-full flex phone:hidden laptop:block">
        <div className="border-r-2 border-LightPrimary phone:w-3/12">
          <p className="py-4 px-2 font-semibold border-b-2 border-LightPrimary">
            Time
          </p>
          <div className="flex flex-col">
            {hours.map((hour: string, index: number) => (
              <div
                className="phone:h-20 mdphone:h-24 flex items-center"
                key={index}
              >
                <p className="px-2 text-sm">{hour}</p>
              </div>
            ))}
          </div>
          d
        </div>
        <div className="flex flex-1">
          <Schedule scheduleData={schedules} />
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full flex phone:flex laptop:hidden">
        <Schedule scheduleData={currentDaySchedules} />
      </div>
    </div>
  );
};

export default Schedules;
