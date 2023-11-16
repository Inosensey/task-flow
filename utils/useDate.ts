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

export const useDays = () => {
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
export const getDateMonths = ({ currentDate, selectedMonth }: dateMonthsInterface) => {
  let monthDates:string[] = [];
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
    monthDates.push(`${dayOfMonth}, ${dayName}`)
  }
  return monthDates;
};
const useDate = ({ date }: props) => {
  const dates: dateType[] = [];
  let days = useDays();
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
