import { sortedTodoListInterface, todoListDetails, todoListResponseInterface } from "@/Types/todoListTypes";
import { getCurrentDay } from "@/utils/useDate";
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { ScheduleDetails } from "@/Types/scheduleType";
interface reactQueryType {
  schedule: ScheduleDetails[]
}

export const getSchedules = async () => {
  const supabase = useSupabase;
  try {
    let { data: schedules, error } = await supabase
    .from("Schedules")
    .select("*");
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Schedules", error);
      return [];
    }
    const response = schedules;
    return response;
  } catch (error) {
    console.log("There is an error getting the Schedules", error);
    return [];
  }
}

export const getScheduleDetails = async (scheduleId: number) => {
  const supabase = useSupabase;
  try {
    let { data: schedule, error } = await supabase.from("Schedules")
    .select(
      `*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
    )
    .eq("id", scheduleId);;
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Schedule Details", error);
      return undefined;
    }
    return schedule;
  } catch (error) {
    console.log("There is an error getting the Schedule Details", error);
    return undefined;
  }
}

export const getLocationCategories = async () => {
  const supabase = useSupabase;
  try {
    let { data: locationCategories, error } = await supabase
    .from("LocationCategories")
    .select("*");
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Location Categories", error);
      return [];
    }
    const response = locationCategories;
    return response;
  } catch (error) {
    console.log("There is an error getting the Location Categories", error);
    return [];
  }
}

export const getLocationKeys = async () => {
  const supabase = useSupabase;
  try {
    let { data: locationKeys, error } = await supabase
    .from("LocationKeys")
    .select("*");
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Location Keys", error);
      return [];
    }
    const response = locationKeys;
    return response;
  } catch (error) {
    console.log("There is an error getting the Location Keys", error);
    return [];
  }
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
export const getFrequencies = async () => {
  const supabase = useSupabase;
  try {
    let { data: frequencies, error } = await supabase
    .from("Frequencies")
    .select("*");
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Frequencies", error);
      return [];
    }
    const response = frequencies;
    return response;
  } catch (error) {
    console.log("There is an error getting the Frequencies", error);
    return [];
  }
}

export const getPriorityLevels = async () => {
  
  const supabase = useSupabase;
  try {
    let { data: priorityLevels, error } = await supabase
    .from("PriorityLevel")
    .select("*");
    // console.log(auth)
    if (error) {
      console.log("There is an error getting the Priority Levels", error);
      return [];
    }
    const response = priorityLevels;
    return response;
  } catch (error) {
    console.log("There is an error getting the Priority Levels", error);
    return [];
  }
}