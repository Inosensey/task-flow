import { useQueryClient, useQuery } from "@tanstack/react-query";

import {
  getLocationCategories,
  getLocationKeys,
  getScheduleDetails,
} from "@/lib/scheduleMethods";
import { GetListOfPlaces } from "@/lib/locationMethods";

export const useLocationKeys = () => {
  // Initialize query client
  const { data: locationKeyData } = useQuery({
    queryKey: ["locationKeys"],
    queryFn: getLocationKeys,
  });
  return locationKeyData;
};

export const useLocationCategories = () => {
  const { data: locationCategoriesData } = useQuery({
    queryKey: ["locationCategories"],
    queryFn: getLocationCategories,
  });
  return locationCategoriesData;
};

export const useGetScheduleDetails = (
  scheduleId: string | null,
  formAction: string
) => {
  const {
    data: scheduleData,
    error: scheduleError,
    isFetching: scheduleIsFetching,
    isFetched: scheduleIsFetched,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(parseInt(scheduleId!)),
    enabled: formAction === "edit",
  });

  return { scheduleData, scheduleIsFetching };
};