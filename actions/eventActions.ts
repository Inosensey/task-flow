"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

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

export const createEvent = async (scheduleInfo: ScheduleInfo) => {
  try {
    let { data, error } = await useSupabase
      .from("Events")
      .insert({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "#000",
      })
    return data[0];
  } catch (e) {
    return "Failed to create todo";
  }
};
