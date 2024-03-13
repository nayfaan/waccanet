"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

interface SelectButtonProps {
  id: string;
  label: string;
  multipleChoice?: boolean;
  paramsArr: string[];
  onChange: (id: string, value: string[]) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  id,
  label,
  multipleChoice,
  paramsArr,
  onChange,
}) => {
  const formattedParamsArr = paramsArr.map((param) =>
    param.replace("%20", " ")
  );
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({ [id]: formattedParamsArr });

  const [isChecked, setIsChecked] = useState(
    selectedValues[id]?.includes(label) ?? false
  );

  useEffect(() => {
    // 読み込まれた時にselectedValuesにparamから取得した値を入れる
    setSelectedValues((prev) => ({ ...prev, [id]: formattedParamsArr }));
  }, [paramsArr, id]);

  useEffect(() => {
    // selectedValuesが更新されたらisCheckedをtoggle
    // label名が配列にあればtrue,なければfalse
    setIsChecked(selectedValues[id]?.includes(label) ?? false);
  }, [label, selectedValues, id]);

  const handleSelectButtonClick = () => {
    const updatedValues = selectedValues[id]?.includes(label)
      ? selectedValues[id]?.filter((value) => value !== label) ?? []
      : [...(selectedValues[id] ?? []), label];

    // 選択された値を更新
    setSelectedValues((prev) => ({ ...prev, [id]: updatedValues }));
    onChange(id, updatedValues);
  };

  return (
    <>
      {label && (
        <button
          id={id}
          className={`flex items-center justify-center gap-2 py-1.5 border-2 font-medium rounded-lg
      ${
        isChecked
          ? "bg-blue-500 text-white border-blue-500"
          : "text-zinc-400 bg-white"
      }
      ${multipleChoice ? "text-xs" : "text-sm py-1.5"}
      
      `}
          onClick={handleSelectButtonClick}
        >
          {isChecked && !multipleChoice && <FaCheckCircle />}
          {label}
        </button>
      )}
    </>
  );
};

export default SelectButton;
