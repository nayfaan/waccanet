"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  required,
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handlePrice = useDebouncedCallback(
    (priceFromTo: string, price: string) => {
      const params = new URLSearchParams(searchParams);
      if (priceFromTo == "minPrice") {
        params.set("price_from", price);
      }
      if (priceFromTo == "maxPrice") {
        params.set("price_to", price);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    450
  );

  return (
    <div className="w-full relative ">
      <input
        id={id}
        disabled={disabled}
        placeholder=""
        type={type}
        {...register(id, { required })}
        onChange={(e) => {
          handlePrice(id, e.target.value);
        }}
        className={`peer w-full p-1 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
    ${formatPrice ? "pl-9" : " pl-4"}
    `}
      />
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
    ${formatPrice ? "left-9" : "left-4"}
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-4
    text-zinc-400
    `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
