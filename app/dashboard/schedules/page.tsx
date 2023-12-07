"use server";

// Components
import CalendarNav from "@/components/Dashboard/Schedules/CalendarNav";
import Header from "@/components/Dashboard/Schedules/Header";
import Schedules from "@/components/Dashboard/Schedules/Schedules";

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
  const getSchedules = async () => {
    const res = await fetch("http://localhost:3000/api/supabase/getSchedules", {
      next: { tags: ["schedules"], revalidate: 300 },
    });
    const schedules: TableRow<"Schedules">[] = await res.json();
    return schedules;
  };
  const getCurrentDaySchedules = async () => {
    const currentDate = { currentDate: getCurrentDate() };
    const res = await fetch("http://localhost:3000/api/supabase/getCurrentDaySchedules", {
      next: { tags: ["schedule"], revalidate: 300 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentDate),
    });
    const data: TableRow<"Schedules">[] = await res.json();
    return data;
  };
  // console.log(getSchedule());

  const schedules: TableRow<"Schedules">[] = await getSchedules();
  const currentDaySchedules: TableRow<"Schedules">[] = await getCurrentDaySchedules();

  schedulePropData = {
    schedules: schedules,
    currentDaySchedules: currentDaySchedules,
  };

  return (
    <div>
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
