"use client";

import React, { useState, useEffect } from "react";

const FirstTimeModalComponent = () => {
  const [isOpen, setIsOpen] = useState("");

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("visited_before");

    console.log(hasVisitedBefore);
    if (hasVisitedBefore != "true") {
      // 初回アクセスの場合
      setIsOpen("true");
      // localStorageに訪問済みの情報を保存
      localStorage.setItem("visited_before", "true");
    }
  }, []);

  const toggleModal = () => {
    setIsOpen("false");
  };

  return (
    <>
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm pointer-events-auto ">
          <div className="flex justify-between items-center py-3 px-4 border-b ">
            <h3 className="font-bold text-gray-800 ">Information</h3>
            <button
              onClick={toggleModal}
              type="button"
              className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              data-hs-overlay="#hs-bg-gray-on-hover-cards"
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h2 className="block text-xl sm:text-2xl font-semibold text-gray-800 ">
                お知らせ
              </h2>
              <div className="max-w-sm mx-auto">
                <p className="mt-2 text-sm text-gray-600 ">
                  このサイトは有志のプログラマーたちによって開発が進められています。まだ途中段階であり、ユーザーのフィードバックを元に開発を進行しています。皆様のコメントなどをお待ちしております。
                  <br></br>少しでもお役に立てることを心より願っております。
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 divide-y divide-gray-200 ">
              <div className="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                <svg
                  className="flex-shrink-0 mt-1 w-7 h-7 text-gray-600 "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>

                <div>
                  <h3 className="font-semibold text-gray-800 ">
                    サーバーについて
                  </h3>
                  <p className="text-sm text-gray-500">
                    現在、無料のクラウドサービスを使用しておりページの読み込み、処理等に時間がかかる場合がございます。
                    あらかじめご了承ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstTimeModalComponent;
