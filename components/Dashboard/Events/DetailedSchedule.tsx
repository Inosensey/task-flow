import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Overlay from "@/components/ReusableComponents/Overlay";

type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

type props = {
  scheduleInfo: schedule;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailedSchedule = ({ scheduleInfo, setShowPopUp }: props) => {
  //   if (showPopUp === false) return;

  // Variants
  const popUpVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.25,
      },
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.25,
      },
    },
  };
  return (
    <Overlay>
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary p-3 phone:w-11/12"
      >
        <div className="flex justify-between items-center">
          <p className="py-0">Schedule Details</p>
          <p
            style={{ height: "max-content" }}
            className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
            onClick={() => {
              setShowPopUp((prev) => !prev);
            }}
          >
            X
          </p>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-LightPrimary font-semibold text-lg">{scheduleInfo.title}</p>
          <div className="phone:w-10/12 flex items-center gap-1">
            <span className="w-4">
              <FontAwesomeIcon
                className="text-sm text-LightPrimary"
                icon={faClock}
              />
            </span>
            <div className="flex gap-1 text-sm">
              <p>{scheduleInfo.timeStart}</p>
              {scheduleInfo.timeEnd !== "" && (
                <span className="w-4">
                  <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                </span>
              )}
              <p>{scheduleInfo.timeEnd}</p>
            </div>
          </div>
          <p className="text-justify leading-7">{scheduleInfo.description}</p>
        </div>
      </motion.div>
    </Overlay>
  );
};

export default DetailedSchedule;
