"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

// Store
import { useNotificationStore } from "@/store/useNotificationStore";

const SlideDownNotification = () => {
  const { showSlideNotification, message } = useNotificationStore();
  // Variants
  const slideNotificationVariants = {
    hidden: {
      y: "-10vh",
      transition: {
        type: "tween",
      },
    },
    show: {
      y: "1vh",
      transition: {
        type: "tween",
        duration: 0.55,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {showSlideNotification && (
        <motion.div
          variants={slideNotificationVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="fixed bg-Success text-sm text-center p-[0.2rem] rounded-md w-80 left-0 right-0 mx-auto z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideDownNotification;
