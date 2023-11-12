"use client";

import React, { useState } from "react";
import TaskIcon from "@/svg/SimpleIconsTask.svg";
import { useAnimation, motion } from "framer-motion";

// CSS modules
import styles from "@/css/SidebarComponent/sidebar.module.css";

// Icones
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";
import MaterialSymbolsOverviewOutline from "@/Icones/MaterialSymbolsOverviewOutline";
import IonTodayOutline from "@/Icones/IonTodayOutline";
import GgNotes from "@/Icones/GgNotes";
import IconamoonModeDark from "@/Icones/IconamoonModeDark";
import PhSealQuestionDuotone from "@/Icones/PhSealQuestionDuotone";
import MaterialSymbolsSettingsOutlineRounded from "@/Icones/MaterialSymbolsSettingsOutlineRounded";
import MaterialSymbolsMenuRounded from "@/Icones/MaterialSymbolsMenuRounded";

const Sidebar = () => {
  // states
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  // Framer motion logics

  // useAnimation
  const sidebarAnimation = useAnimation();

  // Variants
  const sidebarVariant = {
    hidden: {
      x: "-100%",
      transition: {
        type: "tween",
      },
    },
    show: {
      x: "0%",
      transition: {
        type: "tween",
      },
    },
  };

  const animateSidebar = () => {
    if (!showSideBar) {
      sidebarAnimation.start("show");
    } else {
      sidebarAnimation.start("hidden");
    }
  };

  return (
    <>
      <motion.div
        variants={sidebarVariant}
        animate={sidebarAnimation}
        className={`bg-[#1a1a1a] w-64 h-screen shadow-inner shadow-Secondary fixed z-50`}
      >
        <div className="flex items-center justify-center">
          <TaskIcon />
          <h1 className="text-LightPrimary font-semibold p-2 text-xl">
            TaskFlow
          </h1>
        </div>
        <div className="flex flex-col mt-6">
          <div className="px-3">
            <ul className={`flex flex-col gap-2 ${styles.navList}`}>
              <li className="select-none">
                <MaterialSymbolsOverviewOutline color="#00ADB5" /> Overview
              </li>
              <li className="select-none">
                <MaterialSymbolsCalendarMonthOutlineRounded color="#00ADB5" />{" "}
                Calendar
              </li>
              <li className="select-none">
                <IonTodayOutline color="#00ADB5" /> To Do List
              </li>
              <li className="select-none">
                <GgNotes color="#00ADB5" />
                Notes
              </li>
            </ul>
          </div>
          <div className="px-3">
            <ul className={`flex flex-col gap-2 ${styles.utilsList}`}>
              <li className="select-none">
                <IconamoonModeDark color="#00ADB5" /> Dark Mode
              </li>
              <li className="select-none">
                <MaterialSymbolsSettingsOutlineRounded color="#00ADB5" />
                Settings
              </li>
              <li className="select-none">
                <PhSealQuestionDuotone color="#00ADB5" />
                Help Center
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      <div
        className="fixed w-8 bottom-5 right-5 flex flex-col gap-2 cursor-pointer z-50"
        onClick={() => {
          animateSidebar();
          setShowSideBar((prev) => !prev);
        }}
      >
        {/* <MaterialSymbolsMenuRounded color="#00ADB5" /> */}
        <div
          className={`w-[100%] border-2 border-LightPrimary rounded-md transition-all ${
            showSideBar
              ? "rotate-45 origin-top-left"
              : "rotate-0 origin-top-left"
          }`}
        ></div>
        <div
          className={`w-[100%] border-2 border-LightPrimary rounded-md transition-all ${
            showSideBar ? "opacity-0" : "opacity-1"
          }`}
        ></div>
        <div
          className={`w-[100%] border-2 border-LightPrimary rounded-md transition-all ${
            showSideBar
              ? "-rotate-45 origin-bottom-left"
              : "-rotate-0 origin-bottom-left"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
