"use server";

import DetailedTodo from "@/components/Dashboard/TodoList/DetailedTodo";
import { getSupabaseUser } from "@/utils/supabaseUtils";
import { headers } from "next/headers";

// Types
interface props {
  params: { todoId: string };
}

const Page = async ({ params }: props) => {
  const headerInfo = headers();  
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;

  let apiRootUrl;
  if(process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL
  }

  const [todoDetailsJson, notesJson] = await Promise.all([
    fetch(
      `${apiRootUrl}api/supabase/getTodoDetails?todoId=${params.todoId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`todo${params.todoId}`] },
        cache: "force-cache"
      }
    ),
    fetch(
      `${apiRootUrl}api/supabase/getTodoNotes?user=${userId}&todoId=${params.todoId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`todoNotes${params.todoId}`] },
        cache: "force-cache"
      }
    )
  ]);

  const todoDetails = await todoDetailsJson.json();
  const notesDetails = await notesJson.json();
  return (
    <div className="mx-auto phone:w-full tablet:w-10/12 laptop:max-w-[500px]">
      <DetailedTodo notes={notesDetails.response} todoDetails={todoDetails.todo[0]} />
    </div>
  );
};

export default Page