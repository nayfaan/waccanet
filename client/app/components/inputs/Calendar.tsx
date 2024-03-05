import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface CalendarProps {
  id: string;
  inline?: boolean;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  id,
  inline,
  register,
  required,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ReactDatePicker
      className="py-1.5 pl-2 border-5 rounded-md w-full"
      selected={selectedDate}
      inline={inline}
      onChange={(date: Date) => {
        setSelectedDate(date);
        register ? register(id, { value: date, required }) : "";
      }}
    />
  );
};

export default Calendar;
