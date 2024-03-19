"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";

// Lib
import { getScheduleDetails } from "@/lib/scheduleMethods";

type ScheduleInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  city: string;
  cityId: string;
  categoryKeyId: string;
  categoryKey: string;
  namePlace: string;
  lat: string;
  long: string;
};

export const mutateSchedule = async (
  scheduleInfo: ScheduleInfo,
  formAction: string,
  scheduleId?: number,
  scheduleLocationId?: number
) => {
  const date = new Date();
  try {
    let { data, error } = await useSupabase
      .from("Schedules")
      .upsert<TableInsert<"Schedules">>(
        {
          id: scheduleId,
          title: scheduleInfo.title,
          description: scheduleInfo.description,
          date: scheduleInfo.date,
          timeStart: scheduleInfo.timeStart,
          timeEnd: scheduleInfo.timeEnd,
          themeColor: "",
          userId: null,
        },
        { onConflict: "id" }
      )
      .select();
      console.log(data);
      console.log(error);
    if (error) return error;
    if (data === null) return null;

    const schedule: TableRow<"Schedules">[] = data!;
    revalidateTag("schedules");
    const locationResult = await mutateLocationInfo(scheduleInfo, schedule[0].id, scheduleLocationId);
    console.log(locationResult);
    if (formAction === "add") {
      return schedule[0];
    } else {
      revalidateTag(`schedule${scheduleId}`);
      const scheduleDetails: ScheduleDetails = await getScheduleDetails(
        schedule[0].id.toString()
      );
      return scheduleDetails;
    }
  } catch (e) {
    return `Failed to add Schedule: ${e}`;
  }
};

const mutateLocationInfo = async (
  scheduleInfo: ScheduleInfo,
  scheduleId: number,
  scheduleLocationId?: number
) => {
  const locationInfo: TableInsert<"ScheduleLocation"> = {
    scheduleId: scheduleId,
    categoryKey: parseInt(scheduleInfo.categoryKey),
    categoryKeyId: parseInt(scheduleInfo.categoryKeyId),
    city: scheduleInfo.city,
    cityId: scheduleInfo.cityId,
    namePlace: scheduleInfo.namePlace,
    lat: parseFloat(scheduleInfo.lat),
    long: parseFloat(scheduleInfo.long),
  };
  try {
    let { data, error } = await useSupabase
      .from("ScheduleLocation")
      .upsert<TableInsert<"ScheduleLocation">>(
        {
          id: scheduleLocationId,
          scheduleId: scheduleId,
          city: locationInfo.city,
          cityId: locationInfo.cityId,
          categoryKeyId: locationInfo.categoryKeyId,
          categoryKey: locationInfo.categoryKey,
          namePlace: locationInfo.namePlace,
          lat: locationInfo.lat,
          long: locationInfo.long,
        },
        { onConflict: "id" }
      )
      .select();
    console.log(error);
    const location: TableRow<"ScheduleLocation">[] | null = data;
    return error ? error : data;
  } catch (e) {
    return `Failed to add Schedule Location: ${e}`;
  }
};
