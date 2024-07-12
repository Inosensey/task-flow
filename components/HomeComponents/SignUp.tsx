import React, { useState, CSSProperties, useEffect } from "react";
import { motion } from "framer-motion";
import axios, { Axios } from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

// Actions
import { signIn } from "@/actions/authActions";

// Components
import FirstStep from "./SignUpSteps/FirstStep";
import SecondStep from "./SignUpSteps/SecondStep";
import ThirdStep from "./SignUpSteps/ThirdStep";
import Loading from "@/components/ReusableComponents/Loading/Loading";

// Styles
import styles from "@/css/HomeComponent/SignUp.module.css";
import { useFormState } from "react-dom";

// React Spinner Css Override

// Set prop types
import { useFormStateType } from "@/Types/formStates";
interface props {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}

type nameInfo = {
  firstName: string;
  lastName: string;
};
type additionalInfo = {
  age: string;
  gender: string;
  contactNumber: string;
  country: string;
  state: string;
  zip: string;
  street: string;
};
type accountInfo = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
interface SignUpInfo {
  nameInfo: nameInfo;
  additionalInfo: additionalInfo;
  accountInfo: accountInfo;
}

// Initials

const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const SignUp = ({ setCurrentForm }: props) => {
  // Initialize use query
  const queryClient = useQueryClient();

  // UseFormState
  const [state, formAction] = useFormState(signIn, useFormStateInitials);

  // States
  const [isPending, setIsPending] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [nameInfo, setNameInfo] = useState<nameInfo>({
    firstName: "",
    lastName: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState<additionalInfo>({
    age: "",
    gender: "",
    contactNumber: "",
    country: "",
    state: "",
    zip: "",
    street: "",
  });
  const [accountInfo, setAccountInfo] = useState<accountInfo>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setIsPending(true);
  };

  useEffect(() => {
    if (state.success) {
    setIsPending(false);
    }
  }, [state]);

  return (
    <>
      {isPending ? (
        <Loading
          isLoading={true}
          message="Setting Up Your Task Command Center 🚀"
        />
      ) : (
        <Loading
          isLoading={false}
          message="Setting Up Your Task Command Center 🚀"
        />
      )}
      <section className="bg-white rounded-xl text-black p-3 relative phone:mt-12 phone:w-11/12">
        <form action={formAction} onSubmit={useHandleFormSubmit}>
          <div className={`${currentStep === 1 ? "block" : "hidden"}`}>
            <FirstStep
              nameInfo={nameInfo}
              setNameInfo={setNameInfo}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div className={`${currentStep === 2 ? "block" : "hidden"}`}>
            <SecondStep
              additionalInfo={additionalInfo}
              setAdditioNalInfo={setAdditionalInfo}
              firstName={nameInfo.firstName}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div className={`${currentStep === 3 ? "block" : "hidden"}`}>
            <ThirdStep
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div className="w-full mt-8 flex justify-center items-center gap-10">
            {currentStep !== 1 && (
              <motion.button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className="py-2 px-8 bg-Secondary text-LightSecondary"
              >
                Back
              </motion.button>
            )}
            {currentStep !== 3 && (
              <motion.button
                type="button"
                disabled={isValid ? false : true}
                onClick={() => setCurrentStep((prev) => prev + 1)}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className={`py-2 px-8 ${
                  isValid ? "bg-LightPrimary" : "bg-Disabled"
                } text-LightSecondary`}
              >
                Next
              </motion.button>
            )}
            {currentStep === 3 && (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className={`py-2 px-8 ${"bg-LightPrimary"} text-LightSecondary`}
              >
                Submit
              </motion.button>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUp;
