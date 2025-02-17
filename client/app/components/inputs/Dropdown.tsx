import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface DropdownProps {
  id: string;
  label: string;
  value: string | string[];
  onChange: (id: string, value: string) => void;
  items:
    | string[]
    | { expo_line: string[]; canada_line: string[]; millennium_line: string[] };
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  value,
  onChange,
  items,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheck = (item: string) => {
    // 500ms 後にドロップダウンを閉じる
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);

    onChange(id, item);
  };

  const convertCategory = (str: string) => {
    return str
      .replace(/_/g, " ")
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  };

  const renderItems = (items: string[] | Record<string, string[]>) => {
    if (Array.isArray(items)) {
      return (
        <ul className="text-sm text-gray-700">
          {items.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-1 py-1 pl-2 pr-4 rounded hover:bg-gray-200 ${
                item === value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleCheck(item)}
            >
              {item === value ? (
                <FaCheck />
              ) : (
                <FaCheck className="text-gray-50" />
              )}
              <li className="p-1">{item}</li>
            </div>
          ))}
        </ul>
      );
    } else {
      return (
        <ul className="text-sm text-gray-700">
          {Object.entries(items).map(([category, subItems]) => (
            <li key={category}>
              <div className="flex items-center gap-1 pl-4 py-1">
                <strong>{convertCategory(category)}</strong>
              </div>
              {renderItems(subItems)}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <input
        placeholder=""
        readOnly
        value={value}
        className={`peer w-full p-1 pl-4 pt-6 font-light bg-white border-2 border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      <button onClick={() => onChange(id, "")}>
        <IoMdCloseCircleOutline
          className="absolute inset-y-0 end-0 flex items-center pr-3 h-full text-gray-300 hover:text-gray-400"
          size={32}
        />
      </button>
      <label
        className={`absolute flex justify-between left-4 text-sm duration-150 transform -translate-y-3 top-5 origin-[0]
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75 text-zinc-400
                    peer-focus:-translate-y-4`}
      >
        {label}
        <RiArrowDropDownLine size={20} />
      </label>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className={`absolute bg-gray-100 rounded-lg shadow-lg z-50 max-h-48 md:max-h-64 ${
            isDropdownOpen ? "block" : "hidden"
          }`}
          style={{
            top: "calc(100% + 1px)", // inputの下に配置
            left: "0",
            transform: "translateX(0)",
            overflowY: "auto", // 高さを超えた場合にスクロール可能にする
          }}
        >
          {renderItems(items)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
