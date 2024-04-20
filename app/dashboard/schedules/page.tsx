"use server";

// Components
import CalendarNav from "@/components/Dashboard/Schedules/CalendarNav";
import Header from "@/components/Dashboard/Header";
import Schedules from "@/components/Dashboard/Schedules/Schedules";

// Types
import { TableInsert, TableRow, TableUpdate } from "@/Types/database.types";
interface scheduleProps {
  schedules: TableRow<"Schedules">[] | null;
}
interface locationProps {
  locationKeys: TableRow<"LocationKeys">[] | null;
  locationCategories: TableRow<"LocationCategories">[] | null;
}

// Utils
import { getSchedules } from "@/lib/scheduleMethods";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";

const Page = async () => {
  let schedulePropData: scheduleProps = {
    schedules: await getSchedules(),
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header
          headerName="Calendar"
          Icon={MaterialSymbolsCalendarMonthOutlineRounded}
        />
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

export default Page;
