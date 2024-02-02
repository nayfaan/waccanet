import React from "react";
import { useState } from "react";
import { IconType } from "react-icons";

interface FilterElementProps {
  id: string;
  label: string;
  icon: IconType;
  openElements: string[];
  body: any;
  color?: string;
}

const FilterElement: React.FC<FilterElementProps> = ({
  id,
  label,
  icon: Icon,
  openElements,
  body,
  color,
}) => {
  const [isElementOpen, setIsElementOpen] = useState(openElements.includes(id));

  const handleToggleDropdown = () => {
    setIsElementOpen(!isElementOpen);
  };

  return (
    <div className="py-1 border-t-[1px] w-full">
      <button
        type="button"
        className="flex items-center justify-between w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group  dark:text-white dark:hover:bg-gray-700"
        onClick={handleToggleDropdown}
      >
        <div className="flex items-center">
          <Icon size={20} color={color} />
          <span className="ms-3">{label}</span>
        </div>

        <svg
          className={`w-3 h-3 ${isElementOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id={`dropdown-${id}`}
        className={`py-2 space-y-2 ${isElementOpen ? "" : "hidden"}`}
      >
        {body && (
          <ul className="flex flex-col items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-9 group  dark:text-white dark:hover:bg-gray-700">
            {body}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterElement;
