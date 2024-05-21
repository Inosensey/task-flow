"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

// Libs
import { GetListOfPlaces } from "@/lib/locationMethods";

// Utils
import { getLocationInfoInitial } from "@/utils/stateInitials";
import {
  useGetScheduleDetails,
  useLocationCategories,
  useLocationKeys,
} from "@/utils/TanStackQueryFns";

// Components
import Input from "@/components/ReusableComponents/inputs/Input";
import { MobileCatSelectOptions } from "@/components/Dashboard/Schedules/MobileSelectOptions";

//Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";
import CustomSelect from "@/components/ReusableComponents/inputs/CustomSelect";

// Types
import {
  Feature,
  PlaceList,
  SelectedMobileOptionType,
  LocationInfoInput,
} from "@/Types/scheduleType";
import { DesktopSelectOptions } from "./DesktopSelectOptions";
interface props {
  place_id: string;
  scheduleId: string | null;
}

const CategorySelect = ({ place_id, scheduleId }: props) => {
  const windowCurrentWidth = window.innerWidth;

  // Initialize query client
  const queryClient = useQueryClient();

  // Store
  const { formAction } = useScheduleFormStore();

  // Use Query
  const locationKeyData = useLocationKeys();
  const locationCategoriesData = useLocationCategories();
  const { scheduleData } = useGetScheduleDetails(scheduleId, formAction);
  const detailsData = scheduleData !== undefined ? scheduleData.Response : "";

  // State
  const [locationInfo, setLocationInfo] = useState<LocationInfoInput>(
    getLocationInfoInitial(formAction, scheduleData?.Response)
  );
  const [optionType, setOptionType] = useState<string>("");
  // Toggle desktop options UI
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);

  const [listPlace, setListPlace] = useState<PlaceList | undefined>(undefined);
  const [gettingListOfPlaces, setGettingListOfPlaces] =
    useState<boolean>(false);

  // Toggle mobile options UI
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<
    SelectedMobileOptionType[] | undefined
  >(undefined);
  const [toggleMobileOptions, setToggleMobileOptions] =
    useState<boolean>(false);
  const [mobileOptionHeader, setMobileOptionHeader] = useState<string>("");

  async function getPlaces(place: string, categories: string | null) {
    if (!categories) return;
    const data = await queryClient.fetchQuery({
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
    setGettingListOfPlaces(true);
    const data = await getPlaces(place, categories);
    if (data !== undefined) {
      setListPlace((prev) => ({ ...prev, features: data.features }));
      setSelectedMobileOptions(data?.features);
    }
    setGettingListOfPlaces(false);
    setOptionType("ListPlace");
  };

  useEffect(() => {
    if (formAction !== "add" && scheduleData !== undefined) {
      const SelectedPlaceType = `${detailsData.ScheduleLocation[0].LocationKeys.key}.${detailsData.ScheduleLocation[0].LocationCategories.category}`;
      const setPlacesList = async () => {
        const data = await getPlaces(
          detailsData.ScheduleLocation[0].cityId!,
          SelectedPlaceType
        );

        if (data !== undefined) {
          setListPlace((prev) => ({ ...prev, features: data.features }));
          setSelectedMobileOptions(data?.features);
        }
      };
      setPlacesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1">
        {/* Categories Select code */}
        <CustomSelect
          selected={locationInfo.selectedChoice?.key!}
          placeHolder={locationInfo.selectedChoice?.key!}
          showChoices={showChoices}
          setToggleMobileOptions={() => {
            setToggleMobileOptions((prev) => !prev);
            setOptionType("Key");
            setMobileOptionHeader("Places");
          }}
          setToggleDesktopOptions={() => {
            setShowChoices((prev) => !prev);
            setShowPlacesType(false)
            setShowPlaceList(false)
            setOptionType("Key");
          }}
          setSelectedMobileOptions={() => {
            setSelectedMobileOptions(locationKeyData);
          }}
        >
          {windowCurrentWidth >= 769 && optionType === "Key" && (
            <DesktopSelectOptions
              placeId={place_id}
              optionType={optionType}
              locationInfo={locationInfo}
              setLocationInfo={setLocationInfo}
              setToggleOptions={setShowChoices}
              choices={locationKeyData}
            />
          )}
        </CustomSelect>
        {/* Categories Select code end */}

        {/* Places type select code */}
        {locationInfo.selectedChoice?.key !== "Places" && (
          <CustomSelect
            selected={locationInfo.selectedTypeOfPlace!}
            placeHolder={locationInfo.selectedTypeOfPlace!}
            showChoices={showPlacesType}
            setToggleMobileOptions={() => {
              setToggleMobileOptions((prev) => !prev);
              setOptionType("Categories");
              setMobileOptionHeader("Type of Place");
            }}
            setToggleDesktopOptions={() => {
              setShowPlacesType((prev) => !prev);
              setShowChoices(false)
              setShowPlaceList(false)
              setOptionType("Categories");
            }}
            setSelectedMobileOptions={() => {
              setSelectedMobileOptions(locationCategoriesData);
            }}
          >
            {windowCurrentWidth >= 769 && optionType === "Categories" && (
              <DesktopSelectOptions
                placeId={place_id}
                optionType={optionType}
                locationInfo={locationInfo}
                setLocationInfo={setLocationInfo}
                setToggleOptions={setShowPlacesType}
                choices={locationCategoriesData}
                handlePlaceTypeChange={handlePlaceTypeChange}
              />
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
            setToggleMobileOptions={() => {
              setToggleMobileOptions((prev) => !prev);
              setOptionType("listPlace");
              setMobileOptionHeader("Found Places");
            }}
            setToggleDesktopOptions={() => {
              setShowPlaceList((prev) => !prev);
              setShowPlacesType(false)
              setShowChoices(false)
              setOptionType("listPlace");
            }}
            setSelectedMobileOptions={() => {
              setSelectedMobileOptions(listPlace?.features);
            }}
            dynamic={true}
            fetching={gettingListOfPlaces}
          >
            {windowCurrentWidth >= 769 && optionType === "listPlace" && (
              <DesktopSelectOptions
                placeId={place_id}
                optionType={optionType}
                locationInfo={locationInfo}
                setLocationInfo={setLocationInfo}
                setToggleOptions={setShowPlaceList}
                choices={listPlace?.features}
              />
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleMobileOptions && (
          <MobileCatSelectOptions
            placeId={place_id}
            setToggleMobileOptions={setToggleMobileOptions}
            locationInfo={locationInfo}
            setLocationInfo={setLocationInfo}
            choices={selectedMobileOptions}
            optionType={optionType}
            handlePlaceTypeChange={handlePlaceTypeChange}
            header={mobileOptionHeader}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySelect;
