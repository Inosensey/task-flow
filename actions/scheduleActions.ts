"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";

type ScheduleInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  city: string;
  cityId: string,
  categoryKeyId: string;
  categoryKey: string;
  namePlace: string;
  lat: string;
  long: string;
};

export const createSchedule = async (scheduleInfo: ScheduleInfo) => {
  try {
    let { data, error } = await useSupabase
      .from("Schedules")
      .insert<TableInsert<"Schedules">>({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "",
      })
      .select();
    const schedule: TableRow<"Schedules">[] | null = data;
    if (error) return error;
    if (schedule !== null) {
      revalidateTag("schedules");

      const locationInfo: TableInsert<"ScheduleLocation"> = {
        scheduleId: schedule[0].id,
        categoryKey: parseInt(scheduleInfo.categoryKey),
        categoryKeyId: parseInt(scheduleInfo.categoryKeyId),
        city: scheduleInfo.city,
        cityId: scheduleInfo.cityId,
        namePlace: scheduleInfo.namePlace,
        lat: parseFloat(scheduleInfo.lat),
        long: parseFloat(scheduleInfo.long),
      };
      const AddLocationResult = await createLocationInfo(locationInfo);
      console.log(AddLocationResult);
      return schedule[0];
    } else {
      return null;
    }
  } catch (e) {
    return `Failed to add Schedule: ${e}`;
  }
};

const createLocationInfo = async (
  locationInfo: TableInsert<"ScheduleLocation">
) => {
  try {
    let { data, error } = await useSupabase
      .from("ScheduleLocation")
      .insert<TableInsert<"ScheduleLocation">>({
        scheduleId: locationInfo.scheduleId,
        city: locationInfo.city,
        cityId: locationInfo.cityId,
        categoryKeyId: locationInfo.categoryKeyId,
        categoryKey: locationInfo.categoryKey,
        namePlace: locationInfo.namePlace,
        lat: locationInfo.lat,
        long: locationInfo.long,
      })
      .select();
    const location: TableRow<"ScheduleLocation">[] | null = data;
    return error ? error : true;
  } catch (e) {
    return `Failed to add Schedule Location: ${e}`;
  }
};
