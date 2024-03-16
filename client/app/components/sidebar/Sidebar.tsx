"use client";

import { useContext, useEffect, useRef, useState } from "react";

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
import { FaCircle } from "react-icons/fa";
import { PiHouseLine } from "react-icons/pi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsPersonVideo } from "react-icons/bs";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";
import { RiBankCardLine } from "react-icons/ri";

import Search from "../Search";
import FilterElement from "./FilterElement";
import PriceBody from "./filter_body/PriceBody";
import SelectBody from "./filter_body/SelectBody";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import DevelopingBody from "./filter_body/DevelopingBody";
import { SidebarContext } from "./SidebarProvider";
import {
  areas,
  gender,
  minimumStay,
  onlineViewing,
  paymentMethod,
  references,
  roomTypes,
  roommates,
  stations,
  takeover,
} from "@/app/selectLists";
import Toggle from "../inputs/Toggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFormattedDate } from "@/app/format/formattedData";

interface SidebarProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [openElements, setOpenElements] = useState<string[]>([]);
  const paramsData = useContext(SidebarContext);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleParamChange = (
    id: string,
    value: string | string[] | boolean | Date
  ) => {
    // Booleanの時、Toggle.tsx
    if (typeof value === "boolean") {
      if (!value) {
        params.delete(id);
      } else {
        params.set(id, "1");
      }
    }

    // 文字列の配列 SelectButton.tsx
    if (Array.isArray(value)) {
      console.log(id, value);
      const sanitizedValue = value.map((item) => item.replaceAll(/ /g, "%20"));

      if (value.length === 0) {
        params.delete(id);
      } else {
        const joinedFilterElements = sanitizedValue.join("_");
        params.set(id, joinedFilterElements);
      }
    }

    // 日付が入る時、Calender.tsx
    if (id === "moveInDate") {
      if (value === "") {
        params.delete(id);
      } else if (value instanceof Date) {
        const formattedDate = getFormattedDate(value);
        params.set(id, formattedDate);
      }
    }

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const filterElements = [
    {
      id: "price",
      label: "家賃",
      icon: RiMoneyDollarCircleLine,
      body: (
        <PriceBody
          price_from={paramsData.price_from}
          price_to={paramsData.price_to}
        />
      ),
    },
    {
      id: "roomTypes",
      label: "部屋タイプ",
      icon: PiHouseLine,
      body: (
        <SelectBody
          id="roomTypes"
          labels={roomTypes.japanese}
          multipleChoice
          paramsArr={paramsData.roomTypes}
          paramsLabels={roomTypes.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "roommates",
      label: "ルームメイト",
      icon: LiaUserFriendsSolid,
      body: (
        <SelectBody
          id="roommates"
          labels={roommates.japanese}
          multipleChoice
          paramsArr={paramsData.roommates}
          paramsLabels={roommates.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "gender",
      label: "性別",
      icon: BiMaleFemale,
      body: (
        <SelectBody
          id="gender"
          labels={gender.japanese}
          multipleChoice
          paramsArr={paramsData.gender}
          paramsLabels={gender.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "areas",
      label: "エリア",
      icon: CiMap,
      body: (
        <SelectBody
          id="areas"
          labels={areas.japanse}
          multipleChoice
          paramsArr={paramsData.areas}
          paramsLabels={areas.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "stations",
      label: "最寄駅",
      icon: PiTrainSimple,
      body: [
        <FilterElement
          key="expo_line"
          id="expo_line"
          label="Expo Line"
          icon={FaCircle}
          openElements={openElements}
          color="#185B9F"
          body={
            <SelectBody
              id="stations"
              labels={stations.expo_line}
              multipleChoice
              paramsArr={paramsData.stations}
              paramsLabels={stations.expo_line}
              onChange={handleParamChange}
            />
          }
        />,
        <FilterElement
          key="canada_line"
          id="canada_line"
          label="Canada Line"
          icon={FaCircle}
          openElements={openElements}
          color="#1694BF"
          body={
            <SelectBody
              id="stations"
              labels={stations.canada_line}
              multipleChoice
              paramsArr={paramsData.stations}
              paramsLabels={stations.canada_line}
              onChange={handleParamChange}
            />
          }
        />,
        <FilterElement
          key="millennium_line"
          id="millennium_line"
          label="Millennium Line"
          icon={FaCircle}
          openElements={openElements}
          color="#FED007"
          body={
            <SelectBody
              id="stations"
              labels={stations.millennium_line}
              multipleChoice
              paramsArr={paramsData.stations}
              paramsLabels={stations.millennium_line}
              onChange={handleParamChange}
            />
          }
        />,
      ],
    },
    {
      id: "utilities",
      label: "光熱費",
      icon: PiPlugCharging,
      body: (
        <Toggle
          id="utilities"
          messageTrue="光熱費無料"
          messageFalse="全て表示"
          value={paramsData.utilities === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: FaWifi,
      body: (
        <Toggle
          id="wifi"
          messageTrue="Wifi無料"
          messageFalse="全て表示"
          value={paramsData.wifi === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "furnished",
      label: "家具",
      icon: IoBedOutline,
      body: (
        <Toggle
          id="furnished"
          messageTrue="家具付き"
          messageFalse="全て表示"
          value={paramsData.furnished === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "laundry",
      label: "洗濯機",
      icon: MdOutlineLocalLaundryService,
      body: (
        <Toggle
          id="laundry"
          messageTrue="洗濯無料"
          messageFalse="全て表示"
          value={paramsData.laundry === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "takeover",
      label: "テイクオーバー",
      icon: LiaMoneyCheckAltSolid,
      body: (
        <Toggle
          id="takeover"
          messageTrue="支払い不要"
          messageFalse="全て表示"
          value={paramsData.takeover === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "moveInDate",
      label: "入居可能日",
      icon: SlCalender,
      body: (
        <Calendar
          id="moveInDate"
          value={
            paramsData.moveInDate ? new Date(paramsData.moveInDate) : new Date()
          }
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "paymentMethod",
      label: "支払方法",
      icon: RiBankCardLine,
      body: (
        <SelectBody
          id="payment-method"
          labels={paymentMethod.japanese}
          multipleChoice
          paramsArr={paramsData.paymentMethod}
          paramsLabels={paymentMethod.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "onlineViewing",
      label: "オンライン内見",
      icon: BsPersonVideo,
      body: (
        <Toggle
          id="onlineViewing"
          messageTrue="対応"
          messageFalse="全て表示"
          value={paramsData.onlineViewing === "1" ? true : false}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "minimumStay",
      label: "ミニマムステイ",
      icon: CgSandClock,
      body: (
        <SelectBody
          id="minimumStay"
          labels={minimumStay.japanese}
          multipleChoice
          paramsArr={paramsData.minimumStay}
          paramsLabels={minimumStay.english}
          onChange={handleParamChange}
        />
      ),
    },
    {
      id: "references",
      label: "物件情報参照元",
      icon: TfiAgenda,
      body: (
        <SelectBody
          id="references"
          labels={references.japanese}
          multipleChoice
          paramsArr={paramsData.references}
          paramsLabels={references.english}
          onChange={handleParamChange}
        />
      ),
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

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSidebarOpen && //サイドバーが開いている場合かつ
        sidebarRef.current && //サイドバーが存在している場合かつ
        event.target instanceof Node && // クリックされたエレメントが Node (DOM element)の場合かつ
        !sidebarRef.current.contains(event.target) && // クリックされた要素がサイドバーではない場合かつ
        !(event.target as Element).closest("nav") // クリックされた要素がナブバーではない場合
      ) {
        setIsSidebarOpen?.(false); //サイドバーを閉じる
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // イベントリスナーを追加

    return () => {
      // コンポーネントがアンマウントされたときにイベントリスナーを削除
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen, sidebarRef, setIsSidebarOpen]);

  return (
    <div
      className={`fixed top-0 left-0 z-30 w-64 md:w-72 h-screen pt-14 transition-transform transform -translate-x-full bg-white border-r border-gray-200 ${
        isSidebarOpen ? "translate-x-0" : "md:translate-x-0"
      }`}
      ref={sidebarRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <Search
          placeholder="キーワード検索"
          search_query={paramsData.search_query}
        />
        <div className="p-2">フィルター</div>
        <div className="font-medium">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
