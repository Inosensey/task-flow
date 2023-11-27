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
