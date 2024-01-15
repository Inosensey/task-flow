"use client";

import { useState } from "react";

// icones
import MaterialSymbolsArrowBackIosNewRounded from "@/Icones/MaterialSymbolsArrowBackIosNewRounded";

interface props {
  onClickFunc: (selected: string) => void;
  placeHolder: string;
  choices: Array<string>;
}

const CustomSelect = ({ onClickFunc, placeHolder, choices }: props) => {
  // State
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<string>(placeHolder);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setShowChoices((prev) => !prev);
        }}
        className="rounded-md bg-SmoothDark flex justify-between px-2 items-center cursor-pointer phone:w-40 phone:h-9 mdphone:w-44"
      >
        <p className="select-none text-sm">{selectedChoice}</p>
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
        className="phone:text-sm transition-all rounded-md absolute top-10 bg-SmoothDark overflow-auto z-[100] phone:w-40 mdphone:w-44"
      >
        {choices.map((choice: string) => (
          <div
            onClick={() => {
              onClickFunc(choice);
              setSelectedChoice(choice);
            }}
            key={Math.random() * 1000}
            className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer"
          >
            <p className="select-none">{choice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
