import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormState } from "react-dom";
import { useQuery } from "@tanstack/react-query";

// Actions
import { mutateEmail } from "@/actions/settingsAction";

// Lib
import { getUserData } from "@/lib/TanStackQueryFns";

// store
import { useFormStore } from "@/store/useFormStore";

// Components
import Overlay from "@/components/ReusableComponents/Overlay";
import Input from "@/components/ReusableComponents/inputs/Input";

// Icons
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import FormValidation from "@/utils/validation";
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";

// Types
import { validation } from "@/Types/generalTypes";
import { useFormStateType } from "@/Types/formStates";
interface props {
  setShowEmailChangeForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface inputTypes {
  currentEmail: string;
  newEmail: string;
  userEmail?: string
}

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

// Initials
const inputInitial: inputTypes = {
  currentEmail: "",
  newEmail: "",
};
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const EmailChangeForm = ({ setShowEmailChangeForm }: props) => {
  // Zustand store
  const { setValidation, validations, resetValidation, formAction } =
    useFormStore();

  // Use Queries
  let { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  // States
  const [state, action] = useFormState(mutateEmail, useFormStateInitials);
  const [input, setInput] = useState<inputTypes>(inputInitial);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let validationParams: {
      value: string;
      stateName: string;
      currentEmail?: string;
    } = {
      value: value,
      stateName: name,
    };

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "currentEmail") {
      validationParams.currentEmail = userData?.data.user?.email;
    }
    const result: validation = FormValidation(validationParams);
    setValidation(result);
  };

  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    const fieldsToCheck = ["currentEmail", "newEmail"];
    let formValues: inputTypes & { [key: string]: string } =
      useFormSerialize(event);
      formValues.userEmail = userData?.data.user?.email;
    if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
      event.preventDefault();
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (state.success) {
      setShowSuccessMessage(true)
      setIsPending(false);
      setInput(inputInitial)
    } else {
      setShowSuccessMessage(false)
      setIsPending(false);
      setInput(inputInitial)
    }
  }, [state]);

  return (
    <Overlay>
      <motion.form
        variants={popUpVariants}
        onSubmit={useHandleFormSubmit}
        action={action}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="bg-Primary p-3 rounded-md phone:w-11/12 phone:mt-2 phone:h-max tablet:max-w-[420px]"
      >
        <div className="flex justify-between items-center">
          <p className="py-0">Change Email Form</p>
          <p
            onClick={() => setShowEmailChangeForm(false)}
            style={{ height: "max-content" }}
            className="cursor-pointer bg-LightPrimary px-2 py-0 font-bold text-lg rounded-md"
          >
            X
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4 ">
          <Input
            state={input.currentEmail}
            type="email"
            name="currentEmail"
            placeholder="Enter Your Current Email"
            label="Current Email"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={validations?.currentEmail?.valid}
            validationMessage={validations?.currentEmail?.validationMessage}
          />
          <Input
            state={input.newEmail}
            type="email"
            name="newEmail"
            placeholder="Enter New Email"
            label="New Email"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            valid={validations?.newEmail?.valid}
            validationMessage={validations?.newEmail?.validationMessage}
          />
          {showSuccessMessage && (
            <div className="phone:w-[96%] mdphone:w-11/12 p-1 border-2 border-LightPrimary">
              <p className="text-[0.75rem] text-LightPrimary">
                We’ve sent a confirmation email to your new address. Please
                check your inbox and click the link to verify your new email.
                Your email change will be completed once you confirm.
              </p>
            </div>
          )}

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
                    <FontAwesomeIcon className="text-sm" icon={faEnvelope} />
                  </span>
                  Update Email
                </>
              ) : (
                ""
              )}
              {isPending && (
                <>
                  <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                  Updating Email
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </Overlay>
  );
};

export default EmailChangeForm;
