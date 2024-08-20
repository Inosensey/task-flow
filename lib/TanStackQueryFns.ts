import {
  sortedTodoListInterface,
  todoListDetails,
  todoListResponseInterface,
} from "@/Types/todoListTypes";
import { getCurrentDay } from "@/utils/useDate";
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { noteType } from "@/Types/noteTypes";
import { TableRow } from "@/Types/database.types";

export const getUserData = async () => {
  const supabase = useSupabase;
  const session = await supabase.auth.getUser();
  return session
}
export const getPersonalInfo = async () => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: personalInfo, error } = await supabase
      .from("PersonalInformation")
      .select(
        "userId, firstName, lastName, age, gender, contactNumber, country, state, zip, street"
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the Personal Information", error);
      return [];
    }
    const response =
      personalInfo as unknown as TableRow<"PersonalInformation">[];
    return response;
  } catch (error) {
    console.log("There is an error getting the Personal Information", error);
    return [];
  }
};

export const getUserInfo = async () => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: userInfo, error } = await supabase
      .from("User")
      .select("username")
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the User Information", error);
      return [];
    }
    const response = userInfo as unknown as TableRow<"User">[];
    return response;
  } catch (error) {
    console.log("There is an error getting the User Information", error);
    return [];
  }
};

export const getSchedules = async () => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: schedules, error } = await supabase
      .from("Schedules")
      .select(
        "*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))"
      )
      .eq("userId", `${userId}`);

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
};

export const getScheduleDetails = async (scheduleId: number) => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: schedule, error } = await supabase
      .from("Schedules")
      .select(
        `*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
      )
      .eq("id", scheduleId);

    if (error) {
      console.log("There is an error getting the Schedule Details", error);
      return undefined;
    }
    return { schedule: schedule };
  } catch (error) {
    console.log("There is an error getting the Schedule Details", error);
    return undefined;
  }
};

export const getLocationCategories = async () => {
  const supabase = useSupabase;
  try {
    let { data: locationCategories, error } = await supabase
      .from("LocationCategories")
      .select("*");

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
};

export const getLocationKeys = async () => {
  const supabase = useSupabase;
  try {
    let { data: locationKeys, error } = await supabase
      .from("LocationKeys")
      .select("*");

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

export const getTodoDetails = async (todoId: number) => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: todo, error } = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description, color), Frequencies(id, frequency), TodoListStatus(id, status)"
      )
      .eq("id", `${todoId}`)
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the Todo Details", error);
      return undefined;
    }
    const response = todo![0] as unknown as todoListDetails;
    return response;
  } catch (error) {
    console.log("There is an error getting the Todo Details", error);
    return undefined;
  }
};
export const getFrequencies = async () => {
  const supabase = useSupabase;
  try {
    let { data: frequencies, error } = await supabase
      .from("Frequencies")
      .select("*");

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
};

export const getPriorityLevels = async () => {
  const supabase = useSupabase;
  try {
    let { data: priorityLevels, error } = await supabase
      .from("PriorityLevel")
      .select("*");

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
};

export const getNotes = async () => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: notes, error } = await supabase
      .from("Notes")
      .select(
        `*, NoteType:noteType(id, type), Schedules:scheduleId(id, title), TodoList:todoId(id, title)`
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the Notes", error);
      return [];
    }
    const response = notes;
    return response;
  } catch (error) {
    console.log("There is an error getting the Notes", error);
    return [];
  }
};
export const getNoteTypes = async () => {
  const supabase = useSupabase;
  try {
    let { data: noteTypes, error } = await supabase
      .from("NoteType")
      .select(`*`);

    if (error) {
      console.log("There is an error getting the Note Types", error);
      return [];
    }
    const response = noteTypes;
    return response;
  } catch (error) {
    console.log("There is an error getting the Note Types", error);
    return [];
  }
};

export const getScheduleNotes = async (scheduleId: number) => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: noteList, error } = await supabase
      .from("Notes")
      .select(
        `id, note, scheduleId, todoId, NoteType:noteType(id, type), Schedules:scheduleId(id, title)`
      )
      .eq("scheduleId", `${scheduleId}`)
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the Notes", error);
      return [];
    }
    const response = noteList;
    return response as unknown as noteType[];
  } catch (error) {
    console.log("There is an error getting the Notes", error);
    return [];
  }
};

export const getTodoNotes = async (todoId: number) => {
  const supabase = useSupabase;
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  try {
    let { data: noteList, error } = await supabase
      .from("Notes")
      .select(
        `id, note, scheduleId, todoId, NoteType:noteType(id, type), TodoList:todoId(id, title)`
      )
      .eq("todoId", `${todoId}`)
      .eq("userId", `${userId}`);

    if (error) {
      console.log("There is an error getting the Notes", error);
      return [];
    }
    const response = noteList;
    return response as unknown as noteType[];
  } catch (error) {
    console.log("There is an error getting the Notes", error);
    return [];
  }
};
