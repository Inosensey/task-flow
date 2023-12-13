"use client";

import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Overlay from "@/components/ReusableComponents/Overlay";
import Input, {
  TextareaInput,
  TimeInput,
} from "@/components/ReusableComponents/inputs/Input";

// Actions
import { createSchedule } from "@/actions/scheduleActions";
import { TableRow } from "@/Types/database.types";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Import
import { useNotificationStore } from "@/store/useNotificationStore"

interface props {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type ScheduleInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

// Initial data for state
const initialScheduleInfo = {
  date: "",
  timeStart: "",
  timeEnd: "",
  title: "",
  description: "",
  duration: 0,
}

const ScheduleForm = ({ setShowScheduleForm }: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  const {setMessage, setShowSlideNotification} = useNotificationStore();
  
  const showNotificationTimer = () => {  
    const interval = setInterval(setShowSlideNotification, 3000);
  
    return () => clearInterval(interval);
  }

  // States
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>(initialScheduleInfo);

  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: (scheduleInfo: ScheduleInfo) => {
      return createSchedule(scheduleInfo);
    },
    onSuccess: (data) => {
      setScheduleInfo(initialScheduleInfo);
      setShowScheduleForm(false);
      setMessage("Schedule Successfully Added")
      setShowSlideNotification()
      showNotificationTimer();
      queryClient.setQueryData(
        ["schedules"],
        (oldData: TableRow<"Schedules">[]) =>
          oldData ? [...oldData, data] : oldData
      );
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setScheduleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
        className="bg-Primary p-3 phone:w-11/12 rounded-md"
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
          <TextareaInput
            name="description"
            label="Description"
            state={scheduleInfo.description}
            cols={30}
            rows={7}
            onChange={handleTextareaChange}
            onBlur={handleTextareaChange}
          />
          <div className={`flex gap-2`}>
            <TimeInput
              label="Date"
              name="date"
              state={scheduleInfo.date}
              type="date"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            <TimeInput
              label="Time Start"
              name="timeStart"
              state={scheduleInfo.timeStart}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            <TimeInput
              label="Time End"
              name="timeEnd"
              state={scheduleInfo.timeEnd}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className={`${isIdle || isSuccess ? "bg-LightPrimary text-LightSecondary" : ""} ${isPending && "bg-LightPrimaryDisabled text-Disabled"}  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
              onClick={() => {
                mutate(scheduleInfo);
              }}
            >
              {isIdle || isSuccess ? (
                <>
                  <span className="w-4">
                    <FontAwesomeIcon
                      className="text-sm"
                      icon={faCalendarPlus}
                    />
                  </span>
                  Save Schedule
                </>
              ) : ""}
              {isPending && (
                <>
                  <SvgSpinnersBlocksShuffle3 />
                  Saving Schedule
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Overlay>
  );
};

export default ScheduleForm;
