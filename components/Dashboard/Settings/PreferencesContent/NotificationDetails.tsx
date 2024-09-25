import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";

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
import { TableRow } from "@/Types/database.types";
interface toggleNotificationType {
  scheduleRemainder: string;
}
interface props {
  settingsInfo: TableRow<"Settings">
}


const NotificationDetails = ({settingsInfo}:props) => {
  // useQuery
  const queryClient = useQueryClient();

  // Initials
  const toggleNotificationInit: toggleNotificationType = {
    scheduleRemainder: settingsInfo ? `${settingsInfo.scheduleRemainder}` : "",
  };
  const useFormStateInitials: useFormStateType = {
    success: null,
    error: null,
    message: "",
    data: [],
  };

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
  };
  const onCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setToggleNotification((prev) => ({
        ...prev,
        [name]: "true",
      }));
      
    } else {
      setToggleNotification((prev) => ({
        ...prev,
        [name]: "false",
      }));
    }
  };

  useEffect(() => {
    if(state.success) {
      queryClient.invalidateQueries({queryKey: ["settingsInfo"]})
      setIsPending(false);
    }
    setIsPending(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    defaultChecked={settingsInfo.scheduleRemainder ? true : false}
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
