"use client";

import { useState } from "react";

import supportedCategories, {
  formatCategoryKey, formatPlacesType,
} from "@/utils/supportedCatList";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";

interface supportedCategoriesType {
  key: string;
  Description: string | null;
  categories: Array<string>;
}
interface props {
  onClickFunc: (selected: string) => void;
  placeHolder: string;
  choices: Array<string>;
  CategoriesData: Array<supportedCategoriesType>;
}

const CategorySelect = () => {
  // State
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showPlacesType, setShowPlacesType] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<string>("Places");
  const [selectedTypeOfPlace, setSelectedTypeOfPlace] =
    useState<string>("Type of Place");

  return (
    <div className="flex flex-col gap-1">
      <div className="relative phone:w-11/12">
        <div
          onClick={() => {
            setShowChoices((prev) => !prev);
          }}
          className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
        >
          <p className="select-none text-sm">{formatCategoryKey(selectedChoice)}</p>
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
      {selectedChoice !== "Places" && (
        <div className="relative phone:w-11/12">
          <div
            onClick={() => {
              setShowPlacesType((prev) => !prev);
            }}
            className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
          >
            <p className="select-none text-sm">{formatPlacesType(selectedTypeOfPlace)}</p>
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
                    }}
                    key={placeType}
                    className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
                  >
                    <p className="select-none">
                      {formatPlacesType(placeType)}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
