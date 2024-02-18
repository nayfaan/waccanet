"use client";

import { Suspense, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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

import Search from "../Search";
import FilterElement from "./FilterElement";
import PriceBody from "./filter_body/PriceBody";
import SelectBody from "./filter_body/SelectBody";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import DevelopingBody from "./filter_body/DevelopingBody";

const Sidebar = () => {
  const [openElements, setOpenElements] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // minPrice: null,
      // maxPrice: null,
      roomTypes: [],
      roommates: [],
      areas: [],
      stations: [],
      utilities: [],
      wifi: [],
      furnished: [],
      takeover: [],
      // moveInDate: null,
      minimumStay: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("onSubmit called", data);

    // call api
  };

  const filterElements = [
    {
      id: "price",
      label: "家賃",
      icon: RiMoneyDollarCircleLine,
      body: <PriceBody register={register} />,
    },
    {
      id: "roomTypes",
      label: "部屋タイプ",
      icon: PiHouseLine,
      body: (
        // (
        //   <SelectBody
        //     id="roomTypes"
        //     labels={[
        //       "プライベートルーム",
        //       "シェアルーム",
        //       "デン",
        //       "リビングルーム",
        //       "ソラリウム",
        //       "バスルーム付きの部屋",
        //       "完全プライベートスイート",
        //     ]}
        //     multipleChoice
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
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
        //   labels={["なし", "1〜3人", "3〜5人", "6人以上"]}
        //   multipleChoice
        //   getValues={getValues}
        //   setValue={setValue}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "areas",
      label: "エリア",
      icon: CiMap,
      body: (
        <SelectBody
          id="areas"
          labels={[
            "ダウンタウン",
            "バーナビー",
            "ノースバーナビー",
            "リッチモンド",
            "ノースバンクーバー",
            "サレー",
            "コキットラム",
            "ランガラ",
            "UBC",
          ]}
          multipleChoice
          getValues={getValues}
          setValue={setValue}
        />
      ),
    },
    {
      id: "stations",
      label: "最寄駅",
      icon: PiTrainSimple,
      body: (
        // [
        //   <FilterElement
        //     key="expo-line"
        //     id="expo-line"
        //     label="Expo Line"
        //     icon={FaCircle}
        //     openElements={openElements}
        //     color="#185B9F"
        //     body={
        //       <SelectBody
        //         id="stations"
        //         labels={[
        //           "Waterfront",
        //           "Burrard",
        //           "Granville",
        //           "Stadium-Chinatown",
        //           "Main Street-Science World",
        //           "Commercial-Broadway",
        //           "Nanaimo",
        //           "29th Avenue",
        //           "Joyce-Collingwood",
        //           "Patterson",
        //           "Metrotown",
        //           "Royal Oak",
        //           "Edmonds",
        //           "22nd Street",
        //           "New Westminster",
        //           "Columbia",
        //           "Scott Road",
        //           "Gateway",
        //           "Surrey Central",
        //           "King George",
        //           "Sapperton",
        //           "Braid",
        //           "Lougheed",
        //           "Production Way",
        //         ]}
        //         multipleChoice
        //         getValues={getValues}
        //         setValue={setValue}
        //       />
        //     }
        //   />,
        //   <FilterElement
        //     key="canada-line"
        //     id="canada-line"
        //     label="Canada Line"
        //     icon={FaCircle}
        //     openElements={openElements}
        //     color="#1694BF"
        //     body={
        //       <SelectBody
        //         id="stations"
        //         labels={[
        //           "Vancouver City Centre",
        //           "Yaletown-Roundhouse",
        //           "Olympic Village",
        //           "Broadway-City Hall",
        //           "King Edward",
        //           "Oakridge-41st Ave",
        //           "Langara-49th Ave",
        //           "Marine Drive",
        //           "Bridgeport",
        //           "Aberdeen",
        //           "Lansdowne",
        //           "Richmond-Brighouse",
        //           "Templeton",
        //           "Sea Island Centre",
        //           "YVR Airport",
        //         ]}
        //         multipleChoice
        //         getValues={getValues}
        //         setValue={setValue}
        //       />
        //     }
        //   />,
        //   <FilterElement
        //     key="millennium-line"
        //     id="millennium-line"
        //     label="Millennium Line"
        //     icon={FaCircle}
        //     openElements={openElements}
        //     color="#FED007"
        //     body={
        //       <SelectBody
        //         id="stations"
        //         labels={[
        //           "VCC-Clark",
        //           "Renfrew",
        //           "Rupert",
        //           "Gilmore",
        //           "Brentwood",
        //           "Holdom",
        //           "Metrotown",
        //           "Sperling-Burnaby Lake",
        //           "Lake City",
        //           "Production Way-University",
        //           "Lougheed Town Centre",
        //           "Burquitlam",
        //           "Moody Centre",
        //           "Inlet Centre",
        //           "Coquitlam Central",
        //           "Lincoln",
        //           "Lafarge Lake-Douglas",
        // ]

        // }
        //   multipleChoice
        //   getValues={getValues}
        //   setValue={setValue}
        // />
        //   }
        // />,
        <DevelopingBody />
      ),
    },
    {
      id: "utilities",
      label: "光熱費",
      icon: PiPlugCharging,
      body: (
        // (
        //   <SelectBody
        //     id="utilities"
        //     labels={["含む", "含まない"]}
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
        <DevelopingBody />
      ),
    },
    {
      id: "wifi",
      label: "Wi-Fi",
      icon: FaWifi,
      body: (
        // (
        //   <SelectBody
        //     id="wifi"
        //     labels={["含む"]}
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
        <DevelopingBody />
      ),
    },
    {
      id: "furnished",
      label: "家具",
      icon: IoBedOutline,
      body: (
        // (
        //   <SelectBody
        //     id="furnished"
        //     labels={["あり", "なし"]}
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
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
        //   labels={["無料"]}
        //   getValues={getValues}
        //   setValue={setValue}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "takeover",
      label: "テイクオーバー",
      icon: LiaMoneyCheckAltSolid,
      body: (
        // (
        //   <SelectBody
        //     id="takeover"
        //     labels={["不要"]}
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
        <DevelopingBody />
      ),
    },
    {
      id: "moveInDate",
      label: "入居可能日",
      icon: SlCalender,
      body: (
        //  <Calendar id="moveInDate" register={register} required />,
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
        //   labels={["対応"]}
        //   getValues={getValues}
        //   setValue={setValue}
        // />
        <DevelopingBody />
      ),
    },
    {
      id: "minimumStay",
      label: "ミニマムステイ",
      icon: CgSandClock,
      body: (
        // (
        //   <SelectBody
        //     id="minimumStay"
        //     labels={[
        //       "1ヶ月",
        //       "2〜3ヶ月",
        //       "4ヶ月〜半年未満",
        //       "半年〜1年未満",
        //       "1年以上",
        //     ]}
        //     multipleChoice
        //     getValues={getValues}
        //     setValue={setValue}
        //   />
        // ),
        <DevelopingBody />
      ),
    },
    {
      id: "reference",
      label: "物件情報参照元",
      icon: TfiAgenda,
      body: (
        <SelectBody
          id="reference"
          labels={["Waccanet", "JPCanada"]}
          multipleChoice
          getValues={getValues}
          setValue={setValue}
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

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-72 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <Suspense>
          <Search placeholder="キーワード検索" />
        </Suspense>
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
        <div className="p-2">
          <Button label="絞り込み" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
