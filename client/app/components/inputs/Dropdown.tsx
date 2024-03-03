import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

interface DropdownProps {
  label: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkedLabel, setCheckedLabel] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheck = (item: string) => {
    setCheckedLabel(item);
    setIsClosing(true);

    // 500ms 後にドロップダウンを閉じる
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      <div className="w-full relative" ref={dropdownRef}>
        <label
          className="w-full p-3.5 text-sm border-gray-300 text-zinc-400 bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-between"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {checkedLabel ? checkedLabel : "Select area"}
          <RiArrowDropDownLine size={20} />
        </label>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className={`absolute z-10 bg-gray-50 rounded-lg shadow ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <ul
            className="text-sm text-gray-700"
            aria-labelledby="multiLevelDropdownButton"
          >
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200"
                onClick={() => handleCheck(item)}
              >
                {item === checkedLabel ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                <li>{item}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
