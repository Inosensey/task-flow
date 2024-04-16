"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";

// lib
import { getScheduleDetails } from "@/lib/scheduleMethods";

interface props {
  params: { scheduleId: string };
}

const Page = async ({ params }: props) => {
  const scheduleDetails = await getScheduleDetails(parseInt(params.scheduleId));
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
