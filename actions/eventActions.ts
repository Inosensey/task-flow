"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

export const getEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/supabase/getEvents")
    const data = await res.json();
    const events = data.data;
    return { events };
  } catch (error) {
    return { message: error };
  }
};

export const createEvent = async (formData: FormData) => {
  try {
    const todoListInfo = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      timeStart: formData.get("timeStart"),
      timeEnd: formData.get("timeEnd"),
      themeColor: formData.get("themeColor"),
    };
    let { data, error } = await useSupabase
      .from("Events")
      .insert({
        title: todoListInfo.title,
        description: todoListInfo.description,
        date: todoListInfo.date,
        timeStart: todoListInfo.timeStart,
        timeEnd: todoListInfo.timeEnd,
        themeColor: todoListInfo.themeColor,
      })
      .select();

    // revalidatePath('/')
    revalidateTag("todoList");
    return { message: `Added todo ${data}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
};
