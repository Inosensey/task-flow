import { useQueryClient, useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";

import {
  getLocationCategories,
  getLocationKeys,
  getScheduleDetails,
} from "@/lib/scheduleMethods";
import { GetListOfPlaces } from "@/lib/locationMethods";
import { sortedTodoListInterface, todoListDetails, todoListResponseInterface } from "@/Types/todoListTypes";
import { getCurrentDay } from "@/utils/useDate";
import { useSupabase } from "@/utils/useSupabaseClient";

export const useLocationKeys = () => {
  // Initialize query client
  const { data: locationKeyData } = useQuery({
    queryKey: ["locationKeys"],
    queryFn: getLocationKeys,
  });
  return locationKeyData;
};

export const useLocationCategories = () => {
  const { data: locationCategoriesData } = useQuery({
    queryKey: ["locationCategories"],
    queryFn: getLocationCategories,
  });
  return locationCategoriesData;
};

export const useGetScheduleDetails = (
  scheduleId: string | null,
  formAction: string
) => {
  const {
    data: scheduleData,
    error: scheduleError,
    isFetching: scheduleIsFetching,
    isFetched: scheduleIsFetched,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(parseInt(scheduleId!)),
    enabled: formAction === "edit",
  });

  return { scheduleData, scheduleIsFetching };
};

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

export const getTodoList = async () => {
  let result;
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
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
}