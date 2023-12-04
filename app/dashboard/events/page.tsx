"use server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// Server actions
import { getEvents } from "@/actions/eventActions";

// Components
import CalendarNav from "@/components/Dashboard/Events/CalendarNav";
import Header from "@/components/Dashboard/Events/Header";
import Schedules from "@/components/Dashboard/Events/Schedules";

const Events = async () => {
  const queryClient = new QueryClient();
  const getEvents = async () => {
    const res = await fetch("http://localhost:3000/api/supabase/getEvents")
    const events = await res.json();
    return events;
  }

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 1 * (60 * 1000),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Calendar" />
        <CalendarNav />
        <div className="w-full relative">
          <Schedules />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Events;
