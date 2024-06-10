"use server";

import { cookies, headers } from "next/headers";
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
import { resetTodoLists } from "@/lib/todolistMethods";

// Utils
import {
  getCurrentDaySchedules,
  getCurrentWeekSchedules,
} from "@/utils/getCurrentDaySchedules";
import { getCurrentDay } from "@/utils/useDate";
import { getSupabaseUser } from "@/utils/supabaseUtils";

// Types
import { TableRow } from "@/Types/database.types";
import {
  todoListDetails,
} from "@/Types/todoListTypes";

const Page = async () => {
  const userData = await getSupabaseUser();
  const userId = userData.data.user!.id;
  const headerInfo = headers();
  const currentDay = getCurrentDay();

  let apiRootUrl;
  if(process.env.NODE_ENV === "development") {
    apiRootUrl = process.env.NEXT_DEV_URL
  } else {
    apiRootUrl = process.env.NEXT_PROD_URL
  }
  
  // Fetch
  const [schedulesData ,resetTodoListResult, todoLists] = await Promise.all([
    fetch(`${apiRootUrl}api/supabase/getSchedules?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["schedules"] },
      cache: "force-cache"
    }),
    resetTodoLists(),
    fetch(`${apiRootUrl}api/supabase/getTodoList?user=${userId}`, {
      headers: { cookie: headerInfo.get("cookie")! },
      next: { tags: ["todolists"] },
      cache: "force-cache"
    }),
  ]);

  const todoList = await todoLists.json();
  const schedules = await schedulesData.json();

  const unsortedTodoList: todoListDetails[] = todoList.response.unsortedTodoList;
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
    schedules.schedules,
    ""
  );schedules
  const currentWeekSchedules = getCurrentWeekSchedules(schedules.schedules);

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
          <OverviewSection
            OverviewTitle="Completed To-do List this day"
            Icon={IonTodayOutline}
          >
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">To-do List</small>
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
            </div>
          </OverviewSection>
          <OverviewSection
            OverviewTitle="Remaining To-do List"
            Icon={IonTodayOutline}
          >
            <div className="flex gap-2">
              <OverviewChildren>
                <small className="text-Disabled">To-do List</small>
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
