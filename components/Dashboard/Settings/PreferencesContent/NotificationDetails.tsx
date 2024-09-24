import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

// Actions
import { mutatePreferences } from "@/actions/settingsAction";

// Store
import { useFormStore } from "@/store/useFormStore";

// Icons
import MaterialSymbolsSettingsOutlineRounded from "@/Icones/MaterialSymbolsSettingsOutlineRounded";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";

// Components
import TabContentContainer from "../TabContentContainer";

// Utils
import { useFormSerialize, useFormValidation } from "@/utils/formUtils";

const initialAnimation = {
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

// Types
import { useFormStateType } from "@/Types/formStates";
interface toggleNotificationType {
  scheduleRemainder: string;
}

// Initials
const toggleNotificationInit: toggleNotificationType = {
  scheduleRemainder: "",
};
const useFormStateInitials: useFormStateType = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const NotificationDetails = () => {
  // Zustand store
  const { setValidation, validations, resetValidation, formAction } =
    useFormStore();

  // States
  const [state, action] = useFormState(mutatePreferences, useFormStateInitials);
  const [toggleNotification, setToggleNotification] =
    useState<toggleNotificationType>(toggleNotificationInit);
  const [isPending, setIsPending] = useState(false);

  // Events
  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    // const fieldsToCheck = ["enableDailyScheduleRemainder"];
    // let formValues: toggleNotificationType & { [key: string]: string } =
    //   useFormSerialize(event);
    // if (!useFormValidation(fieldsToCheck, formValues, setValidation)) {
    //   event.preventDefault();
    //   setIsPending(false);
    // }
  };
  const onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setToggleNotification((prev) => ({
        ...prev,
        [name]: "True",
      }));
    } else {
      setToggleNotification((prev) => ({
        ...prev,
        [name]: "false",
      }));
    }
  };

  useEffect(() => {
    console.log(state);
    setIsPending(false);
  }, [state]);

  return (
    <div className="laptop: w-[50%]">
      <TabContentContainer header="Notifications / Daily Remainders">
        <AnimatePresence mode="wait">
          <motion.div className="flex flex-col gap-2 mt-1">
            <motion.div
              key="notEditing"
              layout
              variants={initialAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2"
            >
              <form
                className="flex flex-col gap-4 phone:w-[96%] mdphone:w-11/12"
                onSubmit={useHandleFormSubmit}
                action={action}
              >
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="scheduleRemainder"
                    id="scheduleRemainder"
                    onChange={onCheckBoxChange}
                    value={toggleNotification.scheduleRemainder}
                  />
                  <label htmlFor="scheduleRemainder">
                    Enable Daily Schedule Remainder
                  </label>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    className={`${
                      isPending === null || isPending === false
                        ? "bg-LightPrimary text-LightSecondary"
                        : ""
                    } ${
                      isPending && "bg-LightPrimaryDisabled text-Disabled"
                    }  w-max px-4 py-1 text-sm rounded-md items-center flex gap-1`}
                    type="submit"
                  >
                    {isPending === null || isPending === false ? (
                      <>
                        <span className="w-4">
                          <MaterialSymbolsSettingsOutlineRounded color="#fff" />
                        </span>
                        Save Preferences
                      </>
                    ) : (
                      ""
                    )}
                    {isPending && (
                      <>
                        <SvgSpinnersBlocksShuffle3 color="#00ADB5" />
                        Saving Preferences
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </TabContentContainer>
    </div>
  );
};

export default NotificationDetails;
