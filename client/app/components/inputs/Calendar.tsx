import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      className="w-full p-2"
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export default Calendar;
