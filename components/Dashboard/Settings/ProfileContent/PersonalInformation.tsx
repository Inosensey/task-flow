import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Zustand Store
import { useFormStore } from "@/store/useFormStore";

// Components
import TabContentContainer from "../TabContentContainer";
import Input from "@/components/ReusableComponents/inputs/Input";

// Icons
import PhNotePencilThin from "@/Icones/PhNotePencilThin";
import SolarCloseCircleOutline from "@/Icones/SolarCloseCircleOutline";

// Types
import { Session, UserResponse } from "@supabase/supabase-js";
import { TableRow } from "@/Types/database.types";
import { getPersonalInfo, getUserInfo } from "@/lib/TanStackQueryFns";
type toggleEditingType = {
  isEditingAccountDetails: boolean;
};
interface props {
  User: UserResponse;
  personalInfo: TableRow<"PersonalInformation">[];
  userInfo: TableRow<"User">[];
}

// Initials
const toggleEditingInitials: toggleEditingType = {
  isEditingAccountDetails: false,
};

// FramerMotion Variants
const isEditingVariants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};
const isNotEditingVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const PersonalInformation = ({ User, personalInfo, userInfo }: props) => {
  // Use query
  const { data: personalInfoQueryData } = useQuery({
    queryKey: ["personalInfo"],
    queryFn: getPersonalInfo,
    initialData: personalInfo,
  });
  const { data: userInfoQueryData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    initialData: userInfo,
  });

  // Dynamic Initials
  const personalInfoInitials: TableRow<"PersonalInformation"> = {
    id: 0,
    userId: null,
    firstName: personalInfoQueryData[0].firstName,
    lastName: personalInfoQueryData[0].lastName,
    age: personalInfoQueryData[0].age,
    gender: personalInfoQueryData[0].gender,
    country: personalInfoQueryData[0].country,
    state: personalInfoQueryData[0].state,
    street: personalInfoQueryData[0].street,
    zip: personalInfoQueryData[0].zip,
    contactNumber: personalInfoQueryData[0].contactNumber
  };

  // Store
  const { validations, setValidation, formAction } = useFormStore();

  // States
  const [isEditing, setIsEditing] = useState<toggleEditingType>(
    toggleEditingInitials
  );
  const [personalInfoDetails, setPersonalInfoDetails] = useState<TableRow<"PersonalInformation">>(
    personalInfoInitials
  );

  console.log(personalInfoQueryData)

  // Events
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalInfoDetails((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <TabContentContainer header="Personal Information">
      <AnimatePresence mode="wait">
        <motion.div layout className="flex flex-col gap-2 mt-1">
          {isEditing.isEditingAccountDetails ? (
            <motion.form
              key="editing"
              layout
              variants={isEditingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2"
            >
              <Input
                state={personalInfoDetails.firstName}
                type="text"
                name="firstName"
                placeholder="Enter your First Name"
                label="First Name"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.firstName?.valid}
                validationMessage={validations?.firstName?.validationMessage}
              />
              <Input
                state={personalInfoDetails.lastName}
                type="text"
                name="lastName"
                placeholder="Enter your Last Name"
                label="Last Name"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.lastName?.valid}
                validationMessage={validations?.lastName?.validationMessage}
              />
              <Input
                state={personalInfoDetails.age.toString()}
                type="number"
                name="age"
                placeholder="Enter your Age"
                label="Age"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.age?.valid}
                validationMessage={validations?.age?.validationMessage}
              />
              <Input
                state={personalInfoDetails.gender}
                type="text"
                name="gender"
                placeholder="Enter your Gender"
                label="Gender"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.gender?.valid}
                validationMessage={validations?.gender?.validationMessage}
              />
              <Input
                state={personalInfoDetails.country}
                type="text"
                name="country"
                placeholder="Enter your Country"
                label="Country"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.country?.valid}
                validationMessage={validations?.country?.validationMessage}
              />
              <Input
                state={personalInfoDetails.state}
                type="text"
                name="state"
                placeholder="Enter your State"
                label="State"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.state?.valid}
                validationMessage={validations?.state?.validationMessage}
              />
              <Input
                state={personalInfoDetails.street}
                type="text"
                name="street"
                placeholder="Enter your Street"
                label="Street"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.street?.valid}
                validationMessage={validations?.street?.validationMessage}
              />
              <Input
                state={personalInfoDetails.zip}
                type="text"
                name="zip"
                placeholder="Enter your Zip Code"
                label="Zip Code"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.zip?.valid}
                validationMessage={validations?.zip?.validationMessage}
              />
              <Input
                state={personalInfoDetails.contactNumber}
                type="text"
                name="contactNumber"
                placeholder="Enter your Contact Number"
                label="Contact Number"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.contactNumber?.valid}
                validationMessage={validations?.contactNumber?.validationMessage}
              />
            </motion.form>
          ) : (
            <motion.div
              key="notEditing"
              layout
              variants={isNotEditingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">First Name:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].firstName}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Last Name:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].lastName}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Age:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].age}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Gender:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].gender}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Country:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].country}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">State:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].state}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Street:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].street}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Zip Code:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].zip}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Contact Number:</label>
                <p className="w-full text-white phone:text-sm">
                  {personalInfoQueryData[0].contactNumber}
                </p>
              </div>
            </motion.div>
          )}
          <motion.div className="flex gap-3 items-center mt-3" layout>
            {isEditing.isEditingAccountDetails ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-LightPrimary text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                  type="button"
                >
                  <PhNotePencilThin color="#fff" />
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsEditing((prev: toggleEditingType) => ({
                      ...prev,
                      isEditingAccountDetails: false,
                    }));
                  }}
                  className={`bg-Error text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                  type="button"
                >
                  <SolarCloseCircleOutline color="#fff" />
                  Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsEditing((prev: toggleEditingType) => ({
                    ...prev,
                    isEditingAccountDetails: true,
                  }));
                }}
                className={`bg-LightPrimary text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                type="button"
              >
                <PhNotePencilThin color="#fff" />
                Edit
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </TabContentContainer>
  );
};

export default PersonalInformation;
