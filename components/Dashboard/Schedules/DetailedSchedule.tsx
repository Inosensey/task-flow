"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Overlay from "@/components/ReusableComponents/Overlay";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";

// Types
import { TableRow } from "@/Types/database.types";
import DisplayMap from "@/components/ReusableComponents/DisplayMap";

type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};
type LocationInfo = [
  {
    city: string;
    LocationCategories: {
      id: number;
      category: string;
    };
    LocationKeys: {
      id: number;
      key: string;
    };
  }
];

type props = {
  scheduleInfo?: TableRow<"Schedules">;
  setShowPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  details: [
    TableRow<"Schedules"> & {
      ScheduleLocation: [
        {
          city: string;
          namePlace: string;
          LocationCategories: {
            id: number;
            category: string;
          };
          LocationKeys: {
            id: number;
            key: string;
          };
        }
      ];
    }
  ];
};

const DetailedSchedule = ({ scheduleInfo, setShowPopUp, details }: props) => {
  // State
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const locationDetails = details[0].ScheduleLocation[0];
  console.log(details[0]);

  // Variants
  const popUpVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  return (
    <>
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary relative p-3 phone:w-full phone:h-full"
      >
        <div className="mt-2 flex flex-col">
          <div className="bg-Secondary p-2 rounded-md">
            <p className="text-LightPrimary font-semibold text-lg">
              {details[0].title}
            </p>
            <div className="font-semibold text-sm text-LightSecondary">
              <p className="flex items-center">
                <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                {locationDetails.namePlace},
              </p>
              <p className="flex items-center">
                <MaterialSymbolsLocationCityRounded color="#00ADB5" />
                {locationDetails.city}
              </p>
            </div>
            <div className="phone:w-10/12 flex items-center gap-1">
              <span className="w-4">
                <FontAwesomeIcon
                  className="text-sm text-LightPrimary"
                  icon={faClock}
                />
              </span>
              <div className="flex gap-1 text-sm">
                <p>{details[0].timeStart}</p>
                {details[0].timeEnd !== "" && (
                  <span className="w-4">
                    <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                  </span>
                )}
                <p>{details[0].timeEnd}</p>
              </div>
            </div>
            <button className="text-xs bg-LightPrimary w-max px-3 py-[0.2rem] rounded-md flex gap-1 mt-3">
              View Map
            </button>
          </div>
          <div className="p-2">
            <p className="text-lg font-semibold text-LightPrimary">
              Description
            </p>
            <p className="text-justify leading-6">{details[0].description}</p>
          </div>
        </div>
        <div className="flex justify-between">
          {isEditing ? (
            <div className="flex w-full justify-between">
              <motion.button
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className="bg-Success w-max px-3 py-[0.1rem] rounded-md flex gap-1 mt-3 items-center"
              >
                <span className="w-4">
                  <FontAwesomeIcon
                    className="text-sm text-LightSecondary"
                    icon={faCheck}
                  />
                </span>
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className="border-2 border-Error w-max px-3 py-[0.1rem] rounded-md flex gap-1 mt-3 text-Error"
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
              >
                <span className="w-4">
                  <FontAwesomeIcon className="text-sm" icon={faXmark} />
                </span>
                Cancel
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
              className="bg-LightPrimary w-max px-4 py-[0.1rem] rounded-md flex gap-1 mt-3"
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            >
              <span className="w-4">
                <FontAwesomeIcon
                  className="text-sm text-LightSecondary"
                  icon={faPenToSquare}
                />
              </span>
              Edit
            </motion.button>
          )}
        </div>
      </motion.div>
      <DisplayMap />
    </>
  );
};

export default DetailedSchedule;
