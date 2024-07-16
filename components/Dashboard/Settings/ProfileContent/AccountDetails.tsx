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
type profileDetailsType = {
  email: string;
  username: string;
};
type toggleEditingType = {
  isEditingAccountDetails: boolean;
};
interface props {
  User: UserResponse;
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

const AccountDetails = ({ User, userInfo }: props) => {
  // Use query
  const { data: userInfoQueryData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    initialData: userInfo,
  });

  // Dynamic Initials
  const profileDetailsInitials: profileDetailsType = {
    email: User.data.user?.email!,
    username: userInfoQueryData[0].username,
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
    <TabContentContainer header="Account Details">
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
                state={profileDetails.username}
                type="text"
                name="username"
                placeholder="Enter your Username"
                label="Username"
                onChange={handleInputChange}
                onBlur={handleInputChange}
                valid={validations?.username?.valid}
                validationMessage={validations?.username?.validationMessage}
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
                <label className="phone:text-sm">Email:</label>
                <p className="w-full text-white phone:text-sm">
                  {User.data.user?.email}
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Username:</label>
                <p className="w-full text-white phone:text-sm">
                  {userInfoQueryData[0].username}
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

export default AccountDetails;
