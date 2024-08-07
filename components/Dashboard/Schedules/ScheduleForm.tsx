"use client";

// Core
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useFormState } from "react-dom";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import Input, {
  TextareaInput,
  TimeInput,
} from "@/components/ReusableComponents/inputs/Input";

// Icons
import LocationInput from "@/components/Dashboard/Schedules/LocationInput";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";

// Actions
import { mutateSchedule } from "@/actions/scheduleActions";

// store
import { useNotificationStore } from "@/store/useNotificationStore";
import { useDateStore } from "@/store/useDateStore";
import { useFormStore } from "@/store/useFormStore";

// Utils
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";
import { getCurrentDate } from "@/utils/useDate";
import FormValidation from "@/utils/validation";

// Typescript
import {
  GeneralInfo,
  ScheduleDetails,
  ScheduleInfo,
} from "@/Types/scheduleType";
import { useFormStateType } from "@/Types/formStates";
import { TableInsert, TableRow } from "@/Types/database.types";
import Loading from "@/components/ReusableComponents/Loading/Loading";
interface props {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleId: string | null;
  scheduleData?: ScheduleDetails[] | null;
}

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};
interface reactQueryType {
  schedule: ScheduleDetails[];
}

// Initials
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const ScheduleForm = ({
  setShowScheduleForm,
  scheduleId,
  scheduleData,
}: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();
  const { setValidation, validations, resetValidation, formAction } =
    useFormStore();
  const { setDate } = useDateStore();

  // UseFormState
  const [state, action] = useFormState(mutateSchedule, useFormStateInitials);

  // Initial Schedule Info
  const detailsData = scheduleData ? scheduleData[0] : undefined;
  const initialGeneralInfo: GeneralInfo = {
    id:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.id.toString()
        : "",
    date:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.date!
        : getCurrentDate(),
    timeStart:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.timeStart!
        : "09:00",
    timeEnd:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.timeEnd!
        : "17:00",
    title:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.title!
        : "",
    description:
      formAction !== "add" && scheduleData !== undefined
        ? detailsData!.description!
        : "",
  };

  // States
  const [generalInfo, setGeneralInfo] =
    useState<GeneralInfo>(initialGeneralInfo);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  const onScheduleAddSuccess = () => {
    const notifMessage =
      formAction === "add"
        ? "Schedule Successfully Added"
        : "Schedule Successfully Updated";
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
    setShowScheduleForm(false);
  };

  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    const fieldsToCheck = ["title", "priorityLevel", "frequency"];
    let formValues: TableInsert<"Schedules"> & { [key: string]: string } =
      useFormSerialize(event);
    if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
      event.preventDefault();
      setIsPending(false);
    }
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

    setGeneralInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    const result: validation = FormValidation(validationParams);
    setValidation(result);
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

  // UseEffect
  useEffect(() => {
    if (state.success) {
      if (formAction === "add") {
        const data = state.data[0] as TableRow<"Schedules">;
        queryClient.invalidateQueries({ queryKey: ["schedules"] });
        setDate(data!.date!);
      } else {
        queryClient.invalidateQueries({ queryKey: [`Schedule#${scheduleId}`] });
      }
      setIsPending(false);
      onScheduleAddSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
        action={action}
        className="bg-Primary p-3 rounded-md phone:w-11/12 phone:mt-2 phone:h-max tablet:max-w-[420px]"
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
        <div className="mt-4 flex flex-col gap-4 ">
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
            rows={3}
            onChange={handleTextareaChange}
            onBlur={handleTextareaChange}
          />
          <div className={`flex gap-1`}>
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
            <div className="flex gap-1">
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
          </div>
          <LocationInput scheduleId={scheduleId} />
          <Input
            state={formAction}
            type="hidden"
            name="action"
            placeholder="Enter the Title of your schedule"
          />
          <Input
            state={generalInfo.id}
            type="hidden"
            name="scheduleId"
            placeholder="Enter the Title of your schedule"
          />
          <div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isPending === null || isPending === false
                  ? "bg-LightPrimary text-LightSecondary"
                  : ""
              } ${
                isPending && "bg-LightPrimaryDisabled text-Disabled"
              }  w-max px-4 py-1 rounded-md items-center flex gap-1 my-0 mx-auto`}
              type="submit"
            >
              {isPending === null || isPending === false ? (
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
