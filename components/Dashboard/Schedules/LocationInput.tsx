import React, { useCallback, useEffect, useState } from "react";

// Import components
import Input from "@/components/ReusableComponents/inputs/Input";
import debounce from "@/utils/useDebounce";

// Import utils
import { AutoCompleteLocation } from "@/lib/locationMethods";
import supportedCategories, {
  formatCategoryKey,
} from "@/utils/supportedCatList";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";
import CategorySelect from "./CategorySelect";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Types
type locationInputType = {
  city: string;
  specificPlace: string;
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
  lon: Number;
  lat: Number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  place_id: string;
};
interface locationListType {
  locations: locationInfoType[];
}

// State Initials
const locationInfoInitial: locationInputType = {
  city: "",
  specificPlace: "",
};

const LocationInput = () => {
  const [locationInfo, setLocationInfo] =
    useState<locationInputType>(locationInfoInitial);
  const [locationList, setLocationList] = useState<
    locationListType | undefined
  >(undefined);
  const [runAutoComplete, setRunAutoComplete] = useState<boolean>(false);
  const [showSupportedCat, setShowSupportedCat] = useState<boolean>(false);
  const [autoCompleteRunning, setAutoCompleteRunning] =
    useState<boolean>(false);
  const [placeId, setPlaceId] = useState<string>("");

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocationInfo((prev) => ({ ...prev, [name]: value }));
    setRunAutoComplete(true);
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
        // console.log(response.results)
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
            onChange={HandleInputChange}
            valid={null}
            validationMessage={""}
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
                key={info.name}
                onClick={() => {
                  const city = `${info.city}, ${info.postcode} ${info.state} ${info.country}`;
                  setLocationInfo((prev) => ({ ...prev, city: city }));
                  setLocationList(undefined);
                  setRunAutoComplete(false);
                  setShowSupportedCat(true);
                  setPlaceId(info.place_id);
                }}
              >
                <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                <p className="text-base">{info.city},</p>
                <p className="text-sm text-[#ccc]">
                  {info.postcode} {info.state} {info.country}
                </p>
              </div>
            ))}
          </div>
        )}
        {showSupportedCat && (
          <div>
            <p className="phone:text-sm">Place Information</p>
            <CategorySelect place_id={placeId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;