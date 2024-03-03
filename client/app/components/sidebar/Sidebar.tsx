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
  furnished,
  gender,
  laundry,
  minimumStay,
  onlineViewing,
  paymentMethod,
  references,
  roomTypes,
  roommates,
  stations,
  takeover,
  utilities,
  wifi,
} from "@/app/selectLists";

interface SidebarProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [openElements, setOpenElements] = useState<string[]>([]);
  const params = useContext(SidebarContext);

  const filterElements = [
    {
      id: "price",
      label: "家賃",
      icon: RiMoneyDollarCircleLine,
      body: (
        <PriceBody price_from={params.price_from} price_to={params.price_to} />
      ),
    },
    {
      id: "roomTypes",
      label: "部屋タイプ",
      icon: PiHouseLine,
      body: (
        // <SelectBody
        //   id="roomTypes"
        //   labels={roomTypes}
        //   multipleChoice
        //   paramsArr={params.roomTypes}
        // />

        <DevelopingBody />
      ),
    },
    {
      id: "roommates",
      label: "ルームメイト",
      icon: LiaUserFriendsSolid,
      body: (
        // <SelectBody
        //   id="roommates"
        //   labels={roommates}
        //   multipleChoice
        //   paramsArr={params.roommates}
        // />
        <DevelopingBody />
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
          paramsArr={params.gender}
        />
        // <DevelopingBody />
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
          paramsArr={params.areas}
        />
      ),
    },
    {
      id: "stations",
      label: "最寄駅",
      icon: PiTrainSimple,
      body: (
        // [
        // <FilterElement
        //   key="expo_line"
        //   id="expo_line"
        //   label="Expo Line"
        //   icon={FaCircle}
        //   openElements={openElements}
        //   color="#185B9F"
        //   body={
        //     <SelectBody
        //       id="stations"
        //       labels={stations.expo_line}
        //       multipleChoice
        //       paramsArr={params.stations}
        //     />
        //   }
        // />,
        // <FilterElement
        //   key="canada_line"
        //   id="canada_line"
        //   label="Canada Line"
        //   icon={FaCircle}
        //   openElements={openElements}
        //   color="#1694BF"
        //   body={
        //     <SelectBody
        //       id="stations"
        //       labels={stations.canada_line}
        //       multipleChoice
        //       paramsArr={params.stations}
        //     />
        //   }
        // />,
        //   <FilterElement
        //     key="millennium_line"
        //     id="millennium_line"
        //     label="Millennium Line"
        //     icon={FaCircle}
        //     openElements={openElements}
        //     color="#FED007"
        //     body={
        //       <SelectBody
        //         id="stations"
        //         labels={stations.millennium_line}
        //         multipleChoice
        //         paramsArr={params.stations}
        //       />
        //     }
        //   />,
        // ],
        <DevelopingBody />
      ),
    },
    {
      id: "utilities",
      label: "光熱費",
      icon: PiPlugCharging,
      body: (
        // <SelectBody
        //   id="utilities"
        //   labels={utilities}
        //   paramsArr={params.utilities}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: FaWifi,
      body: (
        // <SelectBody id="wifi" labels={wifi} paramsArr={params.wifi} />
        <DevelopingBody />
      ),
    },
    {
      id: "furnished",
      label: "家具",
      icon: IoBedOutline,
      body: (
        // <SelectBody
        //   id="furnished"
        //   labels={furnished.japanese}
        //   paramsArr={params.furnished}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "laundry",
      label: "洗濯機",
      icon: MdOutlineLocalLaundryService,
      body: (
        // <SelectBody
        //   id="laundry"
        //   labels={laundry}
        //   paramsArr={params.laundry}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "takeover",
      label: "テイクオーバー",
      icon: LiaMoneyCheckAltSolid,
      body: (
        // <SelectBody
        //   id="takeover"
        //   labels={takeover}
        //   paramsArr={params.takeover}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "moveInDate",
      label: "入居可能日",
      icon: SlCalender,
      body: (
        // <Calendar id="moveInDate" required />,
        <DevelopingBody />
      ),
    },
    {
      id: "paymentMethod",
      label: "支払方法",
      icon: RiBankCardLine,
      body: (
        // <SelectBody
        //   id="payment-method"
        //   labels={paymentMethod}
        //   multipleChoice
        //   paramsArr={params.paymentMethod}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "onlineViewing",
      label: "オンライン内見",
      icon: BsPersonVideo,
      body: (
        // <SelectBody
        //   id="onlineViewing"
        //   labels={onlineViewing}
        //   paramsArr={params.onlineViewing}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "minimumStay",
      label: "ミニマムステイ",
      icon: CgSandClock,
      body: (
        // <SelectBody
        //   id="minimumStay"
        //   labels={minimumStay}
        //   multipleChoice
        //   paramsArr={params.minimumStay}
        // />
        <DevelopingBody />
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
          paramsArr={params.references}
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
          search_query={params.search_query}
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
