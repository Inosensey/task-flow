"use server";
import { headers } from "next/headers";

// Components
import CalendarNav from "@/components/Dashboard/Schedules/CalendarNav";
import Header from "@/components/Dashboard/Header";
import Schedules from "@/components/Dashboard/Schedules/Schedules";

// Types
import { TableRow } from "@/Types/database.types";
interface locationProps {
  locationKeys: TableRow<"LocationKeys">[] | null;
  locationCategories: TableRow<"LocationCategories">[] | null;
}

// Utils
import { getSupabaseUser } from "@/utils/supabaseUtils";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";

const Page = async () => {
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  const headerInfo = headers();

  const [schedulesDataJson, locationCategoriesJson, locationKeysJson] =
    await Promise.all([
      fetch(
        `http://localhost:3000/api/supabase/getSchedules?user=${userId}`,
        {
          headers: { cookie: headerInfo.get("cookie")! },
          next: { tags: ["schedules"] },
        }
      ),
      fetch(`http://localhost:3000/api/supabase/getLocationCategories`, {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["locationCategories"] },
      }),
      fetch(`http://localhost:3000/api/supabase/getLocationKeys`, {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["locationKeys"] },
      }),
    ]);

  const schedulesData = await schedulesDataJson.json();
  const locationCategoriesData = await locationCategoriesJson.json();
  const locationKeysData = await locationKeysJson.json();

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
            schedules={schedulesData.schedules}
            locationCategories={locationCategoriesData.response}
            locationKeys={locationKeysData.response}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
