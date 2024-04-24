"use server";

// Types
import { Table, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

//
import { todoListDetails } from "@/Types/todoListTypes";

export const getTodoLists = async (): Promise<
  ReturnInterface<todoListDetails[]> | ReturnInterface<any>
> => {
  let result;
  const supabase = createClient();
  const auth: any = getCookieAuth();
  try {
    result = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description), Frequencies(frequency)"
      )
      .eq("userId", `${auth.user.id}`);
    // console.log(auth)
    if (result.error) {
      return returnError(
        "There is an error getting the Todo-Lists",
        result.error
      );
    }
    return returnSuccess("Schedule Successfully Todo-Lists", result.data);
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
      return returnError(
        "There is an error getting the Todo-Lists",
        result.error
      );
    }
    const priorityLevel: TableRow<"PriorityLevel">[] | null = result.data;

    return priorityLevel;
  } catch (error) {
    return returnError("There is an error getting the Todo-Lists", error);
  }
};

export const getFrequencies = async (): Promise<
  TableRow<"Frequencies"> | any
> => {
  let result;
  const supabase = createClient();
  try {
    result = await supabase.from("Frequencies").select("*");

    if (result.error) {
      return returnError(
        "There is an error getting the Todo-Lists",
        result.error
      );
    }

    const frequencies: TableRow<"Frequencies">[] | null = result.data;
    return frequencies;
  } catch (error) {
    return returnError("There is an error getting the Todo-Lists", error);
  }
};
