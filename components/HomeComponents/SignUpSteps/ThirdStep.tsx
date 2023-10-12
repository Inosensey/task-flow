import React, { useState } from "react";
import Input from "@/components/ReusableComponents/inputs/Input";
import FormValidation from "@/utils/validation";

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

interface accountDetailsValidation {
  username: {
    valid: null | boolean;
    validationMessage: string;
  };
  email: {
    valid: null | boolean;
    validationMessage: string;
  };
  password: {
    valid: null | boolean;
    validationMessage: string;
  };
  confirmPassword: {
    valid: null | boolean;
    validationMessage: string;
  };
}

type accountInfo = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface props {
  accountInfo: accountInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<accountInfo>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
}

const ThirdStep = ({ accountInfo, setAccountInfo }: props) => {
  //states
  const [accountDetailsValidation, setAccountDetailsValidation] =
    useState<accountDetailsValidation>({
      username: {
        valid: null,
        validationMessage: "",
      },
      email: {
        valid: null,
        validationMessage: "",
      },
      password: {
        valid: null,
        validationMessage: "",
      },
      confirmPassword: {
        valid: null,
        validationMessage: "",
      },
    });

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let validationParams = {
      value: value,
      stateName: name,
      confirmPassword: accountInfo.password,
    };

    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    const result = FormValidation(validationParams);
    setValidationResult(result);
  };

  // Handle input blur
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
      confirmPassword: accountInfo.password,
    };

    const result = FormValidation(validationParams);
    setValidationResult(result);
  };

  // set validation result
  const setValidationResult = (validation: validation) => {
    return setAccountDetailsValidation((prev) => ({
      ...prev,
      [validation.validationName]: {
        valid: validation.valid,
        validationMessage: validation.validationMessage,
      },
    }));
  };

  return (
    <div>
      <div className="p-2">
        <p className="text-justify phone:text-sm">
          You&apos;re nearly there{" "}
          <span className="font-bold text-LightPrimary">Insert Name here</span>,
          I just need you to fill up the fields below for your account
          information
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2 w-11/12">
        <h1 className="border-b-2 border-LightPrimary w-max font-bold phone:text-lg">
          Account Details
        </h1>
        <div className="flex flex-col gap-2">
          <Input
            state={accountInfo.username}
            type="text"
            name="username"
            placeholder="Enter your Username"
            label="Username"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={accountDetailsValidation.username.valid}
            validationMessage={
              accountDetailsValidation.username.validationMessage
            }
          />
          <Input
            state={accountInfo.email}
            type="email"
            name="email"
            placeholder="Enter your Email"
            label="Email"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={accountDetailsValidation.email.valid}
            validationMessage={accountDetailsValidation.email.validationMessage}
          />
          <div className="mt-4 flex flex-col gap-2">
            <Input
              state={accountInfo.password}
              type="password"
              name="password"
              placeholder="Enter your Password"
              label="Password"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              valid={accountDetailsValidation.password.valid}
              validationMessage={
                accountDetailsValidation.password.validationMessage
              }
            />
            <Input
              state={accountInfo.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              label="Confirm Password"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              valid={accountDetailsValidation.confirmPassword.valid}
              validationMessage={
                accountDetailsValidation.confirmPassword.validationMessage
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
