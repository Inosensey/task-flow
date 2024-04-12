// Types
import { TableRow } from "@/Types/database.types";
import { getCurrentDate } from "./useDate";

export const getCurrentDaySchedules = (
  schedules: TableRow<"Schedules">[] | null,
  date: string = ""
) => {
  const currentDate = date === "" ? getCurrentDate() : date;
  const currentDateSchedules: TableRow<"Schedules">[] = [];
  if (schedules) {
    schedules?.forEach((scheduleInfo: TableRow<"Schedules">) => {
      if (scheduleInfo.date === currentDate) {
        currentDateSchedules.push(scheduleInfo);
      }
    });
  }
  return currentDateSchedules;
};
