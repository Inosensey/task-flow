import React from "react";
import { getSupabaseSession, getSupabaseUser } from "@/utils/supabaseUtils";

// Components
import Header from "@/components/Dashboard/Header";
import Settings from "@/components/Dashboard/Settings/Settings";

// Icons
import MaterialSymbolsSettingsOutlineRounded from "@/Icones/MaterialSymbolsSettingsOutlineRounded";
import { headers } from "next/headers";

const Page = async () => {
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  const headerInfo = headers();
  let apiRootUrl;
  if (process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL;
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL;
  }

  // Fetch
  const [personalInfoData, userInfoData] = await Promise.all([
    fetch(`${apiRootUrl}api/supabase/getPersonalInformation?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["personalInformation"] },
      cache: "force-cache",
    }),
    fetch(`${apiRootUrl}api/supabase/getUserData?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["userInformation"] },
      cache: "force-cache",
    }),
  ]);

  const personalInfo = await personalInfoData.json();
  const userInfo = await userInfoData.json();

  return (
    <div className="mx-auto phone:w-full tablet:w-10/12 laptop:max-w-[950px]">
      <div className="flex flex-col w-full bg-Primary">
        <Header
          headerName="Settings"
          Icon={MaterialSymbolsSettingsOutlineRounded}
        />
        <Settings
          User={userData}
          personalInfo={personalInfo.response}
          userInfo={userInfo.response}
        />
      </div>
    </div>
  );
};

export default Page;
