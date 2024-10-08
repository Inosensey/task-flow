"use client";

// Cores
import React, { useEffect, useState } from "react";
import TaskIcon from "@/svg/SimpleIconsTask.svg";
import { useAnimation, motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Actions
import { signOut } from "@/actions/authActions";

// CSS modules
import styles from "@/css/SidebarComponent/sidebar.module.css";

// Components
import Loading from "@/components/ReusableComponents/Loading/Loading";

// Icones
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";
import MaterialSymbolsOverviewOutline from "@/Icones/MaterialSymbolsOverviewOutline";
import IonTodayOutline from "@/Icones/IonTodayOutline";
import GgNotes from "@/Icones/GgNotes";
import IconamoonModeDark from "@/Icones/IconamoonModeDark";
import PhSealQuestionDuotone from "@/Icones/PhSealQuestionDuotone";
import MaterialSymbolsSettingsOutlineRounded from "@/Icones/MaterialSymbolsSettingsOutlineRounded";
import CarbonLogin from "@/Icones/CarbonLogin";

const Sidebar = () => {
  // Initialize useRouter
  const router = useRouter();

  // Initial use query
  const queryClient = useQueryClient();

  // states
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [logoutProcessInfo, setLogoutProcessInfo] = useState<{
    isLoading: boolean;
    message: string;
  }>({
    isLoading: false,
    message: "",
  });

  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: () => {
      setLogoutProcessInfo({
        isLoading: true,
        message: "Signing Out. Please Wait! ⏳",
      });
      return signOut();
    },
    onSuccess: (data) => {
      console.log(data);
      setLogoutProcessInfo({
        isLoading: true,
        message: "Success! See You Soon! 👋",
      });
      queryClient.setQueryData(["user-session"], "");
      router.push("");
    },
  });

  // Framer motion logics

  // useAnimation
  const sidebarAnimation = useAnimation();

  // Variants
  const sidebarVariant = {
    hidden: {
      left: "-100%",
      transition: {
        type: "tween",
      },
    },
    show: {
      left: "0%",
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
      <Loading
        isLoading={logoutProcessInfo.isLoading}
        message={logoutProcessInfo.message}
      />
      <motion.div
        data-testid="sidebar"
        variants={sidebarVariant}
        animate={sidebarAnimation}
        // initial={showSideBar ? "show" : "hidden"}
        className={`bg-[#1a1a1a] text-LightSecondary w-64 h-screen shadow-inner shadow-Secondary fixed z-50 phone:-left-[100%] laptop:-left-[0%]`}
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
              <Link href={"/dashboard"}>
                <li
                  className="select-none"
                  onClick={() => {
                    if (window.innerWidth <= 991) {
                      sidebarAnimation.start("hidden");
                      setShowSideBar(false);
                    }
                  }}
                >
                  <MaterialSymbolsOverviewOutline color="#00ADB5" /> Overview
                </li>
              </Link>
              <Link href={"/dashboard/schedules"}>
                <li
                  onClick={() => {
                    if (window.innerWidth <= 991) {
                      sidebarAnimation.start("hidden");
                      setShowSideBar(false);
                    }
                  }}
                  className="select-none"
                >
                  <MaterialSymbolsCalendarMonthOutlineRounded color="#00ADB5" />{" "}
                  Calendar
                </li>
              </Link>

              <Link href={"/dashboard/todolist"}>
                <li
                  onClick={() => {
                    if (window.innerWidth <= 991) {
                      sidebarAnimation.start("hidden");
                      setShowSideBar(false);
                    }
                  }}
                  className="select-none"
                >
                  <IonTodayOutline color="#00ADB5" /> To Do List
                </li>
              </Link>
              <Link href={"/dashboard/notes"}>
                <li
                  onClick={() => {
                    if (window.innerWidth <= 991) {
                      sidebarAnimation.start("hidden");
                      setShowSideBar(false);
                    }
                  }}
                  className="select-none"
                >
                  <GgNotes color="#00ADB5" />
                  Notes
                </li>
              </Link>
            </ul>
          </div>
          <div className="px-3">
            <ul className={`flex flex-col gap-2 ${styles.utilsList}`}>
              <li className="select-none">
                <IconamoonModeDark color="#00ADB5" /> Dark Mode
              </li>
              <Link href={"/dashboard/settings"}>
                <li
                  onClick={() => {
                    if (window.innerWidth <= 991) {
                      sidebarAnimation.start("hidden");
                      setShowSideBar(false);
                    }
                  }}
                  className="select-none"
                >
                  <MaterialSymbolsSettingsOutlineRounded color="#00ADB5" />
                  Settings
                </li>
              </Link>
              <li className="select-none">
                <PhSealQuestionDuotone color="#00ADB5" />
                Help Center
              </li>
            </ul>
          </div>
          <div className="px-3">
            <ul className={`flex flex-col gap-2 ${styles.utilsList}`}>
              <li
                onClick={() => {
                  mutate();
                }}
                className="select-none"
              >
                <CarbonLogin color="#00ADB5" />
                <button>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      <div
        className="fixed w-8 bottom-5 right-5 flex flex-col gap-2 cursor-pointer z-50 mobile:block laptop:hidden"
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
