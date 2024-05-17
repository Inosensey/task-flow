import React from "react";

import { Feature, LocationInfoInput } from "@/Types/scheduleType";
import { TableRow } from "@/Types/database.types";
interface generalInfoType {
  setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInput>>;
  locationKeyInfo?: TableRow<"LocationKeys">;
  locationCatInfo?: TableRow<"LocationCategories">;
  listPlaceInfo?: Feature;
  setShowChoices?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const onClickLocationKeys = ({
  setLocationInfo,
  locationKeyInfo,
  setShowChoices,
}: generalInfoType) => {
  setLocationInfo((locationInfo) => ({
    ...locationInfo,
    selectedChoice: {
      key: locationKeyInfo!.key,
      id: locationKeyInfo!.id,
    },
  }));
  setShowChoices && setShowChoices((prev) => !prev);
  setLocationInfo((locationInfoPrev) => ({
    ...locationInfoPrev,
    categoryKeyId: locationKeyInfo!.id,
  }));
};

export const onClickLocationCategories = ({
  setLocationInfo,
  locationCatInfo,
  setShowChoices,
}: generalInfoType) => {
  setLocationInfo((locationInfo) => ({
    ...locationInfo,
    selectedTypeOfPlace: locationCatInfo!.category,
  }));
  setShowChoices && setShowChoices((prev) => !prev);
  setLocationInfo((locationInfoPrev) => ({
    ...locationInfoPrev,
    categoryKey: locationCatInfo!.id,
  }));
};

export const onClickListPlace = ({
  setLocationInfo,
  listPlaceInfo,
  setShowChoices,
}: generalInfoType) => {
  setLocationInfo((locationInfo) => ({
    ...locationInfo,
    selectedPlace: listPlaceInfo!.properties.address_line1,
  }));
  setLocationInfo((locationInfoPrev) => ({
    ...locationInfoPrev,
    namePlace: listPlaceInfo!.properties.address_line1,
    lat: listPlaceInfo!.geometry.coordinates[1],
    long: listPlaceInfo!.geometry.coordinates[0],
  }));
  setShowChoices && setShowChoices((prev) => !prev);
};
