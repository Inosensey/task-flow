import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// component
import TabContentContainer from "./TabContentContainer";
import Input from "@/components/ReusableComponents/inputs/Input";

// Store
import { useFormStore } from "@/store/useFormStore";

// Icones
import PhNotePencilThin from "@/Icones/PhNotePencilThin";

// Types
type profileDetailsType = {
  email: string;
  password: string;
  repeatPassword: string;
};
type toggleEditingType = {
  isEditingAccountDetails: boolean;
};

// Initials
const toggleEditingInitials: toggleEditingType = {
  isEditingAccountDetails: false,
};

// FramerMotion Variants
const toggleEditingVariants = {
  initial: {
    opacity: 0,
    y: -10,
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

const Profile = () => {
  // Dynamic Initials
  const profileDetailsInitials: profileDetailsType = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  // Store
  const { validations, setValidation, formAction } = useFormStore();

  // States
  const [isEditing, setIsEditing] = useState<toggleEditingType>(
    toggleEditingInitials
  );
  const [profileDetails, setProfileDetails] = useState<profileDetailsType>(
    profileDetailsInitials
  );

  // Events
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-2">
      <TabContentContainer header="Account Details">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="flex flex-col gap-2"
            >
              {isEditing.isEditingAccountDetails ? (
                <motion.form
                  key="editing"
                  layout
                  variants={toggleEditingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-2"
                >
                  <Input
                    state={profileDetails.email}
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    label="Email"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    valid={validations?.email?.valid}
                    validationMessage={validations?.email?.validationMessage}
                  />
                  <Input
                    state={profileDetails.password}
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    label="Password"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    valid={validations?.password?.valid}
                    validationMessage={validations?.password?.validationMessage}
                  />
                  <Input
                    state={profileDetails.repeatPassword}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat your Password"
                    label="Enter your Password Again"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    valid={validations?.repeatPassword?.valid}
                    validationMessage={
                      validations?.repeatPassword?.validationMessage
                    }
                  />
                </motion.form>
              ) : (
                <motion.div
                  key="notEditing"
                  layout
                  variants={toggleEditingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                    <label className="phone:text-sm">Email</label>
                    <p className="w-full text-white py-2 phone:text-sm">
                      Email Here
                    </p>
                  </div>
                  <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                    <label className="phone:text-sm">Password</label>
                    <p className="w-full text-white py-2 phone:text-sm">
                      Password Here
                    </p>
                  </div>
                </motion.div>
              )}
              <motion.button
                layout
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsEditing((prev: toggleEditingType) => ({
                    ...prev,
                    isEditingAccountDetails: !prev.isEditingAccountDetails,
                  }));
                }}
                className={`bg-LightPrimary text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                type="button"
              >
                <PhNotePencilThin color="#fff" />
                Edit
              </motion.button>
            </motion.div>
          </AnimatePresence>
      </TabContentContainer>
    </div>
  );
};

export default Profile;
