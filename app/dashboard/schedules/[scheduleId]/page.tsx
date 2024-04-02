"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
// Lib
import { getScheduleDetails } from "@/lib/scheduleMethods";
// Types
import { TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";

interface props {
  params: { scheduleId: string };
}

const Page = async ({ params }: props) => {
  const scheduleDetails: ScheduleDetails = await getScheduleDetails(
    params.scheduleId
  );
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
