"use server";

import { cookies } from "next/headers";

// Components
import OverviewSection from "@/components/Dashboard/OverviewSection";
import OverviewChildren from "@/components/Dashboard/OverviewChildren";
import Header from "@/components/Dashboard/Header";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";
import IonTodayOutline from "@/Icones/IonTodayOutline";
import GgNotes from "@/Icones/GgNotes";
import MaterialSymbolsOverviewOutline from "@/Icones/MaterialSymbolsOverviewOutline";

// lib
import { getAuthSession } from "@/lib/AuthMethods";
import { createClient } from "@/utils/supabaseSSR";

const Page = async () => {

  return (
    <div className="flex flex-col w-full bg-Primary">
      <div className="max-w-[900px] w-full">
        <Header headerName="Overview" Icon={MaterialSymbolsOverviewOutline} />
        <div className="flex gap-4 phone:flex-col mx-auto phone:w-10/12">
          <OverviewSection
            OverviewTitle="Today's Schedules"
            Icon={MaterialSymbolsCalendarMonthOutlineRounded}
          >
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">Schedules</small>
                <div className="flex flex-col gap-2  text-sm">
                  <div className="flex gap-2">
                    <p>Schedule title</p>
                    <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                      View
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <p>Schedule title2</p>
                    <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              </OverviewChildren>
            </div>
          </OverviewSection>
          <OverviewSection
            OverviewTitle="Remaining schedules this week"
            Icon={MaterialSymbolsCalendarMonthOutlineRounded}
          >
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">Schedules</small>
                <div className="flex flex-col gap-2  text-sm">
                  <div className="flex gap-2">
                    <p>Schedule title</p>
                    <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                      View
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <p>Schedule title2</p>
                    <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              </OverviewChildren>
            </div>
          </OverviewSection>
          <OverviewSection OverviewTitle="To Do List" Icon={IonTodayOutline}>
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">
                  Completed To Do List last week
                </small>
                <p>5</p>
              </OverviewChildren>
              <OverviewChildren>
                <small className="text-Disabled">Remaining To Do List</small>
                <p>2</p>
              </OverviewChildren>
            </div>
          </OverviewSection>
          <OverviewSection OverviewTitle="Notes" Icon={GgNotes}>
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">Added notes last week</small>
                <p>5</p>
              </OverviewChildren>
            </div>
          </OverviewSection>
        </div>
      </div>
    </div>
  );
};

export default Page;