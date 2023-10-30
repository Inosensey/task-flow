"use server";
import { revalidatePath, revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";
import { Table } from "@/Types/supabase";

export const createTodo = async (formData: FormData) => {
  try {
    const todoListInfo = {
      title: formData.get("title"),
      description: formData.get("description"),
      priorityLevel: formData.get("priorityLevel"),
    };
    let { data, error } = await useSupabase.from("TodoList").insert({
      title: todoListInfo.title,
      description: todoListInfo.description,
      priorityLevel: todoListInfo.priorityLevel,
    }).select();
    
    // revalidatePath('/')
    revalidateTag("todoList")
    return { message: `Added todo ${data}` }
  } catch (e) {
    return { message: "Failed to create todo" };
  }
};
