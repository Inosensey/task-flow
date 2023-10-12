import React, { useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import axios, { Axios } from "axios";
import HashLoader from "react-spinners/HashLoader";

// Components
import FirstStep from "./SignUpSteps/FirstStep";
import SecondStep from "./SignUpSteps/SecondStep";
import ThirdStep from "./SignUpSteps/ThirdStep";
import Loading from "@/components/ReusableComponents/Loading/Loading";

// Styles
import styles from "@/css/HomeComponent/SignUp.module.css";

// React Spinner Css Override

// Set prop types
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

const SignUp = ({ setCurrentForm }: props) => {
  // States
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

  // Mutations
  const mutation = useMutation(async (userInfo: SignUpInfo) =>
    axios.post("/api/supabase/signUp", { userInfo })
  );

  return (
    <>
      <div className="fixed top-0 left-0 z-50 bg-black/[0.5] w-screen h-screen flex justify-center items-center">
        <div className="bg-white flex flex-col items-center justify-center gap-2 rounded-lg phone:w-[450px] phone:h-36">
          <HashLoader
            color="#00ADB5"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <Loading message="Setting Up Your Task Command Center 🚀" />
        </div>
      </div>
      <section className="bg-white rounded-2xl text-black p-3 relative phone:w-11/12">
        <form>
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
        </form>
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
              onClick={() => {
                mutation.mutate({
                  nameInfo: nameInfo,
                  additionalInfo: additionalInfo,
                  accountInfo: accountInfo,
                });
              }}
            >
              Submit
            </motion.button>
          )}
        </div>
      </section>
    </>
  );
};

export default SignUp;
