import ReactDatePicker from "react-datepicker";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface CalendarProps {
  id: string;
  value: Date;
  onChange: (id: string, value: Date | string) => void;
  inline?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ id, value, onChange, inline }) => {
  const handleClear = () => {
    onChange(id, "");
  };

  return (
    <div
      className={`${
        !inline ? " border-2 rounded-md flex items-center px-2" : ""
      }`}
    >
      <ReactDatePicker
        className="py-1.5 w-full focus:outline-none"
        selected={value}
        inline={inline}
        onChange={(date: Date) => onChange(id, date)}
      />
      {!inline && (
        <button onClick={handleClear}>
          <IoMdCloseCircleOutline
            className="text-gray-400 hover:text-gray-500"
            size={20}
          />
        </button>
      )}
    </div>
  );
};

export default Calendar;
