"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableInsert } from "@/Types/database.types";

type ScheduleInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

export const getEvents = async () => {
  try {
    let { data, error } = await useSupabase.from("Events").select("*");

    if (error) {
      console.log(error);
    }
    const events = data;
    return events;
  } catch (error) {
    return error;
  }
};

export const createEvent = async (formData: FormData) => {
  try {
    const scheduleInfo: TableInsert<"Events"> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      timeStart: formData.get('timeStart') as string,
      timeEnd: formData.get('timeEnd') as string,
      themeColor: "#000",
    }
    let { data, error } = await useSupabase
      .from("Events")
      .insert<TableInsert<"Events">>({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: scheduleInfo.themeColor
      })
    revalidateTag("events")
    return { message: `Added Event ${data}` }
  } catch (e) {
    return "Failed to create todo";
  }
};
