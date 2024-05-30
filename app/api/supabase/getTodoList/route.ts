import type { NextApiResponse, NextApiRequest } from "next";
import { apiRouteSupbaseIns, routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

// Utils
import { getCurrentDay } from "@/utils/useDate";

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

export async function GET(
  req: Request
) {
    
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user')?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: TodoList, error } = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description, color), Frequencies(id, frequency), TodoListStatus(id, status)"
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log(error);
    }

    const unsortedTodoList = TodoList as unknown as todoListDetails[];
    const sortedTodoList = handleTodoListSort(unsortedTodoList);
    const response: todoListResponseInterface = {
      unsortedTodoList: unsortedTodoList,
      sortedTodoList: sortedTodoList,
    };
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
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
