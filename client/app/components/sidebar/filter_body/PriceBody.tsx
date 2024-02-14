import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../inputs/Input";

interface PriceBodyProps {
  register: UseFormRegister<FieldValues>;
}

const PriceBody: React.FC<PriceBodyProps> = ({ register }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input id="minPrice" label="From" register={register} />
        <Input id="maxPrice" label="To" register={register} />
      </div>
    </div>
  );
};

export default PriceBody;
