import React from "react";
import SelectButton from "./SelectButton";

interface SelectBodyProps {
  labels: string[];
  small?: boolean;
}

const SelectBody: React.FC<SelectBodyProps> = ({ labels, small }) => {
  return (
    <div
      className={`flex gap-1 ${
        small ? "flex-wrap" : "flex-col justify-end w-full"
      }`}
    >
      {labels.map((label) => (
        <SelectButton key={label} label={label} small={small} />
      ))}
    </div>
  );
};

export default SelectBody;
