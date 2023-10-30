interface props {
  date: Date;
}

const useDate = ({ date }: props) => {
  const dates = [];
  let selectedDate;
  if(date === undefined || date === null) {
    const currentDate = new Date();
    selectedDate = currentDate;
  }
  for (let initialize = 0; initialize < 4; initialize++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + initialize);
    newDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    dates.push(newDate);
  }

  return ({result: dates});
};

export default useDate;
