"use server"
import { getSupabaseUser } from "@/utils/supabaseUtils"
import { headers } from "next/headers"


// Components
import Header from "@/components/Dashboard/Header"
import Notes from "@/components/Dashboard/Notes/Notes"

// Icones
import GgNotes from "@/Icones/GgNotes"
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
  
  // Fetch
  const [schedulesData, todoLists] = await Promise.all([
    fetch(`${apiRootUrl}api/supabase/getSchedules?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["schedules"] },
      cache: "force-cache"
    }),
    fetch(`${apiRootUrl}api/supabase/getTodoList?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["todolists"] },
      cache: "force-cache"
    }),
  ]);

  const todoList = await todoLists.json();
  const schedules = await schedulesData.json();

  return (
    
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Notes" Icon={GgNotes} />
        <Notes />
      </div>
    </div>
  )
}

export default page