import ReactDatePicker from "react-datepicker";

interface CalendarProps {
  id: string;
  value: Date;
  onChange: (id: string, value: Date) => void;
  inline?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ id, value, onChange, inline }) => {
  return (
    <ReactDatePicker
      className="py-1.5 pl-2 border-5 rounded-md w-full"
      selected={value}
      inline={inline}
      onChange={(date: Date) => onChange(id, date)}
    />
  );
};

export default Calendar;
