import React, { useCallback, useEffect, useState } from "react";

// Import components
import Input from "./Input";
import debounce from "@/utils/useDebounce";

// Import utils
import { AutoCompleteLocation } from "@/utils/useLocations";
import supportedCategories from "@/utils/supportedCatList";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";


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
  console.log(supportedCategories);
  const [locationInfo, setLocationInfo] =
    useState<locationInputType>(locationInfoInitial);
  const [locationList, setLocationList] = useState<
    locationListType | undefined
  >(undefined);
  const [runAutoComplete, setRunAutoComplete] = useState<boolean>(false);
  const [showSupportedCat, setShowSupportedCat] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string>("");

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
        const response = await AutoCompleteLocation(place);
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
      <div className="flex flex-col gap-1">
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
        <div>
          <p className="phone:text-sm">Categories</p>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
