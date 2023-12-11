"use server";

// Components
import CalendarNav from "@/components/Dashboard/Schedules/CalendarNav";
import Header from "@/components/Dashboard/Schedules/Header";
import Schedules from "@/components/Dashboard/Schedules/Schedules";

// Lib
import { getCurrentDaySchedules, getSchedules } from "@/lib/scheduleMethods";

// Types
import { TableInsert, TableRow, TableUpdate } from "@/Types/database.types";
interface scheduleProps {
  schedules: TableRow<"Schedules">[] | null;
}

// Utils
import { getCurrentDate } from "@/utils/useDate";

const SchedulesPage = async () => {
  let schedulePropData: scheduleProps = {
    schedules: await getSchedules(),
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Calendar" />
        <CalendarNav />
        <div className="w-full relative">
          <Schedules
            schedules={schedulePropData.schedules}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
