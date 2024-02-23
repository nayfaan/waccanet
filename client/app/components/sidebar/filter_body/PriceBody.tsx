"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import Input from "../../inputs/Input";

const PriceBody = () => {
  const { register } = useForm<FieldValues>({
    defaultValues: {
      minPrice: null,
      maxPrice: null,
    },
  });
  const [minErrorMessage, setMinErrorMessage] = useState("");
  const [maxErrorMessage, setMaxErrorMessage] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handlePrice = useDebouncedCallback(
    (priceFromTo: "minPrice" | "maxPrice", price: string) => {
      const params = new URLSearchParams(searchParams);
      const priceNum = parseInt(price, 10);

      if (isNaN(priceNum) && price !== "") {
        // エラー処理: 文字列の時
        if (priceFromTo === "minPrice") {
          params.delete("price_from");
          setMinErrorMessage("数字を入力してください");
        } else if (priceFromTo === "maxPrice") {
          params.delete("price_to");
          setMaxErrorMessage("数字を入力してください");
        }
        console.error("Invalid input. Please enter a valid number.");

        return;
      }

      // minPrice
      if (priceFromTo == "minPrice") {
        if (price === "" || priceNum === 0) {
          // 空欄または0が入力された時
          params.delete("price_from");
          setMinErrorMessage("");
        } else {
          // 通常時
          params.set("price_from", price);
          setMinErrorMessage("");
        }
      }

      // maxPrice
      if (priceFromTo === "maxPrice") {
        const minPrice = parseInt(params.get("price_from") || "0", 10);

        if (price === "") {
          // 空欄の時
          params.delete("price_to");
          setMaxErrorMessage("");
        } else if (!isNaN(priceNum) && priceNum >= minPrice) {
          // 正常な値の場合（数字が入力され、かつmaxPriceがminPriceより大きい時）
          params.set("price_to", price);
          setMaxErrorMessage("");
        } else if (priceNum < minPrice) {
          // エラー処理: maxPriceがminPriceより小さい場合
          console.error("maxPrice must be greater than or equal to minPrice");
          setMaxErrorMessage("下限金額より大きな数字を入れてください");
        }
      }

      replace(`${pathname}?${params.toString()}`);
    },
    450
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          id="minPrice"
          label="下限"
          register={register}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePrice("minPrice", e.target.value)
          }
          errorMessage={minErrorMessage ? minErrorMessage : ""}
        />
        <Input
          id="maxPrice"
          label="上限"
          register={register}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlePrice("maxPrice", e.target.value)
          }
          errorMessage={maxErrorMessage ? maxErrorMessage : ""}
        />
      </div>
    </div>
  );
};

export default PriceBody;
