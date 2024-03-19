"use client";

import React, { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

// Libs
import { getLocationCategories, getLocationKeys } from "@/lib/locationMethods";
import { GetListOfPlaces } from "@/lib/locationMethods";

// Utils
import supportedCategories, {
  formatLocationName,
} from "@/utils/supportedCatList";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Type
import { TableRow } from "@/Types/database.types";

// Components
import Input from "@/components/ReusableComponents/inputs/Input";
import { getScheduleDetails } from "@/lib/scheduleMethods";

//Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// Types
type LocationInfoInput = {
  categoryKeyId: number;
  categoryKey: number;
  namePlace: string;
  lat: string;
  long: string;
  selectedChoice: {
    key: string | null;
    id: number;
  };
  selectedTypeOfPlace: string | null;
  selectedPlace: string;
};

interface Feature {
  geometry: {
    coordinates: [string, string];
    type: string;
  };
  properties: {
    address_line1: string;
    address_line2: string;
    categories: string[];
    city: string;
    country: string;
    country_code: string;
    distance: number;
    formatted: string;
    lat: string;
    lon: string;
    name: string;
    place_id: string;
    postcode: string;
    region: string;
    state: string;
    street: string;
  };
}
interface PlaceList {
  features: Feature[];
}
interface props {
  place_id: string;
  scheduleId: string | null;
}

const CategorySelect = ({ place_id, scheduleId }: props) => {
  // Initialize query client
  const queryClient = useQueryClient();

  // Store
  const { formAction } = useScheduleFormStore();

  // Use Query
  const { data: locationKeyData } = useQuery({
    queryKey: ["locationKeys"],
    queryFn: getLocationKeys,
  });
  const { data: locationCategoriesData } = useQuery({
    queryKey: ["locationCategories"],
    queryFn: getLocationCategories,
  });
  const {
    data: scheduleData,
    error: scheduleError,
    isFetched: scheduleIsFetched,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(scheduleId!),
    enabled: formAction === "edit",
  });

  // Initial data
  const locationInfoInitial: LocationInfoInput = {
    categoryKeyId:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].LocationCategories.id!
        : 0,
    categoryKey:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].LocationKeys.id!
        : 0,
    namePlace:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].namePlace!
        : "",
    lat:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].lat!
        : "",
    long:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].long!
        : "",
    selectedChoice: {
      id:
        formAction !== "add" && scheduleData !== undefined
          ? scheduleData[0].ScheduleLocation[0].LocationKeys.id!
          : 0,
      key:
        formAction !== "add" && scheduleData !== undefined
          ? scheduleData[0].ScheduleLocation[0].LocationKeys.key!
          : "Places",
    },
    selectedTypeOfPlace:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].LocationCategories.category!
        : "Type of Place",
    selectedPlace:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].ScheduleLocation[0].namePlace!
        : "Place List",
  };

  // State
  const [locationInfo, setLocationInfo] =
    useState<LocationInfoInput>(locationInfoInitial);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);
  const [listPlace, setListPlace] = useState<PlaceList | undefined>(undefined);
  const [isGettingListPlaces, setIsGettingListPlaces] =
    useState<boolean>(false);

  const handlePlaceTypeChange = async (
    place: string,
    categories: string | null
  ) => {
    if (!categories) return;
    queryClient.invalidateQueries({ queryKey: ["placesList"] });
    setIsGettingListPlaces(true);
    const data: PlaceList = await queryClient.fetchQuery({
      queryKey: ["placesList"],
      queryFn: () => GetListOfPlaces(place, categories),
    });
    setIsGettingListPlaces(false);
    setListPlace((prev) => ({ ...prev, features: data.features }));
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Categories Select code */}
      <div className="relative phone:w-11/12">
        <div
          onClick={() => {
            setShowChoices((prev) => !prev);
          }}
          className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
        >
          <p className="select-none text-sm">
            {formatLocationName(locationInfo.selectedChoice?.key)}
          </p>
          <span
            className="transition-all"
            style={{
              transform: showChoices ? "rotate(-90deg)" : "rotate(0deg)",
            }}
          >
            <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
          </span>
        </div>
        <div
          style={{ maxHeight: showChoices ? "224px" : "0px" }}
          className="phone:text-sm transition-all rounded-md absolute top-10 bg-Secondary overflow-auto z-[100] w-full"
        >
          {locationKeyData?.map((category: TableRow<"LocationKeys">) => (
            <div
              onClick={() => {
                // setSelectedChoice(category.key);
                setLocationInfo((locationInfo) => ({
                  ...locationInfo,
                  selectedChoice: {
                    key: category.key,
                    id: category.id,
                  },
                }));
                setShowChoices((prev) => !prev);
                setLocationInfo((locationInfoPrev) => ({
                  ...locationInfoPrev,
                  categoryKeyId: category.id,
                }));
              }}
              key={category.key}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <p className="select-none">
                {formatLocationName(category.key)}
                {category.description !== null && (
                  <span className="text-xs text-[#ccc]">
                    {" "}
                    - {category.description}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Categories Select code end */}

      {/* Places type select code */}
      {locationInfo.selectedChoice?.key !== "Places" && (
        <div className="relative phone:w-11/12">
          <div
            onClick={() => {
              setShowPlacesType((prev) => !prev);
            }}
            className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
          >
            <p className="select-none text-sm">
              {formatLocationName(locationInfo.selectedTypeOfPlace)}
            </p>
            <span
              className="transition-all"
              style={{
                transform: showPlacesType ? "rotate(-90deg)" : "rotate(0deg)",
              }}
            >
              <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
            </span>
          </div>
          <div
            style={{ maxHeight: showPlacesType ? "224px" : "0px" }}
            className="phone:text-sm transition-all rounded-md absolute top-10 bg-Secondary overflow-auto z-[100] w-full"
          >
            {locationCategoriesData?.map(
              (info: TableRow<"LocationCategories">) =>
                locationInfo.selectedChoice?.id === info.keyId && (
                  <div
                    onClick={() => {
                      const SelectedPlaceType = `${locationInfo.selectedChoice.key}.${info.category}`;
                      // setSelectedTypeOfPlace(info.category);
                      setLocationInfo((locationInfo) => ({
                        ...locationInfo,
                        selectedTypeOfPlace: info.category,
                      }));
                      setShowPlacesType((prev) => !prev);
                      handlePlaceTypeChange(place_id, SelectedPlaceType);
                      setLocationInfo((locationInfoPrev) => ({
                        ...locationInfoPrev,
                        categoryKey: info.id,
                      }));
                    }}
                    key={info.id}
                    className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                  >
                    <p className="select-none">
                      {formatLocationName(info.category)}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {/* Places type select code end */}

      {/* Places list select code */}
      {locationInfo.selectedTypeOfPlace !== "Type of Place" && (
        <div className="relative phone:w-11/12">
          <div
            onClick={() => {
              setShowPlaceList((prev) => !prev);
            }}
            className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
          >
            {isGettingListPlaces ? (
              <div className="flex gap-4">
                <p className="select-none text-sm text-Disabled">
                  Loading Places
                </p>
                <span>
                  <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                </span>
              </div>
            ) : (
              <p className="select-none text-sm">
                {formatLocationName(locationInfo.selectedPlace)}
              </p>
            )}
            {!isGettingListPlaces && (
              <span
                className="transition-all"
                style={{
                  transform: showPlacesType ? "rotate(-90deg)" : "rotate(0deg)",
                }}
              >
                <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
              </span>
            )}
          </div>
          <div
            style={{ maxHeight: showPlaceList ? "224px" : "0px" }}
            className="phone:text-sm transition-all rounded-md absolute top-10 bg-Secondary overflow-auto z-[100] w-full"
          >
            {listPlace?.features ? (
              listPlace?.features.map((place: Feature) => (
                <div
                  key={place.properties.place_id}
                  onClick={() => {
                    // setSelectedPlace(place.properties.address_line1);
                    setLocationInfo((locationInfo) => ({
                      ...locationInfo,
                      selectedPlace: place.properties.address_line1,
                    }));
                    setLocationInfo((locationInfoPrev) => ({
                      ...locationInfoPrev,
                      namePlace: place.properties.address_line1,
                      lat: place.geometry.coordinates[1],
                      long: place.geometry.coordinates[0],
                    }));
                    setShowPlaceList((prev) => !prev);
                  }}
                  className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                >
                  <p className="select-none">
                    {formatLocationName(place.properties.address_line1)}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary">
                <p className="select-none">
                  The selected city doesn&lsquo;t have this place
                </p>
              </div>
            )}
          </div>
          <div className="hidden">
            <Input
              state={locationInfo.categoryKeyId.toString()}
              type="hidden"
              name="categoryKeyId"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={locationInfo.categoryKey.toString()}
              type="hidden"
              name="categoryKey"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={locationInfo.namePlace}
              type="hidden"
              name="namePlace"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={locationInfo.lat.toString()}
              type="hidden"
              name="lat"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
            <Input
              state={locationInfo.long.toString()}
              type="hidden"
              name="long"
              placeholder=""
              label=""
              valid={null}
              validationMessage={""}
            />
          </div>
        </div>
      )}
      {/* Places list select code end */}
    </div>
  );
};

export default CategorySelect;
