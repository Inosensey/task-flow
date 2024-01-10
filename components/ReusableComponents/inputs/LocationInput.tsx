import React, { useCallback, useEffect, useState } from "react";

// Import components
import Input from "./Input";
import debounce from "@/utils/useDebounce";

// Import utils
import { AutoCompleteLocation } from "@/utils/useLocations";

// Types
type locationInfoType = {
  city: string;
  specificPlace: string;
};

// State Initials
const locationInfoInitial: locationInfoType = {
  city: "",
  specificPlace: "",
};

const LocationInput = () => {
  const [locationInfo, setLocationInfo] =
    useState<locationInfoType>(locationInfoInitial);

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocationInfo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if(locationInfo.city === "") return;
    const debouncedAutoComplete = debounce(AutoCompleteLocation, 1000)
    const cleanup = debouncedAutoComplete(locationInfo.city);

    // Return a cleanup function if necessary
    return cleanup;
  }, [locationInfo.city]);
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default LocationInput;
