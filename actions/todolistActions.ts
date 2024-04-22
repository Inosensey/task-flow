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
  todoListInfo: TableRow<"TodoList">,
  todoListId: number,
  formAction: string
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
    return result;
  } catch (e) {
    return returnError("There is an error inserting the schedule", e);
  }
};

const insertTodoList = async (
  todoListInfo: TableRow<"TodoList">
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
        priorityLevel: todoListInfo.priorityLevel,
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
  todoListInfo: TableRow<"TodoList">
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
