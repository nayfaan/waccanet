import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
interface SelectButtonProps {
  label: string;
  small?: boolean;
}

const SelectButton: React.FC<SelectButtonProps> = ({ label, small }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <button
      className={`flex items-center justify-center gap-2 py-1.5 text-sm border-2 font-medium rounded-lg
      ${
        isChecked
          ? "bg-blue-500 text-white border-blue-500"
          : "text-zinc-400 bg-white"
      }
      `}
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked && !small && <FaCheckCircle />}
      {label}
    </button>
  );
};

export default SelectButton;
