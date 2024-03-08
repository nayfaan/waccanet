"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Input from "../../inputs/Input";

interface PriceBodyProps {
  price_from: string;
  price_to: string;
}

const PriceBody: React.FC<PriceBodyProps> = ({ price_from, price_to }) => {
  const [minErrorMessage, setMinErrorMessage] = useState("");
  const [maxErrorMessage, setMaxErrorMessage] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handlePrice = useDebouncedCallback((id: string, price: string) => {
    const params = new URLSearchParams(searchParams);
    const priceNum = parseInt(price, 10);

    if (isNaN(priceNum) && price !== "") {
      // エラー処理: 文字列の時
      if (id === "price_from") {
        params.delete("price_from");
        setMinErrorMessage("数字を入力してください");
      } else if (id === "price_to") {
        params.delete("price_to");
        setMaxErrorMessage("数字を入力してください");
      }
      console.error("Invalid input. Please enter a valid number.");

      return;
    }

    // price_from
    if (id == "price_from") {
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

    // price_to
    if (id === "price_to") {
      const price_from = parseInt(params.get("price_from") || "0", 10);

      if (price === "") {
        // 空欄の時
        params.delete("price_to");
        setMaxErrorMessage("");
      } else if (!isNaN(priceNum) && priceNum >= price_from) {
        // 正常な値の場合（数字が入力され、かつmaxPriceがprice_fromより大きい時）
        params.set("price_to", price);
        setMaxErrorMessage("");
      } else if (priceNum < price_from) {
        // エラー処理: maxPriceがprice_fromより小さい場合
        console.error("This field must be greater than or equal to price_from");
        setMaxErrorMessage("下限金額より大きい数字を入れてください");
      }
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 450);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          id="price_from"
          label="下限"
          defaultValue={price_from}
          onChange={handlePrice}
          formatPrice
          errorMessage={minErrorMessage ? minErrorMessage : ""}
        />
        <Input
          id="price_to"
          label="上限"
          defaultValue={price_to}
          onChange={handlePrice}
          formatPrice
          errorMessage={maxErrorMessage ? maxErrorMessage : ""}
        />
      </div>
    </div>
  );
};

export default PriceBody;
