interface props {
  date: Date;
}
interface dateType {
  date: number;
  day: number;
  month: number;
  year: number;
}
interface dateMonthsInterface {
  currentDate: Date;
  selectedMonth: number;
}
type calendarDate = {
  date: number;
  status: string;
};

export const useHours = () => {
  let hours = ["All Day"];
  let currentHour = 1;
  for (let index = 1; index <= 24; index++) {
    if (index === 12) {
      hours.push("12 PM");
      currentHour = 0;
    } else if (index === 24) {
      hours.push(`12 AM`);
    } else if (index > 12) {
      hours.push(`${currentHour} PM`);
    } else {
      hours.push(`${currentHour} AM`);
    }
    currentHour = currentHour + 1;
  }
  return hours;
};

export const formatHourTo12 = (hour: string | null) => {
  // Split the time into hours and minutes
  if (hour === null) return;
  let timeSplit = hour.split(":");
  let hours = parseInt(timeSplit[0]);
  let minutes = timeSplit[1];

  // Determine AM or PM
  let period = hours >= 12 ? "PM" : "AM";

  // Adjust hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be considered as 12

  // Pad single digit hours with a leading zero
  hours = hours < 10 ? 0 + hours : hours;

  // Return the formatted time
  return hours + ":" + minutes + " " + period;
};

export const getCurrentDate = (selectedDate: string | Date = "") => {
  const date = selectedDate == "" ? new Date() : new Date(selectedDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const localDate = `${year}-${month}-${day}`;
  return localDate;
};

export const formatSelectedDate = (selectedDate: string) => {
  const daysList = getDays();
  let date = new Date(selectedDate);
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const formattedSelectedDate = `${dayOfMonth}, ${daysList[dayOfWeek]}`;
  return formattedSelectedDate;
};

export const getCurrentDay = (selectedDate?: string) => {
  const currentDate = selectedDate ? new Date(selectedDate) : new Date();
  const currentDay = currentDate.getDay();
  const days = getDays();
  const day = days[currentDay];

  return day;
};

export const getDays = () => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days;
};
export const useMonths = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months;
};

export const getLastDaysOfPrevMonth = (selectedDate?: Date) => {
  const date = selectedDate === undefined ? new Date() : selectedDate;

  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  let lastDatesOfPreviousMonth: calendarDate[] = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    const lastDateOfPreviousMonth: number = lastDateOfLastMonth - i + 1;
    const status: string = "inactive";
    const calendarDate: calendarDate = {
      date: lastDateOfPreviousMonth,
      status: status,
    };
    lastDatesOfPreviousMonth.push(calendarDate);
  }
  return lastDatesOfPreviousMonth;
};

export const getCurrentMonthCalendarDates = (selectedDate?: Date) => {
  const date = selectedDate === undefined ? new Date() : selectedDate;
  const dateMonths = getDateMonths({
    currentDate: date,
    selectedMonth: date.getMonth(),
  });
  const calendarDates: calendarDate[] = dateMonths.dates.map(
    (date: number) => ({ date: date, status: "active" })
  );
  return calendarDates;
};

export const getFirstDaysOfNextMonth = (selectedDate?: Date) => {
  const date = selectedDate === undefined ? new Date() : selectedDate;
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  let calendarDate: calendarDate[] = [];
  for (let i = lastDayOfMonth; i < 6; i++) {
    // creating li of next month first days
    const firstDateOfNextMonth = i - lastDayOfMonth + 1;
    const status = "inactive";
    calendarDate.push({
      date: firstDateOfNextMonth,
      status: status,
    });
  }
  return calendarDate;
};

export const getCalendarDates = (selectedDate?: Date) => {
  const date = selectedDate === undefined ? new Date() : selectedDate;
  let calendarDates: calendarDate[] = [];
  const lastDaysOfPrevMonth = getLastDaysOfPrevMonth(date);
  const monthDates = getCurrentMonthCalendarDates(date);
  const firstDaysOfNextMonth = getFirstDaysOfNextMonth(date);

  calendarDates = lastDaysOfPrevMonth.concat(monthDates);
  calendarDates.push(...firstDaysOfNextMonth);

  return calendarDates;
};

export const getDateMonths = ({
  currentDate,
  selectedMonth,
}: dateMonthsInterface) => {
  let monthDates: string[] = [];
  let dates: number[] = [];
  currentDate.setMonth(selectedMonth);
  currentDate.setDate(1);
  // Loop through the days of the month
  while (currentDate.getMonth() === selectedMonth) {
    const dayOfWeek = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();

    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayOfWeek];

    // Move to the next day
    currentDate.setDate(dayOfMonth + 1);
    monthDates.push(`${dayOfMonth}, ${dayName}`);
    dates.push(dayOfMonth);
  }
  return { dates: dates, formattedDates: monthDates };
};
const useDate = ({ date }: props) => {
  const dates: dateType[] = [];
  let days = getDays();
  let months = useMonths();
  let selectedDate;
  if (date === undefined || date === null) {
    const currentDate = new Date();
    selectedDate = currentDate;
  } else {
    selectedDate = date;
  }
  for (let initialize = 0; initialize < 4; initialize++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + initialize);
    if (selectedDate?.getMonth() === newDate.getMonth()) {
      newDate.toLocaleString("en-US", { timeZone: "Asia/Manila" });
      dates.push({
        date: newDate.getDate(),
        day: newDate.getDay(),
        month: newDate.getMonth(),
        year: newDate.getFullYear(),
      });
    }
  }

  return { result: dates };
};

export default useDate;
