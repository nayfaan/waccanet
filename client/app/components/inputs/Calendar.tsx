import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface CalendarProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ id, register, required }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      className="py-1.5 pl-2 border-2 rounded-md w-full"
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date);
        register(id, { value: date, required });
      }}
    />
  );
};

export default Calendar;
