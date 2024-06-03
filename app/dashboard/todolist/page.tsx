"use server";
import { headers } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Components
import Header from "@/components/Dashboard/Header";
import TodoLists from "@/components/Dashboard/TodoList/TodoLists";

// Icones
import IonTodayOutline from "@/Icones/IonTodayOutline";

// Libs
import { getTodoLists } from "@/lib/todolistMethods";

import { ReturnInterface } from "@/Types/generalTypes";
import { todoListDetails } from "@/Types/todoListTypes";
import { getSupabaseUser } from "@/utils/supabaseUtils";

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

const page = async () => {
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  const headerInfo = headers();

  const todoListJson = await fetch(
    `http://localhost:3000/api/supabase/getTodoList?user=${userId}`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["todolists"] },
    }
  );
  const frequenciesJson = await fetch(
    `http://localhost:3000/api/supabase/getFrequencies`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["frequencies"] },
    }
  );
  const priorityLevelsJson = await fetch(
    `http://localhost:3000/api/supabase/getPriorityLevels`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["priorityLevels"] },
    }
  );
  const todoLists = await todoListJson.json();
  const frequencies = await frequenciesJson.json();
  const priorityLevels = await priorityLevelsJson.json();

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Todo-List" Icon={IonTodayOutline} />
        <TodoLists
          TodoLists={todoLists.response}
          frequencies={frequencies.response}
          priorityLevels={priorityLevels.response}
        />
      </div>
    </div>
  );
};

export default page;
