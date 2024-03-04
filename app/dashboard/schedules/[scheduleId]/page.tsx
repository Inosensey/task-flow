"use server";

import DetailedSchedule from "@/components/Dashboard/Schedules/DetailedSchedule";
// Lib
import { getScheduleDetails } from "@/lib/scheduleMethods";
// Types
import { TableRow } from "@/Types/database.types";
type returnTypes = [
  TableRow<"Schedules"> & {
    ScheduleLocation: {
      namePlace: string;
      city: string;
      LocationCategories: {
        id: number;
        category: string;
      };
      LocationKeys: {
        id: number;
        key: string;
      };
      long: string;
      lat: string;
    }[];
  }
];

interface props {
  params: { scheduleId: string };
}

const page = async ({ params }: props) => {
  const scheduleDetails: returnTypes = await getScheduleDetails(
    params.scheduleId
  );
  return (
    <div>
      <DetailedSchedule details={scheduleDetails} />
    </div>
  );
};

export default page;
