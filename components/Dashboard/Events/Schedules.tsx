import React from "react";

import styles from "@/css/DashboardComponent/events.module.css";

import { useHours } from "@/utils/useDate";
import Schedule from "./Schedule";

const Schedules = () => {
  const hours = useHours();
  return (
    <div className="border-1 w-full flex">
      <div className="phone:w-3/12 border-r-2 border-LightPrimary">
        <p className="py-4 px-2 font-semibold border-b-2 border-LightPrimary">Time</p>
        <div className="flex flex-col">
          {hours.map((hour: string, index: number) => (
            <div className="h-28 flex items-center" key={index}>
              <p className="px-2 text-sm">{hour}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1">
        <Schedule date="Monday" />
        {/* <Schedule date="Tuesday" /> */}
      </div>
    </div>
  );
};

export default Schedules;
