"use client";

import { useState } from "react";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Utils
import { formatStringName } from "@/helpers/GeneralHelpers";

// Types
interface props {
  placeHolder: string;
  children: React.ReactNode;
  selected: string;
  showChoices: boolean;
  setShowChoices: React.Dispatch<React.SetStateAction<boolean>>;
  dynamic?: boolean;
  fetching?: boolean;
}

const CustomSelect = ({
  placeHolder,
  selected,
  children,
  showChoices,
  setShowChoices,
  dynamic = false,
  fetching = false,
}: props) => {
  return (
    <div className="relative phone:w-11/12">
      <div
        onClick={() => {
          setShowChoices((prev) => !prev);
        }}
        className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
      >
        {CheckSelectType(dynamic, fetching, selected, placeHolder, showChoices)}
      </div>
      <div
        style={{ maxHeight: showChoices ? "224px" : "0px" }}
        className="phone:text-sm transition-all rounded-md absolute top-10 bg-Secondary overflow-auto z-[100] w-full"
      >
        {children}
      </div>
    </div>
  );
};

function CheckSelectType(
  dynamic: boolean,
  fetching: boolean,
  selected: string,
  placeHolder: string,
  showChoices: boolean
) {
  if (dynamic) {
    return (
      <>
        {fetching ? (
          <div className="flex gap-4">
            <p className="select-none text-sm text-Disabled">Loading Places</p>
            <span>
              <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
            </span>
          </div>
        ) : (
          <>
            <p className="select-none text-sm">
              {formatStringName(
                selected === placeHolder ? placeHolder : selected
              )}
            </p>
            <span
              className="transition-all"
              style={{
                transform: showChoices ? "rotate(-90deg)" : "rotate(0deg)",
              }}
            >
              <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
            </span>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <p className="select-none text-sm">
          {formatStringName(
            selected === placeHolder ? placeHolder : selected
          )}
        </p>
        <span
          className="transition-all"
          style={{
            transform: showChoices ? "rotate(-90deg)" : "rotate(0deg)",
          }}
        >
          <MaterialSymbolsArrowBackIosNewRounded color="#fff" />
        </span>
      </>
    );
  }
}

export default CustomSelect;
