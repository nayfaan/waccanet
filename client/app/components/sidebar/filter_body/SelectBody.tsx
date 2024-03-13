import React, { useState } from "react";
import SelectButton from "./SelectButton";

interface SelectBodyProps {
  id: string;
  labels: string[];
  multipleChoice?: boolean;
  paramsArr: string[];
  onChange: (id: string, value: string[]) => void;
}

const SelectBody: React.FC<SelectBodyProps> = ({
  id,
  labels,
  multipleChoice,
  paramsArr,
  onChange,
}) => {
  return (
    <div
      className={`flex gap-1 ${
        multipleChoice ? "flex-wrap justify-start" : "flex-col w-full"
      }`}
    >
      {labels.map((label) => (
        <SelectButton
          id={id}
          key={label}
          label={label}
          multipleChoice={multipleChoice}
          paramsArr={paramsArr}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default SelectBody;
