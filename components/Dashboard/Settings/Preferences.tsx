import { useQuery, useQueryClient } from "@tanstack/react-query";

// libs
import { getSettingsInfo } from "@/lib/TanStackQueryFns";

// Components
import NotificationDetails from "./PreferencesContent/NotificationDetails";

// Types
import { TableRow } from "@/Types/database.types";
interface props {
  settingsInfo: TableRow<"Settings">[]
}

const Preferences = ({settingsInfo}: props) => {
  
  // Use query
  const { data: settingsInfoQueryData } = useQuery({
    queryKey: ["settingsInfo"],
    queryFn: getSettingsInfo,
    initialData: settingsInfo,
  });

  return (
    <div className="mt-2 flex flex-col gap-2 laptop:flex-row">
      <NotificationDetails settingsInfo={settingsInfoQueryData[0]} />
    </div>
  );
};

export default Preferences;
