"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Utils
import supportedCategories, {
  formatCategoryKey,
  formatPlacesType,
} from "@/utils/supportedCatList";
import { GetListOfPlaces } from "@/lib/locationMethods";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

interface supportedCategoriesType {
  key: string;
  Description: string | null;
  categories: Array<string>;
}
interface props {
  place_id: string;
}
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

const CategorySelect = ({ place_id }: props) => {
  // Initialize query client
  const queryClient = useQueryClient();

  // State
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<string>("Places");
  const [selectedTypeOfPlace, setSelectedTypeOfPlace] =
    useState<string>("Type of Place");
  const [selectedPlace, setSelectedPlace] = useState<string>("Place List");
  const [listPlace, setListPlace] = useState<PlaceList | undefined>(undefined);
  const [isGettingListPlaces, setIsGettingListPlaces] =
    useState<boolean>(false);

  const handlePlaceTypeChange = async (place: string, categories: string) => {
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
            {formatCategoryKey(selectedChoice)}
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
          {supportedCategories.map((category: supportedCategoriesType) => (
            <div
              onClick={() => {
                setSelectedChoice(category.key);
                setShowChoices((prev) => !prev);
              }}
              key={category.key}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <p className="select-none">
                {formatCategoryKey(category.key)}
                {category.Description !== null && (
                  <span className="text-xs text-[#ccc]">
                    {" "}
                    - {category.Description}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Categories Select code end */}

      {/* Places type select code */}
      {selectedChoice !== "Places" && (
        <div className="relative phone:w-11/12">
          <div
            onClick={() => {
              setShowPlacesType((prev) => !prev);
            }}
            className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
          >
            <p className="select-none text-sm">
              {formatPlacesType(selectedTypeOfPlace)}
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
            {supportedCategories.map(
              (category: supportedCategoriesType) =>
                selectedChoice === category.key &&
                category.categories.map((placeType: string) => (
                  <div
                    onClick={() => {
                      setSelectedTypeOfPlace(placeType);
                      setShowPlacesType((prev) => !prev);
                      handlePlaceTypeChange(place_id, placeType);
                    }}
                    key={placeType}
                    className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                  >
                    <p className="select-none">{formatPlacesType(placeType)}</p>
                  </div>
                ))
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
                {formatPlacesType(selectedPlace)}
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
            {listPlace?.features.map((place: Feature) => (
              <div
                key={place.properties.place_id}
                className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
              >
                <p className="select-none">
                  {formatPlacesType(place.properties.address_line1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Places list select code end */}
    </div>
  );
};

export default CategorySelect;
