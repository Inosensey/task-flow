"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Icons
import PhUserCircle from "@/Icones/PhUserCircle";
import MaterialSymbolsRoomPreferencesOutline from "@/Icones/MaterialSymbolsRoomPreferencesOutline";

let tabs = [
  { id: "profile", label: "Profile", icon: <PhUserCircle color="#00ADB5" /> },
  {
    id: "preferences",
    label: "Preferences",
    icon: <MaterialSymbolsRoomPreferencesOutline color="#00ADB5" />,
  },
];

const Settings = () => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className="flex-1">
      <div className="text-LightSecondary py-2 px-2 border-t-2 border-LightPrimary flex justify-between items-center">
        <div className="bg-SmoothSecondary w-full p-2 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "hover:text-Disabled"
              } flex items-center justify-center gap-[0.2rem] flex-grow relative px-3 py-1.5 text-sm font-medium text-white transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 border-b-2 border-LightPrimary mix-blend-difference"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
