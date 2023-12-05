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

// Types
import { TableInsert, TableRow, TableUpdate } from "@/Types/database.types";

const Events = async () => {
  const getEvents = async () => {
    const res = await fetch("http://localhost:3000/api/supabase/getEvents",{next:{tags: ["events"], revalidate: 300}})
    const events = await res.json();
    return events;
  }
  const events:TableRow<"Events">[] = await getEvents();

  return (
    <div>
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Calendar" />
        <CalendarNav />
        <div className="w-full relative">
          <Schedules events={events} />
        </div>
      </div>
    </div>
  );
};

export default Events;
