"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";

import Overlay from "@/components/ReusableComponents/Overlay";
import Input from "@/components/ReusableComponents/inputs/Input";

interface props {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type ScheduleInfo = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

const ScheduleForm = ({ setShowScheduleForm }: props) => {
  // States
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    timeStart: "",
    timeEnd: "",
    title: "",
    description: "",
    duration: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setScheduleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          <p className="py-0">Schedule Form</p>
          <p
            style={{ height: "max-content" }}
            className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
            onClick={() => {
              setShowScheduleForm((prev) => !prev);
            }}
          >
            X
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            state={scheduleInfo.title}
            type="text"
            name="title"
            placeholder="Enter the Title of your schedule"
            label="Title"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={null}
            validationMessage={""}
          />
          <Input
            state={scheduleInfo.title}
            type="text"
            name="date"
            placeholder=""
            label="Date"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={null}
            validationMessage={""}
          />
          <Input
            state={scheduleInfo.title}
            type="text"
            name="timeStart"
            placeholder=""
            label="Time Start"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={null}
            validationMessage={""}
          />
          <Input
            state={scheduleInfo.title}
            type="text"
            name="timeEnd"
            placeholder=""
            label="Time End"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={null}
            validationMessage={""}
          />
          <div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="bg-LightPrimary w-max px-4 py-1 rounded-md flex gap-1 my-0 mx-auto"
            >
              Save Schedule
              <span className="w-4">
                <FontAwesomeIcon className="text-sm" icon={faCalendarPlus} />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
};

export default ScheduleForm;
