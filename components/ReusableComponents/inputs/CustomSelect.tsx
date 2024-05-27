"use client";

import React, { useState } from "react";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Utils
import { formatStringName } from "@/helpers/GeneralHelpers";

// Types
import { TableRow } from "@/Types/database.types";
import { getMobileSelectOption } from "@/utils/getMobileSelectOption";
interface props {
  placeHolder: string;
  children: React.ReactNode;
  selected: string;
  showChoices: boolean;
  setToggleDesktopOptions?: () => void;
  setToggleMobileOptions?: () => void;
  setSelectedMobileOptions?: () => void;
  dynamic?: boolean;
  fetching?: boolean;
}

interface MobileSelectOptionsProps<T> {
  choices?: Array<any>;
  setState: React.Dispatch<React.SetStateAction<T>>;
  setToggleMobileOptions: React.Dispatch<React.SetStateAction<boolean>>;
  optionType: string;
  header?: string;
}

const CustomSelect = ({
  placeHolder,
  selected,
  children,
  showChoices,
  setToggleDesktopOptions,
  setToggleMobileOptions,
  dynamic = false,
  fetching = false,
  setSelectedMobileOptions,
}: props) => {
  const windowCurrentWidth = window.innerWidth;

  return (
    <div className="relative phone:w-11/12">
      <div
        onClick={() => {
          if (windowCurrentWidth >= 280 && windowCurrentWidth <= 768) {
            setSelectedMobileOptions && setSelectedMobileOptions();
            setToggleMobileOptions && setToggleMobileOptions();
          } else {
            setToggleDesktopOptions && setToggleDesktopOptions();
          }
        }}
        className="rounded-md bg-Secondary flex justify-between px-2 items-center cursor-pointer phone:h-9 "
      >
        {CheckSelectType(dynamic, fetching, selected, placeHolder, showChoices)}
      </div>
      <div
        style={{ maxHeight: showChoices ? "224px" : "0px" }}
        className="phone:text-sm  transition-all rounded-md absolute top-10 bg-Secondary overflow-auto z-[100] w-full"
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
          {formatStringName(selected === placeHolder ? placeHolder : selected)}
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

export function MobileSelectOptions<T,>({
  optionType,
  setToggleMobileOptions,
  choices,
  header,
  setState
}: MobileSelectOptionsProps<T>) {
  const mobileOptions = getMobileSelectOption({
    optionType,
    setState,
    setToggleMobileOptions,
    choices
  });
  return (
    <div
      onClick={() => {
        setToggleMobileOptions(false);
      }}
      className="h-screen w-screen flex justify-center absolute top-0 -left-[0.1px] bg-black/[.54] table:items-center "
    >
      <div className="phone:w-10/12 phone:mt-24 tablet:max-w-[450px]">
        <div className="bg-Primary max-h-[400px] rounded-sm">
          <div className="py-1 px-2 border-b-2 border-b-LightPrimaryDisabled">
            <p>{header}</p>
          </div>
          <div className="overflow-auto max-h-[350px]">
            <div className="flex flex-col gap-2">{mobileOptions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSelect;
