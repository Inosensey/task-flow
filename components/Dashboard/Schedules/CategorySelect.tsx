"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

// Libs
import { getLocationCategories, getLocationKeys } from "@/lib/locationMethods";
import { GetListOfPlaces } from "@/lib/locationMethods";

// Utils
import {
  formatLocationName,
} from "@/utils/supportedCatList";
import getLocationInfoInitial from "@/utils/getLocationInitialInfo";

// Type
import { TableRow } from "@/Types/database.types";

// Components
import Input from "@/components/ReusableComponents/inputs/Input";
import { getScheduleDetails } from "@/lib/scheduleMethods";

//Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";
import CustomSelect from "@/components/ReusableComponents/inputs/CustomSelect";

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

  useEffect(() => {
    if (formAction !== "add" && scheduleData !== undefined) {
      const SelectedPlaceType = `${scheduleData[0].ScheduleLocation[0].LocationKeys.key}.${scheduleData[0].ScheduleLocation[0].LocationCategories.category}`;
      const setPlacesList = async () => {
        const data: PlaceList | undefined = await getPlaces(
          scheduleData[0].ScheduleLocation[0].cityId!,
          SelectedPlaceType
        );

        if (data !== undefined)
          setListPlace((prev) => ({ ...prev, features: data.features }));
      };
      setPlacesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State
  const [locationInfo, setLocationInfo] = useState<LocationInfoInput>(
    getLocationInfoInitial(formAction, scheduleData)
  );
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);
  const [listPlace, setListPlace] = useState<PlaceList | undefined>(undefined);
  const [isGettingListPlaces, setIsGettingListPlaces] =
    useState<boolean>(false);

  async function getPlaces(place: string, categories: string | null) {
    if (!categories) return;
    const data: PlaceList = await queryClient.fetchQuery({
      queryKey: ["placesList"],
      queryFn: () => GetListOfPlaces(place, categories),
    });
    queryClient.invalidateQueries({ queryKey: ["placesList"] });
    return data;
  }

  const handlePlaceTypeChange = async (
    place: string,
    categories: string | null
  ) => {
    setIsGettingListPlaces(true);
    console.log(place);
    console.log(categories);
    const data: PlaceList | undefined = await getPlaces(place, categories);
    if (data !== undefined)
      setListPlace((prev) => ({ ...prev, features: data.features }));
    setIsGettingListPlaces(false);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Categories Select code */}
      <CustomSelect
        selected={locationInfo.selectedChoice?.key!}
        placeHolder={locationInfo.selectedChoice?.key!}
        showChoices={showChoices}
        setShowChoices={setShowChoices}
      >
        {locationKeyData?.map((category: TableRow<"LocationKeys">) => (
          <div
            onClick={() => {
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
      </CustomSelect>
      {/* Categories Select code end */}

      {/* Places type select code */}
      {locationInfo.selectedChoice?.key !== "Places" && (
        <CustomSelect
          selected={locationInfo.selectedTypeOfPlace!}
          placeHolder={locationInfo.selectedTypeOfPlace!}
          showChoices={showPlacesType}
          setShowChoices={setShowPlacesType}
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
        </CustomSelect>
      )}
      {/* Places type select code end */}

      {/* Places list select code */}
      {locationInfo.selectedTypeOfPlace !== "Type of Place" && (
        <CustomSelect
          selected={locationInfo.selectedPlace}
          placeHolder={locationInfo.selectedPlace}
          showChoices={showPlaceList}
          setShowChoices={setShowPlaceList}
          dynamic={true}
          fetching={isGettingListPlaces}
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
        </CustomSelect>
      )}
      {/* Places list select code end */}

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
  );
};

export default CategorySelect;
