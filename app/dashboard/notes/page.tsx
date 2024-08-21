"use server";
import { getSupabaseUser } from "@/utils/supabaseUtils";
import { headers } from "next/headers";

// Components
import Header from "@/components/Dashboard/Header";
import Notes from "@/components/Dashboard/Notes/Notes";

// Icones
import GgNotes from "@/Icones/GgNotes";
const page = async () => {
  const userData = await getSupabaseUser();
  if(!userData.data.user) {
    return
  }
  const userId = userData.data.user!.id;
  const headerInfo = headers();
  let apiRootUrl;
  if (process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL;
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL;
  }

  // Fetch
  const [schedulesData, todoLists, notesData, noteTypesData] = await Promise.all([
    fetch(`${apiRootUrl}api/supabase/getSchedules?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["schedules"] },
      cache: "force-cache",
    }),
    fetch(`${apiRootUrl}api/supabase/getTodoList?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["todolists"] },
      cache: "force-cache",
    }),
    fetch(`${apiRootUrl}api/supabase/getNotes?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["notes"] },
      cache: "force-cache",
    }),
    fetch(`${apiRootUrl}api/supabase/getNoteTypes`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["noteTypes"] },
      cache: "force-cache",
    }),
  ]);

  const todoList = await todoLists.json();
  const schedules = await schedulesData.json();
  const notes = await notesData.json();
  const noteTypes = await noteTypesData.json();

  return (
    <div className="mx-auto phone:w-full tablet:w-10/12 laptop:max-w-[650px]">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Notes" Icon={GgNotes} />
        <Notes
          notes={notes.response}
          schedules={schedules.schedules}
          todoList={todoList.response}
          noteTypes={noteTypes.response}
        />
      </div>
    </div>
  );
};

export default page;
