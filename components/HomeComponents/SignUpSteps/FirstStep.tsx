import Image from "next/image";
import React from "react";
import GreetingSvg from "@/svg/greetings.svg";
import Input from "@/components/ReusableComponents/inputs/Input";

interface nameInfo {
  firstName: string;
  lastName: string;
}
interface props {
  setNameInfo: React.Dispatch<React.SetStateAction<nameInfo>>;
  nameInfo: nameInfo;
}

const FirstStep = ({ nameInfo, setNameInfo }: props) => {
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
        />
        <Input
          state={nameInfo.lastName}
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          label="Last Name"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FirstStep;
