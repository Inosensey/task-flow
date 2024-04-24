"use server";

// Types
import { TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";
import { ReturnInterface } from "@/Types/generalTypes";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { getCurrentDate } from "@/utils/useDate";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

export const getSchedules = async (): Promise<
  TableRow<"Schedules">[] | any
> => {
  let result;
  const supabase = createClient();
  const auth: any = getCookieAuth();
  try {
    result = await supabase
      .from("Schedules")
      .select("*")
      .eq("userId", `${auth.user.id}`);
    // console.log(auth)
    if (result.error) {
      console.log(result.error);
    }
    const schedules: TableRow<"Schedules">[] | null = result.data;
    // Respond with JSON data
    return schedules;
  } catch (error) {
    return returnError("There is an error getting the schedule", error);
  }
};

export const getScheduleDetails = async (
  scheduleId: number
): Promise<ReturnInterface<ScheduleDetails> | ReturnInterface<any>> => {
  //   city, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category)
  try {
    const supabase = createClient();
    let { data, error } = await supabase
      .from("Schedules")
      .select(
        `*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
      )
      .eq("id", scheduleId);
    if (error) {
      console.log(error);
    }
    return returnSuccess("Schedule Successfully Fetched", data);
  } catch (error) {
    return returnError("There is an error getting the schedule", error);
  }
};

export const getLocationCategories = async () => {
  try {
    const supabase = createClient();
    let { data, error } = await supabase.from("LocationCategories").select(`*`);
    if (error) {
      console.log(error);
    }
    const LocationCategories = data;
    if(LocationCategories !== null) {
      return LocationCategories
    } else {
      return []
    }
  } catch (error) {
    return [error];
  }
};

export const getLocationKeys = async () => {
  try {
    const supabase = createClient();
    let { data, error } = await supabase.from("LocationKeys").select("*");
    if (error) {
      console.log(error);
    }
    const LocationKeys = data;
    if(LocationKeys !== null) {
      return LocationKeys
    } else {
      return []
    }
  } catch (error) {
    return [error];
  }
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
