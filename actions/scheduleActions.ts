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

export const createSchedule = async (scheduleInfo: TableInsert<"Schedules">) => {
  try {
    // const scheduleInfo: TableInsert<"Schedules"> = {
    //   title: formData.get('title') as string,
    //   description: formData.get('description') as string,
    //   date: formData.get('date') as string,
    //   timeStart: formData.get('timeStart') as string,
    //   timeEnd: formData.get('timeEnd') as string,
    //   themeColor: "#000",
    // }
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
    revalidateTag("schedules")
    const schedule:TableRow<"Schedules">[] | null = data;
    if(schedule !== null) {
      return schedule[0];
    } else {
      return null;
    }
  } catch (e) {
    return "Failed to create todo";
  }
};
