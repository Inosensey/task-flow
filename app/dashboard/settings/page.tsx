import React from "react";
import { getSupabaseUser } from "@/utils/supabaseUtils";

// Components
import Header from "@/components/Dashboard/Header";
import Settings from "@/components/Dashboard/Settings/Settings";

// Icons
import MaterialSymbolsSettingsOutlineRounded from "@/Icones/MaterialSymbolsSettingsOutlineRounded";

const Page = async () => {
  const userData = await getSupabaseUser();
  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header
          headerName="Settings"
          Icon={MaterialSymbolsSettingsOutlineRounded}
        />
        <Settings />
      </div>
    </div>
  );
};

export default Page;
