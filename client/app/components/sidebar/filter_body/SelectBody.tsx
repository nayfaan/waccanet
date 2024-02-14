import React from "react";
import SelectButton from "./SelectButton";
import { FieldValues } from "react-hook-form";

interface SelectBodyProps {
  id: string;
  labels: string[];
  multipleChoice?: boolean;
  getValues: () => FieldValues;
  setValue: (name: string, value: any, options?: Record<string, any>) => void;
}

const SelectBody: React.FC<SelectBodyProps> = ({
  labels,
  multipleChoice,
  getValues,
  setValue,
  id,
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
          getValues={getValues}
          setValue={setValue}
        />
      ))}
    </div>
  );
};

export default SelectBody;
