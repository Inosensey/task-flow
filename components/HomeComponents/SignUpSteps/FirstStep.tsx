import React, { useState, useEffect } from "react";
import GreetingSvg from "@/svg/greetings.svg";
import Input from "@/components/ReusableComponents/inputs/Input";
import FormValidation from "@/utils/validation";

type nameInfo = {
  firstName: string;
  lastName: string;
};
interface validation {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
}
interface nameValidation {
  firstName: {
    valid: null | boolean;
    validationMessage: string;
  };
  lastName: {
    valid: null | boolean;
    validationMessage: string;
  };
}
interface props {
  setNameInfo: React.Dispatch<React.SetStateAction<nameInfo>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  nameInfo: nameInfo;
}

const FirstStep = ({ nameInfo, setNameInfo, setIsValid }: props) => {
  // States
  const [validation, setValidation] = useState<nameValidation>({
    firstName: {
      valid: null,
      validationMessage: "",
    },
    lastName: {
      valid: null,
      validationMessage: "",
    },
  });

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };

    setNameInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    const result = FormValidation(validationParams);

    setValidationResult(result);
    checkStepValidation();
  };

  // handle input blur
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };

    setNameInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    const result = FormValidation(validationParams);
    setValidationResult(result);
    checkStepValidation();
  };

  // Check if step is valid
  const checkStepValidation = () => {
    if (
      validation.firstName.valid === true &&
      validation.lastName.valid === true
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // set validation result
  const setValidationResult = (validation: validation) => {
    return setValidation((prev) => ({
      ...prev,
      [validation.validationName]: {
        valid: validation.valid,
        validationMessage: validation.validationMessage,
      },
    }));
  };

  

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-4">
        <GreetingSvg />
        <p className="phone:px-20 text-center phone:text-sm">
          Hey there, Let&apos;s start with your name
        </p>
      </div>
      <div className="mt-4 w-full flex flex-col items-center gap-3">
        <Input
          state={nameInfo.firstName}
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          label="First Name"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          valid={validation.firstName.valid}
          validationMessage={validation.firstName.validationMessage}
        />
        <Input
          state={nameInfo.lastName}
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          label="Last Name"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          valid={validation.lastName.valid}
          validationMessage={validation.lastName.validationMessage}
        />
      </div>
    </div>
  );
};

export default FirstStep;
