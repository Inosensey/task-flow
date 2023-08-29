import Image from "next/image";
import React from "react";

interface nameInfo {
  firstName: string,
  lastName: string
}
interface props {
  setNameInfo: React.Dispatch<React.SetStateAction<nameInfo>>,
  nameInfo: nameInfo
}

const FirstStep = ({nameInfo, setNameInfo}: props) => {
  
  // Input Change handler
  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    console.log(name);
    console.log(value);
    setNameInfo((prevNameInfo) => ({
      ...prevNameInfo,
      [name]: value
    }))
  }
  console.log(nameInfo);
  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          className="border-2"
          src={"/assets/Image/first-step-img.png"}
          width={240}
          height={240}
          alt="Hello there"
        />
        <p className="phone:px-20 text-center phone:text-sm">
          Hey there, Let&apos;s start with your name
        </p>
      </div>
      <div className="mt-4 w-full flex flex-col items-center gap-3">
        <div className="flex flex-col phone:w-11/12">
          <label className="phone:text-sm">First Name</label>
          <input
            value={nameInfo.firstName}
            onChange={handleNameInputChange}
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className="bg-Secondary text-white px-2 py-2 rounded-md phone:text-sm"
          />
          {/* <span>Error notif</span> */}
        </div>
        <div className="flex flex-col phone:w-11/12">
          <label className="phone:text-sm">Last Name</label>
          <input
            value={nameInfo.lastName}
            onChange={handleNameInputChange}
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="bg-Secondary text-white px-2 py-2 rounded-md phone:text-sm"
          />
          {/* <span>Error notif</span> */}
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
