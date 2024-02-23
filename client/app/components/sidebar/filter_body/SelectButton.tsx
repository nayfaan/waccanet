"use client";

import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SelectButtonProps {
  id: string;
  label: string;
  multipleChoice?: boolean;
  getValues: () => FieldValues;
  setValue: (name: string, value: any, options?: Record<string, any>) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  id,
  label,
  multipleChoice,
  getValues,
  setValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const selectedValues = getValues()[id] || [];
  const isLabelIncluded = selectedValues.includes(label);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleRegister = () => {
    setIsChecked(!isChecked);

    // if (multipleChoice) {
    const updatedValues = isLabelIncluded
      ? selectedValues.filter((value: string) => value !== label) // id が含まれている場合は削除
      : [...selectedValues, label]; // id が含まれていない場合は追加
    setValue(id, updatedValues); // 更新された値をフォームに反映

    console.log(updatedValues);

    // 現在のURLにフィルタのパラメータを追加
    const params = new URLSearchParams(searchParams);

    if (updatedValues.length == 0) {
      params.delete(id);
    } else {
      const joinedFilterElements = updatedValues.join("_");
      params.set(id, joinedFilterElements);
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
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
      onClick={handleRegister}
    >
      {isChecked && !multipleChoice && <FaCheckCircle />}
      {label}
    </button>
  );
};

export default SelectButton;
