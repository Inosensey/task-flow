"use client"

import React, { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Utils
import { useHours } from "@/utils/useDate";

// Props
type props = {
  date: string;
};
type schedule = {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  duration: number;
};

// Sample data
const schedules: schedule[] = [
  {
    title: "Sleep",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quo accusantium provident amet consequuntur quam at, soluta recusandae maxime eos atque asperiores dolores quaerat veniam?",
    timeStart: "All Day",
    timeEnd: "",
    duration: 1,
  },
  {
    title: "Practice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quo accusantium provident amet consequuntur quam at, soluta recusandae maxime eos atque asperiores dolores quaerat veniam?",
    timeStart: "8 AM",
    timeEnd: "12 PM",
    duration: 5,
  },
  {
    title: "Second Practice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quo accusantium provident amet consequuntur quam at, soluta recusandae maxime eos atque asperiores dolores quaerat veniam?",
    timeStart: "3 PM",
    timeEnd: "5 PM",
    duration: 3,
  },
];
// 1a1a1a
const Schedule = ({ date }: props) => {
  // States 
  const [timeHeightNumber, setTimeHeightNumber] = useState<number>(0)

  useEffect(() => {
    if (window.innerWidth > 420) {
      setTimeHeightNumber(96);
    }
    if (window.innerWidth > 280) {
      setTimeHeightNumber(96);
    }
  },[])

  const hours = useHours();
  return (
    <div className="flex-1">
      <p className="py-4 px-2 border-b-2 border-LightPrimary">{date}</p>
      <div className="flex flex-col pl-2">
        {hours.map((hour, index: number) => (
          <div className="flex relative justify-center phone:h-20 mdphone:h-24" key={index}>
            {schedules.map((info: schedule, index: number) => {
              if (info.timeStart === hour) {
                const height = timeHeightNumber * info.duration;
                return (
                  <div
                    style={{ height: `${height}px` }}
                    className={`absolute flex items-center px-2 border-l-2 border-LightPrimary w-full rounded-2xl`}
                    key={index}
                  >
                    <div className="flex flex-col gap-1 bg-[#1a1a1a] rounded-lg w-full p-2 z-40">
                      <div className="flex text-LightSecondary phone:text-sm phone:flex-col phone:items-start mdphone:gap-3 mdphone:flex-row mdphone:items-center">
                        <p>{info.title}</p>
                        <div className="phone:w-10/12 flex items-center gap-1">
                          <span className="w-4">
                            <FontAwesomeIcon
                              className="text-sm text-LightPrimary"
                              icon={faClock}
                            />
                          </span>
                          <div className="flex gap-1 text-sm">
                            <p>{info.timeStart}</p>
                            {info.timeEnd !== "" && (
                              <span className="w-4">
                                <FontAwesomeIcon
                                  className="text-sm"
                                  icon={faArrowRight}
                                />
                              </span>
                            )}
                            <p>{info.timeEnd}</p>
                          </div>
                        </div>
                      </div>
                      <button className="cursor-pointer bg-Secondary phone:text-sm rounded-md text-LightSecondary phone:w-32 phone:py-1">
                        More Details
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          // <p>{hour}</p>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
