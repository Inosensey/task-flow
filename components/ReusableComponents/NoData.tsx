import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// Types
interface props {
  ButtonName: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoData = ({ setShowForm, ButtonName }: props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      className="mdphone:w-[35%] tablet:w-2/12 tablet:mt-4 laptop:min-w-[150px] p-3 flex flex-col gap-1 rounded-lg h-44 bg-white bg-opacity-10 justify-center items-center cursor-pointer"
      onClick={() => setShowForm(true)}
    >
      <button>
        <span className="w-4">
          <FontAwesomeIcon className="text-3xl" icon={faCirclePlus} />
        </span>
      </button>
      <p className="text-[0.9rem]">{ButtonName}</p>
    </motion.div>
  );
};

export default NoData;
