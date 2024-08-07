import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Import components
import Input from "@/components/ReusableComponents/inputs/Input";

// Import utils
import debounce from "@/utils/useDebounce";

// import libs
import { AutoCompleteLocation } from "@/lib/locationMethods";

// Zustand Store
import { useFormStore } from "@/store/useFormStore";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";
import CategorySelect from "./CategorySelect";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";
import FormValidation from "@/utils/validation";

// lib
import { getScheduleDetails } from "@/lib/TanStackQueryFns";
import { ScheduleDetails } from "@/Types/scheduleType";

// Types
type LocationInfoInput = {
  city: string;
  cityId: string;
};

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};
type locationInfoType = {
  name: string;
  ref: string;
  country: string;
  country_code: string;
  region: string;
  state: string;
  city: string;
  postcode: string;
  lon: string;
  lat: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  place_id: string;
};
interface locationListType {
  locations: locationInfoType[];
}
type params = {
  scheduleId: string | null;
};
interface reactQueryType {
  schedule: ScheduleDetails[]
}

const LocationInput = ({ scheduleId }: params) => {
  // Store
  const { validations, setValidation, formAction } = useFormStore();

  // Use query
  const {
    data: data,
    error: scheduleError,
    isFetched: scheduleIsFetched,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(parseInt(scheduleId!)),
    enabled: formAction === "edit",
  });
  
  const scheduleData = data as unknown as reactQueryType
  const detailsData = scheduleData !== undefined ? scheduleData.schedule[0] : ""
  const location = scheduleData?.schedule[0].ScheduleLocation[0]

  // States
  const [locationInfo, setLocationInfo] = useState<LocationInfoInput>({
    city:
      formAction === "edit" && scheduleData !== undefined
        ? location.city!
        : "",
    cityId:
      formAction === "edit" && scheduleData !== undefined
        ? location.cityId!
        : "",
  });
  const [locationList, setLocationList] = useState<
    locationListType | undefined
  >(undefined);
  const [runAutoComplete, setRunAutoComplete] = useState<boolean>(false);
  const [showSupportedCat, setShowSupportedCat] = useState<boolean>(
    formAction !== "add" ? true : false
  );
  const [autoCompleteRunning, setAutoCompleteRunning] =
    useState<boolean>(false);
  const [placeId, setPlaceId] = useState<string>("");

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };
    setLocationInfo((prev) => ({ ...prev, [name]: value }));
    setRunAutoComplete(true);

    const result: validation = FormValidation(validationParams);
    setValidation(result);
  };

  useEffect(() => {
    let cleanup;
    if (locationInfo.city === "") {
      setLocationList(undefined);
    } else {
      const debouncedAutoComplete = debounce(async (place: string) => {
        if (!runAutoComplete) return;
        setAutoCompleteRunning(true);
        const response = await AutoCompleteLocation(place);
        setAutoCompleteRunning(false);
        setShowSupportedCat(false);
        setLocationList({ locations: response.results });
      }, 1000);
      cleanup = debouncedAutoComplete(locationInfo.city);
    }
    // Return a cleanup function if necessary
    return cleanup;
  }, [locationInfo.city, runAutoComplete]);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            state={locationInfo.city}
            type="text"
            name="city"
            placeholder="Enter the City you are in"
            label="City"
            autoComplete="off"
            onChange={HandleInputChange}
            onBlur={HandleInputChange}
            valid={validations?.city?.valid}
            validationMessage={validations?.city?.validationMessage}
          />
          {autoCompleteRunning && (
            <div className="absolute bottom-[0.6rem] right-10">
              <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
            </div>
          )}
        </div>
        {locationList?.locations && (
          <div className="flex flex-col gap-1 phone:text-sm phone:w-11/12">
            {locationList?.locations.map((info: locationInfoType) => (
              <div
                className="flex gap-1 items-center px-2 py-2 cursor-pointer border-white bg-Secondary hover:bg-SmoothSecondary"
                key={info.place_id}
                onClick={() => {
                  const city = `${info.city}, ${info.postcode} ${info.state} ${info.country}`;
                  setLocationInfo((prev) => ({
                    ...prev,
                    city: city,
                    cityId: info.place_id,
                  }));
                  setLocationList(undefined);
                  setRunAutoComplete(false);
                  setShowSupportedCat(true);
                  setPlaceId(info.place_id);
                }}
              >
                <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                <p className="text-sm">{info.city},</p>
                <p className="text-sm text-[#ccc]">
                  {info.postcode} {info.state} {info.country}
                </p>
              </div>
            ))}
          </div>
        )}
        {showSupportedCat && (
          <>
            <p className="phone:text-sm">Place Information</p>
            <CategorySelect
              place_id={placeId}
              scheduleId={formAction === "add" ? null : scheduleId}
            />
          </>
        )}
      </div>

      <Input
        state={locationInfo.cityId}
        type="hidden"
        name="cityId"
        placeholder=""
        label=""
        valid={null}
        validationMessage={""}
      />
    </div>
  );
};

export default LocationInput;
