// getSchedules
// getCurrentDaySchedules

"use server";

// Types
import { TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";

// Utils
import { getCurrentDate } from "@/utils/useDate";
import { headers } from "next/headers";

export const test = async () => {
  const res = await fetch("http://localhost:3000/api/supabase/test", {
    next: { tags: ["test"], revalidate: 300 },
    headers: headers(),
    method: "GET"
  });
  const schedules: TableRow<"Schedules">[] = await res.json();
  return schedules;
};

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

export const getScheduleDetails = async (id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/supabase/getScheduleDetails?scheduleId=${id}`,
    {
      next: { tags: [`schedule${id}`], revalidate: 300 },
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data: ScheduleDetails = await res.json();
  return data;
};
