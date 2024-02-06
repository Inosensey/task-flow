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

// Types
import { TableRow } from "@/Types/database.types";

type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

type props = {
  scheduleInfo?: TableRow<"Schedules">;
  setShowPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  details: [
    TableRow<"Schedules"> & {
      LocationInfo: [
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
    }
  ];
};

const DetailedSchedule = ({ scheduleInfo, setShowPopUp, details }: props) => {
  // State
  const [isEditing, setIsEditing] = useState<boolean>(false);

  console.log(details);

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
    <Overlay>
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary p-3 phone:w-full phone:h-full"
      >
        <div className="flex justify-between items-center">
          <p className="py-0">Schedule Details</p>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-LightPrimary font-semibold text-lg">
            {details[0].title}
          </p>
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
          <p className="text-justify leading-7">{details[0].description}</p>
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
    </Overlay>
  );
};

export default DetailedSchedule;
