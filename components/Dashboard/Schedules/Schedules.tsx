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
import {
  getLocationCategories,
  getLocationKeys,
  getSchedules,
} from "@/lib/TanStackQueryFns";

// Store
import { useDateStore } from "@/store/useDateStore";

import { ScheduleDetails } from "@/Types/scheduleType";
interface props {
  schedules: ScheduleDetails[] | [];
  locationCategories: TableRow<"LocationCategories">[] | [];
  locationKeys: TableRow<"LocationKeys">[] | [];
}

const Schedules = ({ schedules, locationCategories, locationKeys }: props) => {
  const { dateSelected } = useDateStore();

  // Use query
  const { data: scheduleData } = useQuery({
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

  const currentDaySchedules:ScheduleDetails[] | [] = getCurrentDaySchedules(
    scheduleData,
    dateSelected
  );
  const hours = useHours();
  return (
    <div className="w-full flex">
      {/* desktop */}
      <div className="w-full flex phone:hidden laptop:block">
        <Schedule scheduleData={currentDaySchedules} />
      </div>

      {/* Mobile */}
      <div className="w-full flex phone:flex laptop:hidden">
        <Schedule scheduleData={currentDaySchedules} />
      </div>
    </div>
  );
};

export default Schedules;
