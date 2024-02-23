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
  duration: number;
};

export const createSchedule = async (scheduleInfo: TableInsert<"Schedules">, locationInfo: TableInsert<"ScheduleLocation">) => {
  try {
    let { data, error } = await useSupabase
      .from("Schedules")
      .insert<TableInsert<"Schedules">>({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: scheduleInfo.themeColor
      }).select()
    const schedule:TableRow<"Schedules">[] | null = data;
    if(error) return error;
    if(schedule !== null) {
      revalidateTag("schedules")
      const AddLocationResult = await createLocationInfo(locationInfo, schedule[0].id)
      console.log(AddLocationResult);
      return schedule[0];
    } else {
      return null;
    }
  } catch (e) {
    return `Failed to add Schedule: ${e}`;
  }
};

const createLocationInfo = async (locationInfo: TableInsert<"ScheduleLocation">, scheduleId: number) => {
  try {
    let {data, error} = await useSupabase.from("ScheduleLocation").insert<TableInsert<"ScheduleLocation">>({
      scheduleId: scheduleId,
      city: locationInfo.city,
      categoryKeyId: locationInfo.categoryKeyId, 
      categoryKey: locationInfo.categoryKey,
      namePlace: locationInfo.namePlace,
      lat: locationInfo.lat,
      long: locationInfo.long
    }).select()
    const location:TableRow<"ScheduleLocation">[] | null = data;
    return error ? error : true;
  } catch (e) {
    return `Failed to add Schedule Location: ${e}`;
  }
}
