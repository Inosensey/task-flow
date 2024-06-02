"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
import { headers } from "next/headers";

// lib
import { getScheduleDetails } from "@/lib/scheduleMethods";

interface props {
  params: { scheduleId: string };
}

const Page = async ({ params }: props) => {
  const headerInfo = headers();
  const scheduleDetailsJson = await fetch(
    `http://www.localhost:3000/api/supabase/getScheduleDetails?scheduleId=${params.scheduleId}`,
    {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["schedules"] },
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
