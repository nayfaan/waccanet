import React from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import Input from "../../inputs/Input";
import Button from "../../Button";

const PriceBody = () => {
  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      minPrice: null,
      maxPrice: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("onSubmit called", data);

    // call api
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input id="minPrice" label="下限" register={register} />
        <Input id="maxPrice" label="上限" register={register} />
      </div>

      <Button label="検索" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default PriceBody;
