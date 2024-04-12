"use server";

// Components
import CalendarNav from "@/components/Dashboard/Schedules/CalendarNav";
import Header from "@/components/Dashboard/Header";
import Schedules from "@/components/Dashboard/Schedules/Schedules";

// Lib
import { getCurrentDaySchedules, test } from "@/lib/scheduleMethods";
import { getLocationCategories, getLocationKeys } from "@/lib/locationMethods";

// Types
import { TableInsert, TableRow, TableUpdate } from "@/Types/database.types";
interface scheduleProps {
  schedules: TableRow<"Schedules">[] | null;
}
interface locationProps {
  locationKeys: TableRow<"LocationKeys">[] | null;
  locationCategories: TableRow<"LocationCategories">[] | null;
}

// actions
import { getSchedules } from "@/actions/scheduleActions";

// Utils
import { getCurrentDate } from "@/utils/useDate";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";

const Page = async () => {
  let schedulePropData: scheduleProps = {
    schedules: await getSchedules(),
  };
  let locationData: locationProps = {
    locationCategories: await getLocationCategories(),
    locationKeys: await getLocationKeys(),
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Calendar" Icon={MaterialSymbolsCalendarMonthOutlineRounded} />
        <CalendarNav />
        <div className="w-full relative">
          <Schedules
            schedules={schedulePropData.schedules}
            locationKeys={locationData.locationKeys}
            locationCategories={locationData.locationCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
