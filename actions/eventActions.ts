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
    // console.log("EVents",events);
    return events;
  } catch (error) {
    return { message: error };
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
      .select();

    console.log(await getEvents());
    return data[0];
  } catch (e) {
    return { message: "Failed to create todo" };
  }
};
