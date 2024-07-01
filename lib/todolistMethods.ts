"use server";
import { headers } from "next/headers";

// Actions
import { updateTodoStatus, addDailyReset } from "@/actions/todolistActions";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCurrentDate, getCurrentDay, getDays } from "@/utils/useDate";

// types
import { todoListDetails } from "@/Types/todoListTypes";
import { Table, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import { getSupabaseUser } from "@/utils/supabaseUtils";
import { revalidateTag } from "next/cache";

type sortedTodoListType = {
  todoList: todoListDetails[];
  color: string;
};

interface sortedTodoListInterface {
  Urgent: sortedTodoListType;
  HighPriority: sortedTodoListType;
  MedPriority: sortedTodoListType;
  LowPriority: sortedTodoListType;
}

interface todoListResponseInterface {
  unsortedTodoList: todoListDetails[];
  sortedTodoList: sortedTodoListInterface | [];
}

const handleTodoListSort = (todoLists: todoListDetails[]) => {
  const currentDay = getCurrentDay();
  const initialSortedTodoListValues: sortedTodoListInterface = {
    Urgent: {
      color: "",
      todoList: [],
    },
    HighPriority: {
      color: "",
      todoList: [],
    },
    MedPriority: {
      color: "",
      todoList: [],
    },
    LowPriority: {
      color: "",
      todoList: [],
    },
  };
  // Initialize sorted todo list
  let newSortedTodoList: sortedTodoListInterface = initialSortedTodoListValues;

  // Map priority descriptions to keys in sortedTodoListInterface
  const priorityMapping: Record<string, keyof sortedTodoListInterface> = {
    Urgent: "Urgent",
    "High Priority": "HighPriority",
    "Medium Priority": "MedPriority",
    "Low Priority": "LowPriority",
  };

  const formattedTodoList = todoLists.filter(
    (details: todoListDetails) =>
      details.Frequencies.frequency === currentDay ||
      details.Frequencies.frequency === "Everyday"
  );

  formattedTodoList.forEach((details: todoListDetails) => {
    const priorityDescription: string = details.PriorityLevel.description;
    const color: string = details.PriorityLevel.color;
    const todo: todoListDetails = details;

    if (priorityMapping.hasOwnProperty(priorityDescription)) {
      const priorityKey: keyof sortedTodoListInterface =
        priorityMapping[priorityDescription];

      newSortedTodoList[priorityKey].color = color;
      if (newSortedTodoList[priorityKey].todoList)
        newSortedTodoList[priorityKey].todoList.push(todo);
    } else {
      // Handle the case where the priorityDescription doesn't have a corresponding key
      console.error(`Invalid priority description: ${priorityDescription}`);
    }
  });
  return newSortedTodoList;
};

export const resetTodoLists = async () => {
  try {
    const todoLists = await getTodoLists();
    const formattedDate = getCurrentDate();
    const dailyResets = await getResetDates(formattedDate);
    const currentDay = getCurrentDay();

    const unsortedTodoLists: todoListDetails[] | undefined =
      todoLists.unsortedTodoList;
    if (unsortedTodoLists === undefined) return;

    if (dailyResets.Response.length === 0) {
      await addDailyReset();
      for (let index = 0; index < unsortedTodoLists.length; index++) {
        const todoDetails: todoListDetails = unsortedTodoLists[index];
        const todoFrequency = todoDetails.Frequencies.frequency;
        if (todoFrequency === currentDay) {
          const res = await updateTodoStatus(todoDetails.id, 1);
          console.log(res);
        }
        if (todoFrequency === "Everyday") {
          const res = await updateTodoStatus(todoDetails.id, 1);
          console.log(res);
        }
      }
      revalidateTag("todolists");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getResetDates = async (
  currentDate: string
): Promise<
  ReturnInterface<TableRow<"DailyTodoResets">> | ReturnInterface<any>
> => {
  let result;
  const supabase = createClient();
  try {
    result = await supabase
      .from("DailyTodoResets")
      .select("*")
      .eq("resetDate", currentDate);
    if (result.error) {
      return returnError(
        "There is an error getting the Todo-Lists",
        result.error
      );
    }
    const resetDates: TableRow<"DailyTodoResets">[] | null = result.data;
    return returnSuccess("TOdos Daily Reset Dates", resetDates);
  } catch (error) {
    return returnError("There is an error getting the Reset Dates", error);
  }
};

export const getTodoLists = async () => {
  let result;
  const supabase = createClient();
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  try {
    result = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description, color), Frequencies(id, frequency), TodoListStatus(id, status)"
      )
      .eq("userId", `${userId}`);
    // console.log(auth)
    if (result.error) {
      console.log("There is an error getting the Todo-Lists", result.error);
      return {
        unsortedTodoList: [],
        sortedTodoList: [],
      };
    }
    const resData: any = result.data;
    const unsortedTodoList = resData as todoListDetails[];
    const sortedTodoList = handleTodoListSort(unsortedTodoList);
    const response: todoListResponseInterface = {
      unsortedTodoList: unsortedTodoList,
      sortedTodoList: sortedTodoList,
    };
    return response;
  } catch (error) {
    console.log("There is an error getting the Todo-Lists", error);
    return {
      unsortedTodoList: [],
      sortedTodoList: [],
    };
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
