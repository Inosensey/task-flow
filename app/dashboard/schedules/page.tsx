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
  currentDaySchedules: TableRow<"Schedules">[] | null;
}

// Utils
import { getCurrentDate } from "@/utils/useDate";

const SchedulesPage = async () => {
  let schedulePropData: scheduleProps = {
    schedules: null,
    currentDaySchedules: null,
  };

  const schedules: TableRow<"Schedules">[] = await getSchedules();
  const currentDaySchedules: TableRow<"Schedules">[] = await getCurrentDaySchedules();

  schedulePropData = {
    schedules: schedules,
    currentDaySchedules: currentDaySchedules,
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Calendar" />
        <CalendarNav />
        <div className="w-full relative">
          <Schedules
            currentDaySchedules={schedulePropData.currentDaySchedules}
            schedules={schedulePropData.schedules}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
