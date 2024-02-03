"use client";

import { useState } from "react";

import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { PiTrainSimple } from "react-icons/pi";
import { TfiAgenda } from "react-icons/tfi";
import { IoBedOutline } from "react-icons/io5";
import { PiPlugCharging } from "react-icons/pi";
import { FaWifi } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Search from "../Search";
import FilterElement from "./FilterElement";
import PriceBody from "./filter_body/PriceBody";
import SelectBody from "./filter_body/SelectBody";
import Button from "../Button";

const Sidebar = () => {
  const [openElements, setOpenElements] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  // const [isElementOpen, setIsElementOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [areas, setAreas] = useState([]);
  const [stations, setStations] = useState([]);
  const [isUtilityIncluded, setIsUtilityIncluded] = useState(null);
  const [isWifiIncluded, setIsWifiIncluded] = useState(null);
  const [isFurnished, setIsFurnished] = useState(null);
  const [isTakeoverNeeded, setIsTakeoverNeeded] = useState(null);
  const [moveInDate, setMoveInDate] = useState(null);
  const [nimimumStay, setMinimumStay] = useState(1);

  const example = <div>coming soon...</div>;

  const filterElements = [
    {
      id: "price",
      label: "家賃",
      icon: RiMoneyDollarCircleLine,
      body: <PriceBody />,
    },
    {
      id: "area",
      label: "エリア",
      icon: CiMap,
      body: (
        <SelectBody
          labels={[
            "ダウンタウン",
            "バーナビー",
            "リッチモンド",
            "ノースバンクーバー",
            "サレー",
            "ランガラ",
            "UBC",
          ]}
          small
        />
      ),
    },
    {
      id: "stations",
      label: "最寄駅",
      icon: PiTrainSimple,
      body: (
        <SelectBody
          labels={[
            "Waterfront",
            "Burrard",
            "Cranville",
            "Studium-Chinatown",
            "Science World",
            "Joice",
            "Metrotown",
          ]}
          small
        />
      ),
    },
    {
      id: "utilities",
      label: "光熱費",
      icon: PiPlugCharging,
      body: <SelectBody labels={["含む", "含まない", "N/A"]} />,
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: FaWifi,
      body: <SelectBody labels={["含む", "含まない", "N/A"]} />,
    },
    {
      id: "furnished",
      label: "家具",
      icon: IoBedOutline,
      body: <SelectBody labels={["あり", "なし", "N/A"]} />,
    },
    {
      id: "takeover",
      label: "テイクオーバー",
      icon: LiaMoneyCheckAltSolid,
      body: <SelectBody labels={["必要", "不要", "N/A"]} />,
    },
    {
      id: "moveInDate",
      label: "入居可能日",
      icon: SlCalender,
      body: example,
    },
    {
      id: "minimumStay",
      label: "ミニマムステイ",
      icon: CgSandClock,
      body: example,
    },
    {
      id: "reference",
      label: "物件情報参照元",
      icon: TfiAgenda,
      body: example,
    },
  ];

  const handleElementToggle = (elementId: string) => {
    setOpenElements((prevOpenElements) => {
      if (prevOpenElements.includes(elementId)) {
        // 既に開いている場合は閉じる
        return prevOpenElements.filter((id) => id !== elementId);
      } else {
        // 閉じている場合は開く
        return [...prevOpenElements, elementId];
      }
    });
  };

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <Search placeholder="キーワード検索" />
        <div className="p-2">フィルター</div>
        <ul className="font-medium">
          {filterElements.map((element) => (
            <div
              key={element.id}
              onClick={() => handleElementToggle(element.id)}
            >
              <FilterElement
                id={element.id}
                label={element.label}
                icon={element.icon}
                openElements={openElements}
                body={element.body}
              />
            </div>
          ))}
        </ul>
        <Button label="絞り込み" onClick={() => {}} />
      </div>
    </aside>
  );
};

export default Sidebar;
