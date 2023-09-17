import React, { useState } from "react";
import GreetingSvg from "@/svg/greetings.svg";
import Input from "@/components/ReusableComponents/inputs/Input";

type nameInfo = {
  firstName: string;
  lastName: string;
}
type validation = {
  valid: null | boolean,
  validationMessage: string
}
interface props {
  setNameInfo: React.Dispatch<React.SetStateAction<nameInfo>>;
  nameInfo: nameInfo;
}

const FirstStep = ({ nameInfo, setNameInfo }: props) => {
  // States
  const [validation, setValidation] = useState<validation>({
    valid:  null,
    validationMessage: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNameInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
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
          valid={validation.valid}
          validationMessage={validation.validationMessage}
        />
        <Input
          state={nameInfo.lastName}
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          label="Last Name"
          onChange={handleInputChange}
          valid={validation.valid}
          validationMessage={validation.validationMessage}
        />
      </div>
    </div>
  );
};

export default FirstStep;
