import { Condition } from "@/app/types/types";
import React, { useState } from "react";

interface CheckboxProps {
  condition: Condition;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ condition, isChecked }) => {
  const [check, setCheck] = useState(isChecked);

  return (
    <li key={condition.name}>
      <a
        href="#"
        className="flex items-center gap-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <input
          id="checked-checkbox"
          type="checkbox"
          value={condition.name}
          checked={check}
          onChange={() => setCheck((prev) => !prev)}
          className="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checked-checkbox" className="flex-1  whitespace-nowrap">
          {condition.name}
        </label>
      </a>
    </li>
  );
};

export default Checkbox;
