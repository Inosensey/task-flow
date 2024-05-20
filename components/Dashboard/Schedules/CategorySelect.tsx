"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

// Libs
import { GetListOfPlaces } from "@/lib/locationMethods";

// Utils
import getLocationInfoInitial from "@/utils/getLocationInitialInfo";
import {
  getLocationCategories,
  getLocationKeys,
  getScheduleDetails,
} from "@/lib/scheduleMethods";
import { onClickListPlace, onClickLocationCategories, onClickLocationKeys } from "@/utils/categoriesActionEvents";

// Helpers
import { formatStringName } from "@/helpers/GeneralHelpers";

// Components
import Input from "@/components/ReusableComponents/inputs/Input";
import { MobileCatSelectOptions } from "@/components/Dashboard/Schedules/MobileSelectOptions";

//Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";
import CustomSelect from "@/components/ReusableComponents/inputs/CustomSelect";

// Types
import { TableRow } from "@/Types/database.types";
import {
  Feature,
  PlaceList,
  SelectedMobileOptionType,
  LocationInfoInput,
} from "@/Types/scheduleType";

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
    queryFn: () => getScheduleDetails(parseInt(scheduleId!)),
    enabled: formAction === "edit",
  });

  const detailsData =
    scheduleData !== undefined ? scheduleData.Response[0] : "";

  // State
  const [locationInfo, setLocationInfo] = useState<LocationInfoInput>(
    getLocationInfoInitial(formAction, scheduleData?.Response)
  );
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [showPlaceList, setShowPlaceList] = useState<boolean>(false);
  const [listPlace, setListPlace] = useState<PlaceList | undefined>(undefined);
  const [isGettingListPlaces, setIsGettingListPlaces] =
    useState<boolean>(false);
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);
  const [selectedMobileOptions, setSelectedMobileOptions] = useState<
    SelectedMobileOptionType[] | undefined
  >(undefined);
  const [mobileOptionType, setMobileOptionType] = useState<string>("");
  const [mobileOptionHeader, setMobileOptionHeader] = useState<string>("")

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
    setIsGettingListPlaces(true);
    const data = await getPlaces(place, categories);
    if (data !== undefined) {
      setListPlace((prev) => ({ ...prev, features: data.features }));
      setSelectedMobileOptions(data?.features);
    }
    setMobileOptionType("ListPlace");
    setIsGettingListPlaces(false);
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
          setToggleMobileOptions={setToggleOptions}
          setToggleDesktopOptions={setShowChoices}
          setSelectedMobileOptions={() => {
            setSelectedMobileOptions(locationKeyData);
            setMobileOptionType("Key");
            setMobileOptionHeader("Places")
          }}
        >
          {locationKeyData?.map((locationKeyInfo: TableRow<"LocationKeys">) => (
            <div
              onClick={() => {
                const onClickLocationKeyProps = {
                  setLocationInfo,
                  locationKeyInfo,
                  setShowChoices,
                };
                onClickLocationKeys(onClickLocationKeyProps);
              }}
              key={locationKeyInfo.key}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <p className="select-none">
                {formatStringName(locationKeyInfo.key)}
                {locationKeyInfo.description !== null && (
                  <span className="text-xs text-[#ccc]">
                    {" "}
                    - {locationKeyInfo.description}
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
            setToggleMobileOptions={setToggleOptions}
            setToggleDesktopOptions={setShowPlacesType}
            setSelectedMobileOptions={() => {
              setSelectedMobileOptions(locationCategoriesData);
              setMobileOptionType("Categories");
              setMobileOptionHeader("Type of Place")
            }}
          >
            {locationCategoriesData?.map(
              (locationCatInfo: TableRow<"LocationCategories">) =>
                locationInfo.selectedChoice?.id === locationCatInfo.keyId && (
                  <div
                    onClick={() => {
                      const SelectedPlaceType = `${locationInfo.selectedChoice.key}.${locationCatInfo.category}`;
                      const onClickLocationCatInfoProps = {
                        setLocationInfo,
                        locationCatInfo,
                        setShowPlacesType,
                      };
                      onClickLocationCategories(onClickLocationCatInfoProps)
                      handlePlaceTypeChange(place_id, SelectedPlaceType);
                    }}
                    key={locationCatInfo.id}
                    className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                  >
                    <p className="select-none">
                      {formatStringName(locationCatInfo.category)}
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
            setToggleDesktopOptions={setShowPlaceList}
            setToggleMobileOptions={setToggleOptions}
            dynamic={true}
            fetching={isGettingListPlaces}
            setSelectedMobileOptions={() => {
              setSelectedMobileOptions(listPlace?.features);
              setMobileOptionType("listPlace");
              setMobileOptionHeader("List of Places")
            }}
          >
            {listPlace?.features?.length !== 0 ? (
              listPlace?.features?.map((listPlaceInfo: Feature) => (
                <div
                  key={listPlaceInfo.properties.place_id}
                  onClick={() => {
                    const onClickListPlaceInfoProps = {
                      setLocationInfo,
                      listPlaceInfo,
                      setShowPlaceList,
                    };
                    onClickListPlace(onClickListPlaceInfoProps)
                  }}
                  className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                >
                  <p className="select-none">
                    {formatStringName(listPlaceInfo.properties.address_line1)}
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleOptions && (
          <MobileCatSelectOptions
          placeId={place_id}
            setToggleOptions={setToggleOptions}
            locationInfo={locationInfo}
            setLocationInfo={setLocationInfo}
            choices={selectedMobileOptions}
            optionType={mobileOptionType}
            handlePlaceTypeChange={handlePlaceTypeChange}
            header={mobileOptionHeader}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySelect;
