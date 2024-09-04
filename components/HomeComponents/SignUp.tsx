import React, { useState, CSSProperties, useEffect } from "react";
import { motion } from "framer-motion";
import axios, { Axios } from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Actions
import { signUp } from "@/actions/authActions";

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
  // Initialize useRouter
  const router = useRouter();

  // Initialize use query
  const queryClient = useQueryClient();

  // UseFormState
  const [state, formAction] = useFormState(signUp, useFormStateInitials);

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
      <Loading
        isLoading={true}
        message="Success! Redirecting to Your Workspace 🛠️"
      />;
      queryClient.setQueryData(["user-session"], state.data);
      router.push("/dashboard");
    } else {
      setIsPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      {isPending && (
        <Loading
          isLoading={true}
          message="Setting Up Your Task Command Center 🚀"
        />
      )}
      <section data-testid="signUp-container" className="bg-white rounded-xl text-black p-3 relative phone:mt-12 phone:w-11/12 tablet:max-w-[420px]">
        <form action={formAction} onSubmit={useHandleFormSubmit}>
          <div data-testid="first-step-container" className={`${currentStep === 1 ? "block" : "hidden"}`}>
            <FirstStep
              nameInfo={nameInfo}
              setNameInfo={setNameInfo}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div data-testid="second-step-container" className={`${currentStep === 2 ? "block" : "hidden"}`}>
            <SecondStep
              additionalInfo={additionalInfo}
              setAdditioNalInfo={setAdditionalInfo}
              firstName={nameInfo.firstName}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div data-testid="third-step-container" className={`${currentStep === 3 ? "block" : "hidden"}`}>
            <ThirdStep
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              setIsValid={setIsValid}
              currentStep={currentStep}
            />
          </div>
          <div data-testid="navigate-submit-container" className="w-full mt-8 flex justify-center items-center gap-10">
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
        <div  data-testid="signIn-button" className="text-center mx-auto mt-3 w-52">
          <p className="phone:text-sm w-max">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentForm("Sign In")}
              className="cursor-pointer underline text-LightPrimary"
            >
              Sign In
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUp;
