import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormState } from "react-dom";

// Actions
import { mutatePersonalInformation } from "@/actions/settingsAction";

// Libs
import { getPersonalInfo } from "@/lib/TanStackQueryFns";

// Zustand Store
import { useFormStore } from "@/store/useFormStore";
import { useNotificationStore } from "@/store/useNotificationStore";

// Components
import TabContentContainer from "../TabContentContainer";
import Input from "@/components/ReusableComponents/inputs/Input";

// Icons
import PhNotePencilThin from "@/Icones/PhNotePencilThin";
import SolarCloseCircleOutline from "@/Icones/SolarCloseCircleOutline";

// Types
import { TableRow, TableUpdate } from "@/Types/database.types";
import { useFormStateType } from "@/Types/formStates";
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";
type toggleEditingType = {
  isEditingPersonalInfoDetails: boolean;
};
interface props {
  personalInfo: TableRow<"PersonalInformation">[];
}

// Initials
const toggleEditingInitials: toggleEditingType = {
  isEditingPersonalInfoDetails: false,
};
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
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

const PersonalInformation = ({ personalInfo }: props) => {
  // Use query
  const queryClient = useQueryClient();
  const { data: personalInfoQueryData } = useQuery({
    queryKey: ["personalInfo"],
    queryFn: getPersonalInfo,
    initialData: personalInfo,
  });

  // Dynamic Initials
  const personalInfoInitials: TableRow<"PersonalInformation"> = {
    id: 0,
    userId: personalInfoQueryData[0].userId,
    firstName: personalInfoQueryData[0].firstName,
    lastName: personalInfoQueryData[0].lastName,
    age: personalInfoQueryData[0].age,
    gender: personalInfoQueryData[0].gender,
    country: personalInfoQueryData[0].country,
    state: personalInfoQueryData[0].state,
    street: personalInfoQueryData[0].street,
    zip: personalInfoQueryData[0].zip,
    contactNumber: personalInfoQueryData[0].contactNumber,
  };

  // Store
  const { validations, setValidation } = useFormStore();
  const { setMessage, setShowSlideNotification } = useNotificationStore();

  // UseFormState
  const [state, formAction] = useFormState(
    mutatePersonalInformation,
    useFormStateInitials
  );

  // States
  const [isEditing, setIsEditing] = useState<toggleEditingType>(
    toggleEditingInitials
  );
  const [personalInfoDetails, setPersonalInfoDetails] =
    useState<TableRow<"PersonalInformation">>(personalInfoInitials);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setIsPending(true);
    const fieldsToCheck = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "country",
      "state",
      "street",
      "zipCode",
    ];
    const formValues: TableUpdate<"PersonalInformation"> & {
      [key: string]: string;
    } = useFormSerialize(event);
    if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
      event.preventDefault();
      setIsPending(false);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalInfoDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onPersonalInformationActionSuccess = () => {
    const notifMessage = "Personal Information Successfully Updated";
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
    setPersonalInfoDetails(personalInfoDetails);
    setIsEditing((prev) => ({...prev, isEditingPersonalInfoDetails: false}))
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };
  useEffect(() => {
    if (state.success) {
      queryClient.invalidateQueries({
        queryKey: [`personalInfo`],
      });
      onPersonalInformationActionSuccess();
    }
    setIsPending(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <TabContentContainer header="Personal Information">
      <AnimatePresence mode="wait">
        <motion.div className="flex flex-col gap-2 mt-1">
          {isEditing.isEditingPersonalInfoDetails ? (
            <motion.form
              action={formAction}
              onSubmit={useHandleFormSubmit}
              key="editing"
              layout
              variants={isEditingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2 py-2"
            >
              <Input
                state={personalInfo[0].userId!}
                type="hidden"
                name="userId"
                placeholder=""
                label=""
                onChange={handleInputChange}
              />
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
                validationMessage={
                  validations?.contactNumber?.validationMessage
                }
              />
              <motion.div className="flex gap-3 items-center mt-3">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-LightPrimary text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                  type="submit"
                >
                  <PhNotePencilThin color="#fff" />
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPersonalInfoDetails(personalInfoInitials)
                    setIsEditing((prev: toggleEditingType) => ({
                      ...prev,
                      isEditingPersonalInfoDetails: false,
                    }));
                  }}
                  className={`bg-Error text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                  type="button"
                >
                  <SolarCloseCircleOutline color="#fff" />
                  Cancel
                </motion.button>
              </motion.div>
            </motion.form>
          ) : (
            <>
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
                <motion.div className="flex gap-3 items-center mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing((prev: toggleEditingType) => ({
                        ...prev,
                        isEditingPersonalInfoDetails: true,
                      }));
                    }}
                    className={`bg-LightPrimary text-LightSecondary w-max px-4 py-1 rounded-md items-center flex gap-1 mt-2`}
                    type="button"
                  >
                    <PhNotePencilThin color="#fff" />
                    Edit
                  </motion.button>
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </TabContentContainer>
  );
};

export default PersonalInformation;
