"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

export const mutateTodoList = async (
  todoListInfo: TableInsert<"TodoList">,
  formAction: string,
  todoListId?: number
): Promise<ReturnInterface<TableRow<"TodoList">[]> | ReturnInterface<any>> => {
  try {
    let result;
    if (formAction === "add") {
      revalidateTag("todoList");
      result = await insertTodoList(todoListInfo);
    } else {
      result = await updateTodoList(todoListId!, todoListInfo);
      revalidateTag("todoList");
      revalidateTag(`todoList${todoListId}`);
    }
    revalidateTag("todolists");
    return result;
  } catch (e) {
    return returnError("There is an error inserting the schedule", e);
  }
};

export const addDailyReset = async ():Promise<ReturnInterface<TableRow<"DailyTodoResets">> | ReturnInterface<any>> => {
  try {
    const supabase = createClient();
    const result = await supabase.from("DailyTodoResets").insert<TableInsert<"DailyTodoResets">>({})
    
    if(result.error) {
      return returnError("There is an error inserting the Daily Reset", result.error);
    }
    
    return returnSuccess("Daily Reset Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the Daily Reset", error);
  }
}

const insertTodoList = async (
  todoListInfo: TableInsert<"TodoList">
): Promise<ReturnInterface<TableRow<"TodoList">> | ReturnInterface<any>> => {
  try {
    const supabase = createClient();
    const auth: any = getCookieAuth();
    let result = await supabase
      .from("TodoList")
      .insert<TableInsert<"TodoList">>({
        userId: auth.user.id,
        title: todoListInfo.title,
        description: todoListInfo.description,
        priorityLevel: parseInt(todoListInfo.priorityLevel!.toString()),
        frequency: todoListInfo.frequency,
      })
      .select();

    if (result.error)
      return returnError(
        "There is an error inserting the Todo-List",
        result.error
      );
    return returnSuccess("Todo-List Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the Todo-List", error);
  }
};

const updateTodoList = async (
  todoListId: number,
  todoListInfo: TableInsert<"TodoList">
): Promise<ReturnInterface<TableRow<"TodoList">> | ReturnInterface<any>> => {
  try {
    const supabase = createClient();
    let result = await supabase
      .from("TodoList")
      .update<TableInsert<"TodoList">>({
        title: todoListInfo.title,
        description: todoListInfo.description,
        priorityLevel: todoListInfo.priorityLevel,
      })
      .eq("id", todoListId)
      .select();

    if (result.error)
      return returnError(
        "There is an error updating the Todo-List",
        result.error
      );
    return returnSuccess("Todo-List Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error updating the Todo-List", error);
  }
};

export const updateTodoStatus = async (
  todoListId: number,
  statusId: number
): Promise<ReturnInterface<TableRow<"TodoList">> | ReturnInterface<any>> => {
  try {
    const supabase = createClient();
    let result = await supabase
      .from("TodoList")
      .update<TableInsert<"TodoList">>({
        status: statusId,
      })
      .eq("id", todoListId)
      .select("title");

    if (result.error) {
      return returnError(
        "There is an error updating the Todo-List",
        result.error
      );
    }
    return returnSuccess("Todo-List Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error updating the Todo-List", error);
  }
};
