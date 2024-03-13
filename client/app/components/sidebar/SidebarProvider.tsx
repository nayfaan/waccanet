"use client";
import { createContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSearchParams } from "next/navigation";
import { SearchParams } from "@/app/types/types";

export const defaultSearchParams: SearchParams = {
  price_from: "",
  price_to: "",
  roomTypes: [],
  roommates: [],
  gender: [],
  areas: [],
  stations: [],
  utilities: "0",
  wifi: "0",
  furnished: "0",
  takeover: "0",
  moveInDate: "",
  paymentMethod: [],
  onlineViewing: "0",
  minimumStay: [],
  references: [],
  search_query: [],
  page: "",
};

export const SidebarContext = createContext<SearchParams>(defaultSearchParams);

interface SidebarProviderProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [params, setParams] = useState<SearchParams>(defaultSearchParams);
  const searchParams = useSearchParams();
  const strSearchParams = searchParams.toString();

  useEffect(() => {
    if (!strSearchParams) {
      // pathが "/"のとき
      setParams(defaultSearchParams);
    } else {
      const paramsObject: SearchParams = { ...defaultSearchParams };
      strSearchParams.split("&").forEach((param) => {
        let [key, value] = param.split("=");
        if (key === "search-query") {
          // "search-query"を"search_query" に変更
          key = "search_query";
        }
        if (paramsObject.hasOwnProperty(key)) {
          // paramsObjectにキーが存在する場合
          if (Array.isArray(paramsObject[key])) {
            // 配列の場合
            if (value.includes("_")) {
              paramsObject[key] = value.split("_").map(decodeURIComponent);
            } else if (value.includes("+")) {
              paramsObject[key] = value.split("+").map(decodeURIComponent);
            } else {
              // 空白の値
              paramsObject[key] = value
                .split("%E3%80%80")
                .map(decodeURIComponent);
            }
          } else {
            // 配列でない場合
            paramsObject[key] = decodeURIComponent(value);
          }
        } else {
          // paramsObjectにキーが存在しない場合
          if (Array.isArray(defaultSearchParams[key])) {
            // デフォルトが配列の場合
            paramsObject[key] = value.split("_").map(decodeURIComponent);
          } else {
            // デフォルトが配列でない場合
            paramsObject[key] = decodeURIComponent(value);
          }
        }
      });
      setParams(paramsObject);
    }
  }, [strSearchParams]);

  return (
    <SidebarContext.Provider value={params}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
