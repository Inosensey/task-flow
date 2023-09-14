import Input from "@/components/ReusableComponents/inputs/Input";
import React from "react";

interface additionalInfo {
  age: string;
  gender: string;
  contactNumber: string;
  country: string;
  state: string;
  zip: string;
  street: string;
}
interface props {
  additionalInfo: additionalInfo;
  setAdditioNalInfo: React.Dispatch<React.SetStateAction<additionalInfo>>;
}

const SecondStep = ({ additionalInfo, setAdditioNalInfo }: props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAdditioNalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="p-2">
        <p className="text-justify phone:text-sm">
          Hello,{" "}
          <span className="font-bold text-LightPrimary">Insert Name here</span>.
          Nice to meet you! <br />
          Now, can you tell me more about yourself by filling the fields below.
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2  w-11/12">
        <h1 className="border-b-2 border-LightPrimary w-max font-bold phone:text-lg">
          Personal Details
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <div className="w-16">
              <Input
                state={additionalInfo.age}
                type="text"
                name="age"
                placeholder="Age"
                label="Age"
                onChange={handleInputChange}
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
              />
            </div>
          </div>
          <Input
            state={additionalInfo.contactNumber}
            type="text"
            name="age"
            placeholder="Enter your Contact Number"
            label="Contact Number"
            onChange={handleInputChange}
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
            name="Country"
            placeholder="Enter your Country"
            label="Country"
            onChange={handleInputChange}
          />
          <Input
            state={additionalInfo.state}
            type="text"
            name="state"
            placeholder="Enter your State"
            label="State"
            onChange={handleInputChange}
          />
          <Input
            state={additionalInfo.street}
            type="text"
            name="street"
            placeholder="Enter your Street"
            label="Street"
            onChange={handleInputChange}
          />
          <div className="w-28">
            <Input
              state={additionalInfo.zip}
              type="text"
              name="zip"
              placeholder="Zip Code"
              label="Zip"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
