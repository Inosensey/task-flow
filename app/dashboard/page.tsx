"use server";

import { cookies } from "next/headers";
import Link from "next/link";

// Components
import OverviewSection from "@/components/Dashboard/OverviewSection";
import OverviewChildren from "@/components/Dashboard/OverviewChildren";
import Header from "@/components/Dashboard/Header";

// Icons
import MaterialSymbolsCalendarMonthOutlineRounded from "@/Icones/MaterialSymbolsCalendarMonthOutlineRounded";
import IonTodayOutline from "@/Icones/IonTodayOutline";
import GgNotes from "@/Icones/GgNotes";
import MaterialSymbolsOverviewOutline from "@/Icones/MaterialSymbolsOverviewOutline";

// libs
import { getSchedules } from "@/lib/scheduleMethods";
import { getTodoLists, resetTodoLists } from "@/lib/todolistMethods";

// Utils
import {
  getCurrentDaySchedules,
  getCurrentWeekSchedules,
} from "@/utils/getCurrentDaySchedules";
import { getCurrentDay } from "@/utils/useDate";

// Types
import { TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import {
  todoListDetails,
  todoListResponseInterface,
} from "@/Types/todoListTypes";
interface schedulesInterface {
  schedules: TableRow<"Schedules">[] | null;
}

const Page = async () => {
  const currentDay = getCurrentDay();
  // Schedules
  let schedulesData: schedulesInterface = {
    schedules: await getSchedules(),
  };

  // Todo Lists
  
  const [resetTodoListResult, todoLists] = await Promise.all([resetTodoLists(), getTodoLists()])
  const unsortedTodoList: todoListDetails[] =
    todoLists.Response.unsortedTodoList;
  const formattedTodoList = unsortedTodoList.filter(
    (details: todoListDetails) =>
      details.Frequencies.frequency === currentDay ||
      details.Frequencies.frequency === "Everyday"
  );
  const completedTodos: todoListDetails[] | [] = formattedTodoList.filter(
    (details: todoListDetails) => details.TodoListStatus.status === "Completed"
  );
  const activeTodos: todoListDetails[] | [] = formattedTodoList.filter(
    (details: todoListDetails) => details.TodoListStatus.status === "Active"
  );

  const currentDaySchedules = getCurrentDaySchedules(
    schedulesData.schedules,
    ""
  );
  const currentWeekSchedules = getCurrentWeekSchedules(schedulesData.schedules);

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
                  {currentDaySchedules.length !== 0 ? (
                    currentDaySchedules.map(
                      (schedules: TableRow<"Schedules">) => (
                        <div key={schedules.id} className="flex gap-2">
                          <p>{schedules.title}</p>
                          <Link href={`/dashboard/schedules/${schedules.id}`}>
                            <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                              View
                            </button>
                          </Link>
                        </div>
                      )
                    )
                  ) : (
                    <p className="phone:text-xs">
                      Today&apos;s schedule is empty.{" "}
                      <Link href={`/dashboard/schedules`}>
                        <span className="text-LightPrimary underline">
                          Would you like to create one?
                        </span>
                      </Link>
                    </p>
                  )}
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
                <div className="flex flex-col gap-2 text-sm">
                  {currentWeekSchedules.length !== 0 ? (
                    currentWeekSchedules.map(
                      (schedules: TableRow<"Schedules">) => (
                        <div key={schedules.id} className="flex gap-2">
                          <p>{schedules.title}</p>
                          <Link href={`/dashboard/schedules/${schedules.id}`}>
                            <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                              View
                            </button>
                          </Link>
                        </div>
                      )
                    )
                  ) : (
                    <p className="phone:text-xs">No schedules this week.</p>
                  )}
                </div>
              </OverviewChildren>
            </div>
          </OverviewSection>
          <OverviewSection OverviewTitle="To Do List" Icon={IonTodayOutline}>
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">
                  Completed To Do List this day
                </small>
                {completedTodos.length !== 0 ? (
                  completedTodos.map((details: todoListDetails) => (
                    <div key={details.id} className="phone:text-xs">
                      <p>{details.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="phone:text-xs">
                    You haven&apos;t done any To dos.
                  </p>
                )}
              </OverviewChildren>
              <OverviewChildren>
                <small className="text-Disabled">Remaining To Do List</small>
                <div className="text-sm flex flex-col gap-1">
                  {activeTodos.length !== 0 ? (
                    activeTodos.map((details: todoListDetails) => (
                      <div key={details.id} className="text-sm flex gap-2">
                        <p>{details.title}</p>
                        <Link href={`/dashboard/todolist`}>
                          <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
                            View
                          </button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="phone:text-xs">
                      You have completed all of your To dos.
                    </p>
                  )}
                </div>
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
