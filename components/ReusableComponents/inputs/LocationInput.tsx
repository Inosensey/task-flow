import React, { useState } from "react";

// Import components
import Input from "./Input";

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

    setLocationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <div>
        <Input
          state={locationInfo.city}
          type="text"
          name="title"
          placeholder="Enter the City you are in"
          label="City"
          onChange={HandleInputChange}
          onBlur={HandleInputChange}
          valid={null}
          validationMessage={""}
        />
      </div>
    </div>
  );
};

export default LocationInput;
