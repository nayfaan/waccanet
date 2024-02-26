import React, { useState } from "react";
import SelectButton from "./SelectButton";
import { FieldValues } from "react-hook-form";

interface SelectBodyProps {
  id: string;
  labels: string[];
  multipleChoice?: boolean;
  paramsArr: string[];
}

const SelectBody: React.FC<SelectBodyProps> = ({
  id,
  labels,
  multipleChoice,
  paramsArr,
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
        />
      ))}
    </div>
  );
};

export default SelectBody;
