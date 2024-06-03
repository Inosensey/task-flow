"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDoubleLeft,
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Import components
import ScheduleForm from "./ScheduleForm";
import DisplayMap from "@/components/ReusableComponents/DisplayMap";

// Import icones
import MaterialSymbolsLocationCityRounded from "@/Icones/MaterialSymbolsLocationCityRounded";

// Utils
import { formatHourTo12 } from "@/utils/useDate";

// Store
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// Types
import { TableRow } from "@/Types/database.types";
import { ScheduleDetails } from "@/Types/scheduleType";
import { getScheduleDetails } from "@/lib/TanStackQueryFns";
type props = {
  scheduleId: string;
  scheduleInfo?: TableRow<"Schedules">;
  setShowPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  details: reactQueryType;
};
type mapAttrInfo = {
  width: string;
  height: string;
  lon: string;
  lat: string;
  iconType: string;
};
interface reactQueryType {
  schedule: ScheduleDetails[]
}

const DetailedSchedule = ({ details, scheduleId }: props) => {
  // Use query
  const {
    data: data,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(parseInt(scheduleId)),
    initialData: details,

  });
  // Store
  const { setFormAction } = useScheduleFormStore();

  // State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [mapToggle, setMapToggle] = useState<boolean>(false);
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);

  console.log(data)

  const detailsData = data as unknown as reactQueryType
  const locationDetails = detailsData.schedule[0].ScheduleLocation[0];

  const mapAttrInfo: mapAttrInfo = {
    height: "400",
    width: "600",
    lon: locationDetails.long,
    lat: locationDetails.lat,
    iconType: "landmark",
  };

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
        <Link href={`/dashboard/schedules`}>
          <motion.button
            className="text-base text-LightPrimary w-max px-3 py-[0.3rem] rounded-md flex gap-1 items-center"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon className="text-sm" icon={faAngleDoubleLeft} />
            Schedules
          </motion.button>
        </Link>
        <div className="mt-2 flex flex-col">
          <div className="bg-Secondary p-2 rounded-md">
            <p className="text-LightPrimary font-semibold text-lg">
              {detailsData.schedule[0].title}
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
                <p>{formatHourTo12(detailsData.schedule[0].timeStart)}</p>
                {detailsData.schedule[0].timeEnd !== "" && (
                  <span className="w-4">
                    <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                  </span>
                )}
                <p>{formatHourTo12(detailsData.schedule[0].timeEnd)}</p>
              </div>
            </div>
            <motion.button
              className="text-xs bg-LightPrimary w-max px-3 py-[0.2rem] rounded-md flex gap-1 mt-3"
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setMapToggle((prev) => !prev);
              }}
            >
              View Map
            </motion.button>
          </div>
          <div className="p-2">
            <p className="text-lg font-semibold text-LightPrimary">
              Description
            </p>
            <p className="text-justify leading-6">{detailsData.schedule[0].description}</p>
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
                setShowScheduleForm((prev) => !prev);
                setFormAction("edit");
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

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {mapToggle && (
          <DisplayMap setMapToggle={setMapToggle} mapAttrInfo={mapAttrInfo} />
        )}
        {showScheduleForm && (
          <ScheduleForm
            setShowScheduleForm={setShowScheduleForm}
            scheduleId={scheduleId}
            scheduleData={detailsData.schedule}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailedSchedule;
