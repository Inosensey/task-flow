"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

// Component
import Schedule from "./Schedule";

// Types
import { TableRow } from "@/Types/database.types";

// Utils
import { getCurrentDaySchedules } from "@/utils/getCurrentDaySchedules";
import { useHours } from "@/utils/useDate";

// Libs
import { getLocationCategories, getLocationKeys, getSchedules } from "@/lib/TanStackQueryFns";

// Store
import { useDateStore } from "@/store/useDateStore";

interface props {
  schedules: TableRow<"Schedules">[] | [];
  locationCategories: TableRow<"LocationCategories">[] | [],
  locationKeys: TableRow<"LocationKeys">[] | []
}

const Schedules = ({schedules, locationCategories, locationKeys}: props) => {
  const { dateSelected } = useDateStore();

  // Use query
  const {
    data: scheduleData
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
    initialData: schedules,
  });
   useQuery({
    queryKey: ["locationCategories"],
    queryFn: getLocationCategories,
    initialData: locationCategories,
  });
  useQuery({
    queryKey: ["locationKeys"],
    queryFn: getLocationKeys,
    initialData: locationKeys,
  });

  const currentDaySchedules = getCurrentDaySchedules(scheduleData, dateSelected);
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
          <Schedule scheduleData={scheduleData} />
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
