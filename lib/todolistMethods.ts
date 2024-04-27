"use server";

// Types
import { Table, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

// types
import { todoListDetails } from "@/Types/todoListTypes";

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
  sortedTodoList: sortedTodoListInterface;
}

const handleTodoListSort = (todoLists: todoListDetails[]) => {
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

  todoLists.forEach((details: todoListDetails) => {
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

export const getTodoLists = async (): Promise<
  ReturnInterface<todoListResponseInterface> | ReturnInterface<any>
> => {
  let result;
  const supabase = createClient();
  const auth: any = getCookieAuth();
  try {
    result = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description, color), Frequencies(frequency), TodoListStatus(id, status)"
      )
      .eq("userId", `${auth.user.id}`);
    // console.log(auth)
    if (result.error) {
      return returnError(
        "There is an error getting the Todo-Lists",
        result.error
      );
    }
    const resData: any = result.data;
    const unsortedTodoList = resData as todoListDetails[];
    const sortedTodoList = handleTodoListSort(unsortedTodoList);
    const response: todoListResponseInterface = {
      unsortedTodoList: unsortedTodoList,
      sortedTodoList: sortedTodoList,
    };
    return returnSuccess("Schedule Successfully Todo-Lists", response);
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
