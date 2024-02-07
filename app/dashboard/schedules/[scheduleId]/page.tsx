"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
// Lib
import { getScheduleDetails } from "@/lib/scheduleMethods";

// Types
import { TableRow } from "@/Types/database.types";
type returnType = [
  TableRow<"Schedules"> & {
    LocationInfo: [
      {
        city: string;
        LocationCategories: {
          id: number;
          category: string;
        };
        LocationKeys: {
          id: number;
          key: string;
        };
      }
    ];
  }
];

interface props {
  params: { scheduleId: string };
}

const page = async ({ params }: props) => {
  const scheduleDetails: returnType = await getScheduleDetails(params.scheduleId);
  return (
    <div>
      <DetailedSchedule details={scheduleDetails} />
    </div>
  );
};

export default page;
