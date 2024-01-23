// getSchedules
// getCurrentDaySchedules

// Types
import { TableRow } from "@/Types/database.types";

// Utils
import { getCurrentDate } from "@/utils/useDate";

export const getSchedules = async () => {
  const res = await fetch("http://localhost:3000/api/supabase/getSchedules", {
    next: { tags: ["schedules"], revalidate: 300 },
  });
  const schedules: TableRow<"Schedules">[] = await res.json();
  return schedules;
};

export const getCurrentDaySchedules = async (selectedDate: string = "") => {
  const date = selectedDate === "" ? getCurrentDate() : selectedDate;
  const currentDate = { currentDate: date };
  const res = await fetch(
    "http://localhost:3000/api/supabase/getCurrentDaySchedules",
    {
      next: { tags: ["schedule"], revalidate: 300 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentDate),
    }
  );
  const data: TableRow<"Schedules">[] = await res.json();
  return data;
};
