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
  
  let apiRootUrl;
  if(process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL
  }

  const [schedulesDataJson, locationCategoriesJson, locationKeysJson] =
    await Promise.all([
      fetch(
        `${apiRootUrl}api/supabase/getSchedules?user=${userId}`,
        {
          headers: { cookie: headerInfo.get("cookie")! },
          next: { tags: ["schedules"] },
          cache: "force-cache"
        }
      ),
      fetch(`${apiRootUrl}api/supabase/getLocationCategories`, {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["locationCategories"] },
        cache: "force-cache"
      }),
      fetch(`${apiRootUrl}api/supabase/getLocationKeys`, {
        headers: { cookie: headerInfo.get("cookie")! },
        next: { tags: ["locationKeys"] },
        cache: "force-cache"
      }),
    ]);

  const schedulesData = await schedulesDataJson.json();
  const locationCategoriesData = await locationCategoriesJson.json();
  const locationKeysData = await locationKeysJson.json();

  return (
    <div className="mx-auto phone:w-full tablet:w-10/12 laptop:max-w-[950px]">
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
