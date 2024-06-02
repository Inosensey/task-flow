import type { NextApiResponse, NextApiRequest } from "next";
import {
  apiRouteSupbaseIns,
  routeHandlerSupabaseIns,
} from "@/utils/supabaseUtils";

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scheduleId = searchParams.get("scheduleId")?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: schedule, error } = await supabase
      .from("Schedules")
      .select(
        `*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
      )
      .eq("id", scheduleId);
    if (error) {
      console.log(error);
    }

    if (error) {
      console.log(error);
    }
    // Respond with JSON data
    return Response.json({ schedule });
  } catch (error) {
    return Response.json({ message: error });
  }
}
