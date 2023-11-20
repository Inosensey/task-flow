"use server";

import CalendarNav from "@/components/Dashboard/Events/CalendarNav";
import Header from "@/components/Dashboard/Events/Header";
import Schedules from "@/components/Dashboard/Events/Schedules";

const Events = () => {
  return (
    <div className="flex flex-col w-full bg-Primary">
      <Header headerName="Calendar" />
      <CalendarNav />
      <div className="w-full">
        <Schedules />
      </div>
    </div>
  );
};

export default Events;
