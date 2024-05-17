// Utils
import {
  onClickListPlace,
  onClickLocationCategories,
  onClickLocationKeys,
} from "@/utils/categoriesActionEvents";

// Helpers
import { formatStringName } from "@/helpers/GeneralHelpers";

// Types
import { TableRow } from "@/Types/database.types";
import {
  Feature,
  LocationInfoInput,
  SelectedMobileOptionType,
} from "@/Types/scheduleType";

interface props {
  choices?: SelectedMobileOptionType[];
  setToggleOptions: React.Dispatch<React.SetStateAction<boolean>>;
  locationInfo: LocationInfoInput;
  setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInput>>;
  optionType: string;
  handlePlaceTypeChange?: (
    place: string,
    categories: string | null
  ) => Promise<void>;
  placeId: string;
  header?: string;
}

export function MobileCatSelectOptions<T>({
  choices,
  placeId,
  optionType,
  header,
  handlePlaceTypeChange,
  setToggleOptions,
  setLocationInfo,
  locationInfo,
}: props) {
  const returnOptionsBaseOnType = () => {
    if (optionType === "Key") {
      const options = choices as TableRow<"LocationKeys">[];
      return (
        <>
          {options?.map((locationKeyInfo: TableRow<"LocationKeys">) => (
            <div
              onClick={() => {
                setToggleOptions(false);
                const onClickLocationKeyProps = {
                  setLocationInfo,
                  locationKeyInfo,
                };
                onClickLocationKeys(onClickLocationKeyProps);
              }}
              key={locationKeyInfo.key}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">
                  {formatStringName(locationKeyInfo.key)}
                </p>
                {locationKeyInfo.description !== null && (
                  <p className="text-xs text-[#ccc]">
                    {locationKeyInfo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </>
      );
    }
    if (optionType === "Categories") {
      const options = choices as TableRow<"LocationCategories">[];
      return (
        <>
          {options?.map(
            (locationCatInfo: TableRow<"LocationCategories">) =>
              locationInfo.selectedChoice?.id === locationCatInfo.keyId && (
                <div
                  onClick={() => {
                    const SelectedPlaceType = `${locationInfo.selectedChoice.key}.${locationCatInfo.category}`;
                    const onClickLocationCatInfoProps = {
                      setLocationInfo,
                      locationCatInfo,
                    };
                    onClickLocationCategories(onClickLocationCatInfoProps);
                    handlePlaceTypeChange &&
                      handlePlaceTypeChange(placeId, SelectedPlaceType);
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
        </>
      );
    }
    if (optionType === "listPlace") {
      const options = choices as Feature[];
      return (
        <>
          {options.length !== 0 ? (
            options.map((listPlaceInfo: Feature) => (
              <div
                key={listPlaceInfo.properties.place_id}
                onClick={() => {
                  const onClickListPlaceInfoProps = {
                    setLocationInfo,
                    listPlaceInfo,
                  };
                  onClickListPlace(onClickListPlaceInfoProps);
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
        </>
      );
    }
  };

  return (
    <div
      onClick={() => setToggleOptions(false)}
      className="h-screen w-screen flex justify-center absolute top-0 -left-[0.1px] bg-black/[.54] table:items-center "
    >
      <div className="phone:w-10/12 phone:mt-24 tablet:max-w-[450px]">
        <div className="bg-Primary max-h-[400px] rounded-sm">
          <div className="py-1 px-2 border-b-2 border-b-LightPrimaryDisabled">
            <p>{header}</p>
          </div>
          <div className="overflow-auto max-h-[350px]">
            <div className="flex flex-col gap-2">
              {returnOptionsBaseOnType()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
