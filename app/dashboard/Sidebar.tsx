import React from "react";
import TaskIcon from "@/svg/SimpleIconsTask.svg";

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

const Sidebar = () => {
  return (
    <div className="bg-[#1a1a1a] w-64 h-screen shadow-inner shadow-Secondary">
      <div className="flex items-center justify-center">
        <TaskIcon />
        <h1 className="text-LightPrimary font-semibold p-2 text-xl">
          TaskFlow
        </h1>
      </div>
      <div className="flex flex-col gap-10 mt-6">
        <div>
          <ul className={`flex flex-col gap-2 ${styles.navList}`}>
            <li>
              <MaterialSymbolsOverviewOutline color="#00ADB5" /> Overview
            </li>
            <li>
              <MaterialSymbolsCalendarMonthOutlineRounded color="#00ADB5" />{" "}
              Calendar
            </li>
            <li>
              <IonTodayOutline color="#00ADB5" /> To Do List
            </li>
            <li>
              <GgNotes color="#00ADB5" />
              Notes
            </li>
          </ul>
        </div>
        <div>
          <ul className={`flex flex-col gap-2 ${styles.utilsList}`}>
            <li>
              <IconamoonModeDark color="#00ADB5" /> Dark Mode
            </li>
            <li>
              <MaterialSymbolsSettingsOutlineRounded color="#00ADB5" />
              Settings
            </li>
            <li>
              <PhSealQuestionDuotone color="#00ADB5" />
              Help Center
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
