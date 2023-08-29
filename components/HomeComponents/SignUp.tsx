import React, { useState } from "react";
import { motion } from "framer-motion";
import FirstStep from "./SignUpSteps/FirstStep";
import SecondStep from "./SignUpSteps/SecondStep";
import ThirdStep from "./SignUpSteps/ThirdStep";

// Set prop types
type props = {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
};

interface Steps {
  stepId: number;
  stepComponent: React.ReactNode;
}
interface nameInfo {
  firstName: string;
  lastName: string;
}

const SignUp = ({ setCurrentForm }: props) => {
  // States
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [nameInfo, setNameInfo] = useState<nameInfo>({
    firstName: "",
    lastName: "",
  });

  return (
    <section className="bg-white rounded-2xl text-black p-3 relative phone:w-11/12">
      <div>
        {currentStep === 1 && (
          <FirstStep nameInfo={nameInfo} setNameInfo={setNameInfo} />
        )}
        {currentStep === 2 && <SecondStep />}
        {currentStep === 3 && <ThirdStep />}
      </div>
      <div className="w-full mt-8 flex justify-center items-center gap-10">
        {currentStep !== 1 && (
          <motion.button
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
            onClick={() => setCurrentStep((prev) => prev + 1)}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            className="py-2 px-8 bg-LightPrimary text-LightSecondary"
          >
            Next
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default SignUp;
