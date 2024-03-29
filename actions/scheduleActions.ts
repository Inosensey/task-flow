"use server";
import { revalidateTag } from "next/cache";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";

interface ReturnInterface<T> {
  Status: string;
  Message: string;
  Response: T;
}

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
  scheduleId?: number
): Promise<ReturnInterface<TableRow<"Schedules">[]> | ReturnInterface<any>> => {
  try {
    let result;
    if (formAction === "add") {
      revalidateTag("schedules");
      result = await insertSchedule(scheduleInfo);
    } else {
      result = await updateSchedule(scheduleId!, scheduleInfo);
      revalidateTag("schedules");
      revalidateTag(`schedule${scheduleId}`);
    }
    console.log(result);
    if (result.Status === "Success") {
      const responseData = result.Response as TableRow<"Schedules">[];
      await mutateLocationInfo(
        scheduleInfo,
        responseData[0].id,
        formAction
      );
    }
    return result;
  } catch (e) {
    return returnError("There is an error inserting the schedule", e);
  }
};

const mutateLocationInfo = async (
  scheduleInfo: ScheduleInfo,
  scheduleId: number,
  formAction: string
): Promise<
  ReturnInterface<TableRow<"ScheduleLocation">> | ReturnInterface<any>
> => {
  if (formAction === "add") {
    const result: TableRow<"ScheduleLocation"> | any =
      await insertScheduleLocation(scheduleInfo, scheduleId);
    return result;
  } else {
    const result: TableRow<"ScheduleLocation"> | any =
      await updateScheduleLocation(scheduleInfo, scheduleId);
    return result;
  }
};

const insertSchedule = async (
  scheduleInfo: ScheduleInfo
): Promise<ReturnInterface<TableRow<"Schedules">> | ReturnInterface<any>> => {
  try {
    let result = await useSupabase
      .from("Schedules")
      .insert<TableInsert<"Schedules">>({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "",
        userId: null,
      })
      .select();

    if (result.error)
      return returnError(
        "There is an error inserting the schedule",
        result.error
      );
    return returnSuccess("Schedule Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the schedule", error);
  }
};

const updateSchedule = async (
  scheduleId: number,
  scheduleInfo: ScheduleInfo
): Promise<
  ReturnInterface<TableRow<"ScheduleLocation">> | ReturnInterface<any>
> => {
  try {
    let result = await useSupabase
      .from("Schedules")
      .update<TableInsert<"Schedules">>({
        id: scheduleId,
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "",
        userId: null,
      })
      .eq("id", scheduleId)
      .select();

    if (result.error)
      return returnError(
        "There is an error updating the schedule",
        result.error
      );
    return returnSuccess("Schedule Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error updating the schedule", error);
  }
};

const insertScheduleLocation = async (
  scheduleInfo: ScheduleInfo,
  scheduleId: number
): Promise<
  ReturnInterface<TableRow<"ScheduleLocation">> | ReturnInterface<any>
> => {
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
    let result = await useSupabase
      .from("ScheduleLocation")
      .insert<TableInsert<"ScheduleLocation">>({
        scheduleId: scheduleId,
        city: locationInfo.city,
        cityId: locationInfo.cityId,
        categoryKeyId: locationInfo.categoryKeyId,
        categoryKey: locationInfo.categoryKey,
        namePlace: locationInfo.namePlace,
        lat: locationInfo.lat,
        long: locationInfo.long,
      })
      .select();
    if (result.error)
      return returnError(
        "There is an error inserting the schedule location",
        result.error
      );
    return returnSuccess(
      "Schedule Location Successfully Inserted",
      result.data
    );
  } catch (error) {
    return returnError(
      "There is an error inserting the schedule location",
      error
    );
  }
};

const updateScheduleLocation = async (
  scheduleInfo: ScheduleInfo,
  scheduleId: number
): Promise<
  ReturnInterface<TableRow<"ScheduleLocation">> | ReturnInterface<any>
> => {
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
    let result = await useSupabase
      .from("ScheduleLocation")
      .update<TableInsert<"ScheduleLocation">>({
        city: locationInfo.city,
        cityId: locationInfo.cityId,
        categoryKeyId: locationInfo.categoryKeyId,
        categoryKey: locationInfo.categoryKey,
        namePlace: locationInfo.namePlace,
        lat: locationInfo.lat,
        long: locationInfo.long,
      })
      .eq("scheduleId", scheduleId)
      .select();
    if (result.error)
      return returnError(
        "There is an error updating the schedule location",
        result.error
      );
    return returnSuccess("Schedule Location Successfully Updated", result.data);
  } catch (error) {
    return returnError(
      "There is an error updating the schedule location",
      error
    );
  }
};
