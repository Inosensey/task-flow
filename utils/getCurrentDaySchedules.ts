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

export const getCurrentWeekSchedules = (
  schedules: TableRow<"Schedules">[] | null
):TableRow<"Schedules">[]|[] => {
  const weekRange: { currentDate: string; endDate: string } = getWeekRange();
  let currentWeekSchedules: TableRow<"Schedules">[]
  if (schedules !== null) {
    currentWeekSchedules = schedules.filter(
      (schedule: TableRow<"Schedules">) =>
        schedule.date! >= weekRange.currentDate &&
        schedule.date! <= weekRange.endDate
    );
    return currentWeekSchedules;
  }
  return [];
};

function getWeekRange(): { currentDate: string; endDate: string } {
  let currentDate: Date | string = new Date();
  let endDate: Date | string;
  let formattedCurrentDate: string;
  let formattedEndDate: string;

  endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 6);
  currentDate = formatDate(currentDate)
  endDate = formatDate(endDate);
  formattedCurrentDate = currentDate;
  formattedEndDate = endDate;
  return {
    currentDate: currentDate,
    endDate: endDate,
  };
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
