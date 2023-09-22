import Input from "@/components/ReusableComponents/inputs/Input";
import FormValidation from "@/utils/validation";
import React, { useEffect, useState } from "react";

type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

interface additionalInfoValidation {
  age: {
    valid: null | boolean;
    validationMessage: string;
  };
  gender: {
    valid: null | boolean;
    validationMessage: string;
  };
  contactNumber: {
    valid: null | boolean;
    validationMessage: string;
  };
  country: {
    valid: null | boolean;
    validationMessage: string;
  };
  state: {
    valid: null | boolean;
    validationMessage: string;
  };
  zip: {
    valid: null | boolean;
    validationMessage: string;
  };
}

type additionalInfo = {
  age: string;
  gender: string;
  contactNumber: string;
  country: string;
  state: string;
  zip: string;
  street: string;
};
interface props {
  additionalInfo: additionalInfo;
  setAdditioNalInfo: React.Dispatch<React.SetStateAction<additionalInfo>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  currentStep: number;
}

const SecondStep = ({
  additionalInfo,
  setAdditioNalInfo,
  setIsValid,
  firstName,
  currentStep,
}: props) => {
  //states
  const [additionalInfoValidation, setAdditionalInfoValidation] =
    useState<additionalInfoValidation>({
      country: {
        valid: null,
        validationMessage: "",
      },
      state: {
        valid: null,
        validationMessage: "",
      },
      zip: {
        valid: null,
        validationMessage: "",
      },
      age: {
        valid: null,
        validationMessage: "",
      },
      gender: {
        valid: null,
        validationMessage: "",
      },
      contactNumber: {
        valid: null,
        validationMessage: "",
      },
    });

  // Use Effect
  useEffect(() => {
    if (currentStep !== 2) return;
    if (
      additionalInfoValidation.age.valid === null &&
      additionalInfoValidation.contactNumber.valid === true &&
      additionalInfoValidation.country.valid === null &&
      additionalInfoValidation.gender.valid === null &&
      additionalInfoValidation.state.valid === null &&
      additionalInfoValidation.zip.valid === null
    )
      return setIsValid(false);
    checkStepValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalInfoValidation, currentStep]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };

    setAdditioNalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    const result = FormValidation(validationParams);
    setValidationResult(result);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };
    const result = FormValidation(validationParams);
    setValidationResult(result);
  };

  // set validation result
  const setValidationResult = (validation: validation) => {
    return setAdditionalInfoValidation((prev) => ({
      ...prev,
      [validation.validationName]: {
        valid: validation.valid,
        validationMessage: validation.validationMessage,
      },
    }));
  };

  // Check if step is valid
  const checkStepValidation = () => {
    if (
      additionalInfoValidation.age.valid === true &&
      additionalInfoValidation.gender.valid === true &&
      additionalInfoValidation.contactNumber.valid === true &&
      additionalInfoValidation.country.valid === true &&
      additionalInfoValidation.state.valid === true &&
      additionalInfoValidation.zip.valid === true
    ) {
      console.log("true");
      setIsValid(true);
    } else {
      console.log("false");
      console.log(additionalInfoValidation);
      setIsValid(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="p-2">
        <p className="text-justify phone:text-sm">
          Hello,{" "}
          <span className="font-bold text-LightPrimary">{firstName}</span>. Nice
          to meet you! <br />
          Now, can you tell me more about yourself by filling the fields below.
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2  w-11/12">
        <h1 className="border-b-2 border-LightPrimary w-max font-bold phone:text-lg">
          Personal Details
        </h1>
        <div className="flex flex-col gap-1">
          <div className="flex">
            <div className="w-16">
              <Input
                state={additionalInfo.age}
                type="text"
                name="age"
                placeholder="Age"
                label="Age"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                valid={additionalInfoValidation.age.valid}
                validationMessage={
                  additionalInfoValidation.age.validationMessage
                }
              />
            </div>
            <div className="w-24">
              <Input
                state={additionalInfo.gender}
                type="text"
                name="gender"
                placeholder="Gender"
                label="Gender"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                valid={additionalInfoValidation.gender.valid}
                validationMessage={
                  additionalInfoValidation.gender.validationMessage
                }
              />
            </div>
          </div>
          <Input
            state={additionalInfo.contactNumber}
            type="text"
            name="contactNumber"
            placeholder="Enter your Contact Number"
            label="Contact Number"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={additionalInfoValidation.contactNumber.valid}
            validationMessage={
              additionalInfoValidation.contactNumber.validationMessage
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 w-11/12">
        <h1 className="border-b-2 border-LightPrimary w-max font-bold phone:text-lg">
          Address
        </h1>
        <div className="flex flex-col gap-2">
          <Input
            state={additionalInfo.country}
            type="text"
            name="country"
            placeholder="Enter your Country"
            label="Country"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={additionalInfoValidation.country.valid}
            validationMessage={
              additionalInfoValidation.country.validationMessage
            }
          />
          <Input
            state={additionalInfo.state}
            type="text"
            name="state"
            placeholder="Enter your State"
            label="State"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={additionalInfoValidation.state.valid}
            validationMessage={additionalInfoValidation.state.validationMessage}
          />
          <Input
            state={additionalInfo.street}
            type="text"
            name="street"
            placeholder="Enter your Street"
            label="Street"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            valid={true}
            validationMessage={""}
          />
          <div className="w-28">
            <Input
              state={additionalInfo.zip}
              type="text"
              name="zip"
              placeholder="Zip Code"
              label="Zip"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              valid={additionalInfoValidation.zip.valid}
              validationMessage={additionalInfoValidation.zip.validationMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
