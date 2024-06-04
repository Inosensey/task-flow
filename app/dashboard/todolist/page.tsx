"use server";
import { headers } from "next/headers";

// Components
import Header from "@/components/Dashboard/Header";
import TodoLists from "@/components/Dashboard/TodoList/TodoLists";

// Icones
import IonTodayOutline from "@/Icones/IonTodayOutline";

// Libs
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

const page = async () => {
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  const headerInfo = headers();  
  
  let apiRootUrl;
  if(process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL
  }

  const todoListJson = await fetch(
    `${apiRootUrl}api/supabase/getTodoList?user=${userId}`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["todolists"] },
    }
  );
  const frequenciesJson = await fetch(
    `${apiRootUrl}api/supabase/getFrequencies`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["frequencies"] },
    }
  );
  const priorityLevelsJson = await fetch(
    `${apiRootUrl}api/supabase/getPriorityLevels`,
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
