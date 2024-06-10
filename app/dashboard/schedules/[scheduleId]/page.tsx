"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
import { headers } from "next/headers";

interface props {
  params: { scheduleId: string };
}

const Page = async ({ params }: props) => {
  const headerInfo = headers();  

  let apiRootUrl;
  if(process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL
  }
  
  const scheduleDetailsJson = await fetch(
    `${apiRootUrl}api/supabase/getScheduleDetails?scheduleId=${params.scheduleId}`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: [`schedule${params.scheduleId}`] },
      cache: "force-cache"
    }
  )
  const scheduleDetails = await scheduleDetailsJson.json();
  return (
    <div>
      <DetailedSchedule
        details={scheduleDetails}
        scheduleId={params.scheduleId}
      />
    </div>
  );
};

export default Page;
