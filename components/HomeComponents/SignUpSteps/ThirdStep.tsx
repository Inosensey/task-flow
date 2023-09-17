import React, { useState } from "react";
import Input from "@/components/ReusableComponents/inputs/Input";

type validation = {
  valid: null | boolean,
  validationMessage?: string
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
}

const ThirdStep = ({ accountInfo, setAccountInfo }: props) => {
  const [validation, setValidation] = useState<validation>({
    valid: null,
    validationMessage: ""
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAccountInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
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
            valid={validation.valid}
            validationMessage={validation.validationMessage}
          />
          <Input
            state={accountInfo.email}
            type="email"
            name="email"
            placeholder="Enter your Email"
            label="Email"
            onChange={handleInputChange}
            valid={validation.valid}
            validationMessage={validation.validationMessage}
          />
          <div className="mt-4 flex flex-col gap-2">
            <Input
              state={accountInfo.password}
              type="password"
              name="password"
              placeholder="Enter your Password"
              label="Password"
              onChange={handleInputChange}
              valid={validation.valid}
              validationMessage={validation.validationMessage}
            />
            <Input
              state={accountInfo.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              label="Confirm Password"
              onChange={handleInputChange}
              valid={validation.valid}
              validationMessage={validation.validationMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
