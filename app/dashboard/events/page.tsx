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

const queryClient = new QueryClient();
const Events = async () => {
  const getEvents = async () => {
    const res = await fetch("http://localhost:3000/api/supabase/getEvents")
    const events = await res.json();
    console.log(events);
    return events;
  }

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
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
