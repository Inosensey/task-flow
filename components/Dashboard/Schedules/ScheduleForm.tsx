"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import Overlay from "@/components/ReusableComponents/Overlay";
import Input, {
  TextareaInput,
  TimeInput,
} from "@/components/ReusableComponents/inputs/Input";
import LocationInput from "@/components/Dashboard/Schedules/LocationInput";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Actions
import { createSchedule } from "@/actions/scheduleActions";

// Types
import { TableRow } from "@/Types/database.types";

// store
import { useNotificationStore } from "@/store/useNotificationStore";
import FormValidation from "@/utils/validation";

// Validation
import { setValidationResult } from "@/utils/validation";
import { useScheduleFormStore } from "@/store/useScheduleFormStore";

// Typescript
interface props {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface generalInfoValidation {
  [key: string]: {
    valid: null | boolean;
    validationMessage: string;
  };
}

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
}

type ScheduleInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  city: string;
  categoryKeyId: string;
  categoryKey: string;
  namePlace: string;
  lat: string;
  long: string;
};

// Initial data for state
const initialScheduleInfo: ScheduleInfo = {
  date: "",
  timeStart: "",
  timeEnd: "",
  title: "",
  description: "",
  city: "",
  categoryKeyId: "",
  categoryKey: "",
  namePlace: "",
  lat: "",
  long: "",
};

// Set state initial data
const initialValidation: generalInfoValidation = {
  title: {
    valid: null,
    validationMessage: "",
  },
};

const ScheduleForm = ({ setShowScheduleForm }: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();
  const { setValidation, validations } = useScheduleFormStore();

  const onScheduleAddSuccess = () => {
    setScheduleInfo(initialScheduleInfo);
    setMessage("Schedule Successfully Added");
    setShowSlideNotification();
    hideNotificationTimer();
    setShowScheduleForm(false);
  };

  // States
  const [scheduleInfo, setScheduleInfo] =
    useState<ScheduleInfo>(initialScheduleInfo);

  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: (scheduleInfo: ScheduleInfo) => {
      return createSchedule(scheduleInfo);
    },
    onSuccess: (data) => {
      onScheduleAddSuccess();
      queryClient.setQueryData(
        ["schedules"],
        (oldData: TableRow<"Schedules">[]) =>
          oldData ? [...oldData, data] : oldData
      );
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: ScheduleInfo = {
      date: formData.get("date") as string,
      timeStart: formData.get("timeStart") as string,
      timeEnd: formData.get("timeEnd") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      city: formData.get("city") as string,
      categoryKeyId: formData.get("categoryKeyId") as string,
      categoryKey: formData.get("categoryKey") as string,
      namePlace: formData.get("namePlace") as string,
      lat: formData.get("lat") as string,
      long: formData.get("long") as string,
    };
    mutate(formValues);
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };

    setScheduleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    const result:validation = FormValidation(validationParams);
    setValidation(result);
    // setValidationResult(result, setGeneralInfoValidation)
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
      <motion.form
        variants={popUpVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary p-3 phone:w-11/12 rounded-md"
        onSubmit={handleFormSubmit}
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
            valid={validations?.title?.valid}
            validationMessage={validations?.title?.validationMessage}
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
              valid={validations?.date?.valid}
              validationMessage={validations?.date?.validationMessage}
            />
            <TimeInput
              label="Time Start"
              name="timeStart"
              state={scheduleInfo.timeStart}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              valid={validations?.timeStart?.valid}
              validationMessage={validations?.timeStart?.validationMessage}
            />
            <TimeInput
              label="Time End"
              name="timeEnd"
              state={scheduleInfo.timeEnd}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              valid={validations?.timeEnd?.valid}
              validationMessage={validations?.timeEnd?.validationMessage}
            />
          </div>
          <div>
            <LocationInput />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isIdle || isSuccess ? "bg-LightPrimary text-LightSecondary" : ""
              } ${
                isPending && "bg-LightPrimaryDisabled text-Disabled"
              }  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
              type="submit"
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
              ) : (
                ""
              )}
              {isPending && (
                <>
                  <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                  Saving Schedule
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </Overlay>
  );
};

export default ScheduleForm;
