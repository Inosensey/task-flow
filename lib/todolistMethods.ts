"use server";

// Types
import { Table, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

export const getTodoLists = async (): Promise<TableRow<"TodoList">[] | any> => {
  let result;
  const supabase = createClient();
  const auth: any = getCookieAuth();
  try {
    result = await supabase
      .from("TodoList")
      .select("*")
      .eq("userId", `${auth.user.id}`);
    // console.log(auth)
    if (result.error) {
      console.log(result.error);
    }
    const todoLists: TableRow<"TodoList">[] | null = result.data;
    // Respond with JSON data
    return todoLists;
  } catch (error) {
    return returnError("There is an error getting the Todo-Lists", error);
  }
};

export const getPriorityLevel = async (): Promise<
  TableRow<"PriorityLevel">[] | any
> => {
  let result;
  const supabase = createClient();
  try {
    result = await supabase.from("PriorityLevel").select("*");

    if (result.error) {
      console.log(result.error);
    }
    const priorityLevel: TableRow<"PriorityLevel">[] | null = result.data;

    return priorityLevel;
  } catch (error) {
    return returnError("There is an error getting the Todo-Lists", error);
  }
};
