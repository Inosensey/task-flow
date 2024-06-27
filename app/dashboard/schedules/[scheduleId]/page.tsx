"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
import { getSupabaseUser } from "@/utils/supabaseUtils";
import { headers } from "next/headers";

interface props {
  params: { scheduleId: string };
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
  
  const [scheduleDetailsJson, notesJson] = await Promise.all([
    fetch(
      `${apiRootUrl}api/supabase/getScheduleDetails?scheduleId=${params.scheduleId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`schedule${params.scheduleId}`] },
        cache: "force-cache"
      }
    ),
    fetch(
      `${apiRootUrl}api/supabase/getScheduleNotes?user=${userId}&scheduleId=${params.scheduleId}`,
      {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: [`scheduleNotes${params.scheduleId}`] },
        cache: "force-cache"
      }
    )
  ])
  const scheduleDetails = await scheduleDetailsJson.json();
  const notesDetails = await notesJson.json();

  return (
    <div className="w-full">
      <DetailedSchedule
        details={scheduleDetails}
        notes={notesDetails.response}
        scheduleId={params.scheduleId}
      />
    </div>
  );
};

export default Page;
