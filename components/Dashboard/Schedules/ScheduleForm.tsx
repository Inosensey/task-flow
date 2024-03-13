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
import { getScheduleDetails } from "@/lib/scheduleMethods";

// Typescript
import {GeneralInfo, ScheduleInfo} from "@/Types/scheduleType";
import { useFormSerialize } from "@/utils/formUtils";

interface props {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleId: string | null;
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
};

const ScheduleForm = ({ setShowScheduleForm, scheduleId }: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();
  const { setValidation, validations, resetValidation, formAction } =
    useScheduleFormStore();

  // Use query
  const {
    data: scheduleData,
    error: scheduleError,
    isFetched: scheduleIsFetched,
  } = useQuery({
    queryKey: [`Schedule#${scheduleId}`],
    queryFn: () => getScheduleDetails(scheduleId!),
    enabled: formAction === "edit",
  });
  console.log(scheduleData);

  // Initial Schedule Info
  const initialGeneralInfo: GeneralInfo = {
    date:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].date!
        : "",
    timeStart:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].timeStart!
        : "",
    timeEnd:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].timeEnd!
        : "",
    title:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].title!
        : "",
    description:
      formAction !== "add" && scheduleData !== undefined
        ? scheduleData[0].description!
        : "",
  };

  // States
  const [generalInfo, setGeneralInfo] =
    useState<GeneralInfo>(initialGeneralInfo);

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

  const onScheduleAddSuccess = () => {
    setMessage("Schedule Successfully Added");
    setShowSlideNotification();
    hideNotificationTimer();
    setShowScheduleForm(false);
  };

  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldsToCheck = ["date", "title", "timeStart", "timeEnd", "city"];
    const formValues: ScheduleInfo = useFormSerialize(event);
    if (scheduleFormValidate(fieldsToCheck, formValues)) {
      console.log("valid");
      mutate(formValues);
    } else {
      console.log("not valid");
      return;
    }
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };

  const scheduleFormValidate = (
    fieldsToCheck: Array<string>,
    formValues: ScheduleInfo
  ) => {
    let isValid = true;
    fieldsToCheck.some((field) => {
      if (formValues[field] === "") {
        isValid = false;
        const validationParams = {
          value: formValues[field],
          stateName: field,
        };
        const result: validation = FormValidation(validationParams);
        setValidation(result);
      }
    });
    return isValid;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };

    setGeneralInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    const result: validation = FormValidation(validationParams);
    setValidation(result);
    // setValidationResult(result, setGeneralInfoValidation)
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setGeneralInfo((prev) => ({
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
        onSubmit={useHandleFormSubmit}
      >
        <div className="flex justify-between items-center">
          <p className="py-0">Schedule Form</p>
          <p
            style={{ height: "max-content" }}
            className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
            onClick={() => {
              resetValidation();
              setShowScheduleForm((prev) => !prev);
            }}
          >
            X
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            state={generalInfo.title}
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
            state={generalInfo.description}
            cols={30}
            rows={7}
            onChange={handleTextareaChange}
            onBlur={handleTextareaChange}
          />
          <div className={`flex gap-2`}>
            <TimeInput
              label="Date"
              name="date"
              state={generalInfo.date}
              type="date"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              valid={validations?.date?.valid}
              validationMessage={validations?.date?.validationMessage}
            />
            <TimeInput
              label="Time Start"
              name="timeStart"
              state={generalInfo.timeStart}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              valid={validations?.timeStart?.valid}
              validationMessage={validations?.timeStart?.validationMessage}
            />
            <TimeInput
              label="Time End"
              name="timeEnd"
              state={generalInfo.timeEnd}
              type="time"
              onChange={handleInputChange}
              onBlur={handleInputChange}
              valid={validations?.timeEnd?.valid}
              validationMessage={validations?.timeEnd?.validationMessage}
            />
          </div>
          <div>
            <LocationInput scheduleId={scheduleId} />
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
