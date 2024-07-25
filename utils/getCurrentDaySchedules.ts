// Types
import { TableRow } from "@/Types/database.types";
import { getCurrentDate } from "./useDate";
import { ScheduleDetails } from "@/Types/scheduleType";

export const getCurrentDaySchedules = (
  schedules: ScheduleDetails[] | null,
  date: string = ""
) => {
  const currentDate = date === "" ? getCurrentDate() : date;
  const currentDateSchedules: ScheduleDetails[] = [];
  if (schedules) {
    schedules?.forEach((scheduleInfo: ScheduleDetails) => {
      if (scheduleInfo.date === currentDate) {
        currentDateSchedules.push(scheduleInfo);
      }
    });
  }
  return currentDateSchedules;
};

export const getCurrentWeekSchedules = (
  schedules: ScheduleDetails[] | null
):ScheduleDetails[] | [] => {
  const weekRange: { currentDate: string; endDate: string } = getWeekRange();
  let currentWeekSchedules: ScheduleDetails[]
  if (schedules !== null) {
    currentWeekSchedules = schedules.filter(
      (schedule: ScheduleDetails) =>
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
