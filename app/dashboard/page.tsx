"use server";

// Components
import OverviewSection from "@/components/Dashboard/OverviewSection";
import OverviewChildren from "@/components/Dashboard/OverviewChildren";
import Header from "@/components/Dashboard/Schedules/Header";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";
import IonTodayOutline from "@/Icones/IonTodayOutline";
import GgNotes from "@/Icones/GgNotes";

const Page = () => {
  return (
    <div className="flex flex-col w-full bg-Primary">
      <div className="max-w-[900px] w-full">
        <Header headerName="Overview" />
        <div className="flex gap-4 phone:flex-col mx-auto phone:w-10/12">
          <OverviewSection
            OverviewTitle="Schedules"
            Icon={MaterialSymbolsCalendarMonthOutlineRounded}
          >
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">Today&apos;s schedules</small>
                <p>5</p>
              </OverviewChildren>
              <OverviewChildren>
                <small className="text-Disabled">
                  Remaining schedules this week
                </small>
                <p>2</p>
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
