"use client";
import { useEffect, useState } from "react";

interface ToggleProps {
  id: string;
  messageTrue: string;
  messageFalse: string;
  value: boolean;
  onChange: (id: string, value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  messageTrue,
  messageFalse,
  value,
  onChange,
}) => {
  // const [toggle, setToggle] = useState(value);

  // const handleToggleChange = () => {
  //   setToggle(!toggle);
  // };

  // useEffect(() => {
  //   onChange(id, toggle);
  // }, [id, toggle]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={value}
        onChange={() => onChange(id, !value)}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
      <span className="ms-3 text-xs md:text-sm text-gray-400">
        {value ? messageTrue : messageFalse}
      </span>
    </label>
  );
};

export default Toggle;
