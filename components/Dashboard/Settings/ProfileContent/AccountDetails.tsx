import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Zustand Store
import { useFormStore } from "@/store/useFormStore";

// Libs
import { getUserData, getUserInfo } from "@/lib/TanStackQueryFns";

// Components
import TabContentContainer from "../TabContentContainer";
import EmailChangeForm from "./EmailChangeForm";

// Types
import { UserResponse } from "@supabase/supabase-js";
import { TableRow } from "@/Types/database.types";

type profileDetailsType = {
  email: string;
  username: string;
};
type toggleEditingType = {
  isEditingEmail: boolean;
};
interface props {
  User: UserResponse;
  userInfo: TableRow<"User">[];
}

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

// Initials
const toggleEditingInitials: toggleEditingType = {
  isEditingEmail: false,
};

const AccountDetails = ({ User, userInfo }: props) => {
  // Use query
  const { data: userInfoQueryData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    initialData: userInfo,
  });
  useQuery({
    queryKey: ["userSession"],
    queryFn: getUserData,
  });
  // Dynamic Initials
  const profileDetailsInitials: profileDetailsType = {
    email: User.data.user?.email!,
    username: userInfoQueryData[0].username,
  };

  // Store
  const { validations, setValidation, formAction } = useFormStore();

  // States
  const [isEmailEditing, setIsEmailEditing] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<profileDetailsType>(
    profileDetailsInitials
  );

  // Events
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
  };
  // const { data, error } = await supabase.auth.updateUser({
  //   email: 'new@email.com'
  // })
  return (
    <>
      <TabContentContainer header="Account Details">
        <AnimatePresence mode="wait">
          <motion.div className="flex flex-col gap-2 mt-1">
            <motion.div
              key="notEditing"
              layout
                variants={isNotEditingVariants}
                initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-4 phone:w-[96%] mdphone:w-11/12">
                <div>
                  <label className="phone:text-sm">Email:</label>
                  <p className="w-full text-white phone:text-sm">
                    {User.data.user?.email}
                  </p>
                </div>
                <p
                  onClick={() => setIsEmailEditing(true)}
                  className="phone:text-sm underline text-LightPrimary cursor-pointer"
                >
                  Change Email
                </p>
              </div>
              <div className="flex flex-col phone:w-[96%] mdphone:w-11/12">
                <label className="phone:text-sm">Username:</label>
                <p className="w-full text-white phone:text-sm">
                  {userInfoQueryData[0].username}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </TabContentContainer>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isEmailEditing && (
          <EmailChangeForm setShowEmailChangeForm={setIsEmailEditing} />
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountDetails;
