import React from "react";
import Input from "../../inputs/Input";

const PriceBody = () => {
  return (
    <div className="flex gap-2">
      <Input id="from" label="From" />
      <Input id="to" label="To" />
    </div>
  );
};

export default PriceBody;
