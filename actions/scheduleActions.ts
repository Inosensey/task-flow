"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getSupabaseUser } from "@/utils/supabaseUtils";

// Types
import { TableInsert, TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import { useFormStateType } from "@/Types/formStates";
type ScheduleInfo = {
  id: string,
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

export const mutateSchedule = async (
  prevState: useFormStateType,
  formData: FormData
)=> {
  try {
    let result;
    let scheduleId:number = 0;
    const formAction = formData.get("action") as string;
    const scheduleData = {
      id: formData.get("scheduleId") as string,
      title:formData.get("title") as string,
      description:formData.get("description") as string,
      date:formData.get("date") as string,
      timeStart:formData.get("timeStart") as string,
      timeEnd:formData.get("timeEnd") as string,
      themeColor: "",
      categoryKey: formData.get("categoryKey") as string,
      categoryKeyId: formData.get("categoryKeyId") as string,
      city: formData.get("city") as string,
      cityId: formData.get("cityId") as string,
      namePlace: formData.get("namePlace") as string,
      lat: formData.get("lat") as string,
      long: formData.get("long") as string,
    };
    console.log(formAction);
    if (formAction === "add") {
      result = await insertSchedule(scheduleData);
      const responseData = result.Response as TableRow<"Schedules">[];
      scheduleId = responseData[0].id;
      revalidateTag("schedules");
    } else {
      result = await updateSchedule(scheduleData);
      scheduleId = parseInt(scheduleData.id);
      revalidateTag("schedules");
      revalidateTag(`schedule${scheduleData.id}`);
    }
    if (result.Status === "Success") {
      await mutateLocationInfo(scheduleData, scheduleId, formAction);
    }
    return {
      success: true,
      error: false,
      data: result.Response as TableRow<"Schedules">[],
      message: "",
    };
  } catch (e) {
    
    return {
      success: true,
      error: false,
      data: [],
      message: `There is an error inserting the schedule: ${e}`,
    };
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
    const supabase = createClient();
    const userData = await getSupabaseUser();
    const userId = userData.data.user!.id;
    let result = await supabase
      .from("Schedules")
      .insert<TableInsert<"Schedules">>({
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "",
        userId: userId,
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
  scheduleInfo: ScheduleInfo
): Promise<
  ReturnInterface<TableRow<"Schedules">> | ReturnInterface<any>
> => {
  try {
    const supabase = createClient();
    let result = await supabase
      .from("Schedules")
      .update<TableInsert<"Schedules">>({
        id: parseInt(scheduleInfo.id),
        title: scheduleInfo.title,
        description: scheduleInfo.description,
        date: scheduleInfo.date,
        timeStart: scheduleInfo.timeStart,
        timeEnd: scheduleInfo.timeEnd,
        themeColor: "",
      })
      .eq("id", parseInt(scheduleInfo.id))
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
    const supabase = createClient();
    let result = await supabase
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
    const supabase = createClient();
    let result = await supabase
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
