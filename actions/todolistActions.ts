"use server";
import { revalidateTag } from "next/cache";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getSupabaseUser } from "@/utils/supabaseUtils";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
interface mutateTodoListProps {
  todoListInfo: TableInsert<"TodoList">;
  formAction: string;
  todoListId?: number;
}
import { useFormStateType } from "@/Types/formStates";

export const mutateTodoList = async (
  prevState: useFormStateType,
  formData: FormData
) => {
  try {
    let result;
    const formAction = formData.get("action");
    const todoData = {
      id: parseInt(formData.get("todoId") as string),
      title: formData.get("title") as string,
      priorityLevel: parseInt(formData.get("priorityLevel") as string),
      frequency: parseInt(formData.get("frequency") as string),
      description: formData.get("description") as string,
    };
    if (formAction === "Add") {
      result = await insertTodoList(todoData);
    } else {
      result = await updateTodoList(todoData);
    }
    revalidateTag("todoList");
    return {
      success: true,
      error: false,
      data: [],
      message: "",
    };
  } catch (e) {
    return {
      success: true,
      error: false,
      data: [],
      message: `There is an error inserting the Todo: ${e}`,
    };
  }
};

export const addDailyReset = async (): Promise<
  ReturnInterface<TableRow<"DailyTodoResets">> | ReturnInterface<any>
> => {
  try {
    const supabase = createClient();
    const result = await supabase
      .from("DailyTodoResets")
      .insert<TableInsert<"DailyTodoResets">>({});

    if (result.error) {
      return returnError(
        "There is an error inserting the Daily Reset",
        result.error
      );
    }

    return returnSuccess("Daily Reset Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the Daily Reset", error);
  }
};

const insertTodoList = async (todoListInfo: TableInsert<"TodoList">) => {
  try {
    const supabase = createClient();
    const userData = await getSupabaseUser();
    const userId = userData.data.user!.id;
    let result = await supabase
      .from("TodoList")
      .insert<TableInsert<"TodoList">>({
        userId: userId,
        title: todoListInfo.title,
        description: todoListInfo.description,
        priorityLevel: parseInt(todoListInfo.priorityLevel!.toString()),
        frequency: todoListInfo.frequency,
      })
      .select();

    if (result.error)
      return returnError("There is an error inserting the Todo", result.error);
    return returnSuccess("Todo-List Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the Todo", error);
  }
};

const updateTodoList = async (
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
      .eq("id", todoListInfo.id)
      .select();

    if (result.error)
      return returnError("There is an error updating the Todo", result.error);
    return returnSuccess("Todo Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error updating the Todo", error);
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
      return returnError("There is an error updating the Todo", result.error);
    }

    revalidateTag("todolists");
    return returnSuccess("Todo-List Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error updating the Todo", error);
  }
};

export const deleteTodo = async (
  todoId: number
): Promise<ReturnInterface<TableRow<"TodoList">> | ReturnInterface<any>> => {
  try {
    const supabase = createClient();
    const userData = await getSupabaseUser();
    const userId = userData.data.user!.id;
    let result = await supabase
      .from("TodoList")
      .delete()
      .eq("id", todoId)
      .eq("userId", userId)
      .select();
    if (result.error) {
      return returnError("There is an error deleting the Todo", result.error);
    }

    revalidateTag("todoList");
    return returnSuccess("Todo-List Successfully Deleted", result.data);
  } catch (error) {
    return returnError("There is an error deleting the Todo", error);
  }
};
