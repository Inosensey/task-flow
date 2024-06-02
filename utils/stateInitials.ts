import { ScheduleDetails } from "@/Types/scheduleType";

export const getLocationInfoInitial = (
  formAction: string,
  scheduleData: ScheduleDetails | undefined | null
) => {
  const initialData = {
    categoryKeyId:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].LocationCategories.id!
        : 0,
    categoryKey:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].LocationKeys.id!
        : 0,
    namePlace:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].namePlace!
        : "",
    lat:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].lat!
        : "",
    long:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].long!
        : "",
    selectedChoice: {
      id:
        formAction !== "add" && scheduleData !== undefined && scheduleData !== null
          ? scheduleData.ScheduleLocation[0].LocationKeys.id!
          : 0,
      key:
        formAction !== "add" && scheduleData !== undefined && scheduleData !== null
          ? scheduleData.ScheduleLocation[0].LocationKeys.key!
          : "Places",
    },
    selectedTypeOfPlace:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].LocationCategories.category!
        : "Type of Place",
    selectedPlace:
      formAction !== "add" && scheduleData !== undefined && scheduleData !== null
        ? scheduleData.ScheduleLocation[0].namePlace!
        : "Place List",
  };

  return initialData;
};

export const getToggleDesktopSelectOptionsInitials = () => {
  return {
    showChoices: false,
    showPlacesType: false,
    showPlaceList: false,
  };
};
