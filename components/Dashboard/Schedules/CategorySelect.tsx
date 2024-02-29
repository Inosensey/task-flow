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

// Types
type LocationInfoInput = {
  categoryKeyId: number;
  categoryKey: number;
  namePlace: string;
  lat: number;
  long: number;
};

interface Feature {
  geometry: {
    coordinates: [number, number];
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
    lat: number;
    lon: number;
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
}

// Initial data
const locationInfoInitial: LocationInfoInput = {
  categoryKeyId: 0,
  categoryKey: 0,
  namePlace: "",
  lat: 0,
  long: 0,
};

const CategorySelect = ({ place_id }: props) => {
  // Initialize query client
  const queryClient = useQueryClient();

  // Use Query
  const { data: locationKeyData } = useQuery({
    queryKey: ["locationKeys"],
    queryFn: getLocationKeys,
  });
  const { data: locationCategoriesData } = useQuery({
    queryKey: ["locationCategories"],
    queryFn: getLocationCategories,
  });

  // State
  const [locationInfo, setLocationInfo] =
    useState<LocationInfoInput>(locationInfoInitial);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<{
    key: string | null;
    id: number;
  } | null>({ key: "Places", id: 0 });
  const [selectedTypeOfPlace, setSelectedTypeOfPlace] = useState<string | null>(
    "Type of Place"
  );
  const [selectedPlace, setSelectedPlace] = useState<string>("Place List");
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
            {formatLocationName(selectedChoice?.key)}
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
                setSelectedChoice((selectedChoicePrev) => ({
                  ...selectedChoicePrev,
                  key: category.key,
                  id: category.id,
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
      {selectedChoice?.key !== "Places" && (
        <div className="relative phone:w-11/12">
          <div
            onClick={() => {
              setShowPlacesType((prev) => !prev);
            }}
            className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
          >
            <p className="select-none text-sm">
              {formatLocationName(selectedTypeOfPlace)}
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
                selectedChoice?.id === info.keyId && (
                  <div
                    onClick={() => {
                      const SelectedPlaceType = `${selectedChoice.key}.${info.category}`;
                      setSelectedTypeOfPlace(info.category);
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
      {selectedTypeOfPlace !== "Type of Place" && (
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
                {formatLocationName(selectedPlace)}
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
                    console.log(place);
                    setSelectedPlace(place.properties.address_line1);
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
