import Image from "next/image";
import Waccanet from "../../public/images/waccanet-wt.png";
import { TbBackslash } from "react-icons/tb";
import { TbSlash } from "react-icons/tb";
import InfoContainer from "./InfoContainer";
import { FaCheck } from "react-icons/fa6";

const AboutOurSite = () => {
  return (
    <>
      <main className="w-full text-white">
        <div className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=3018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-500 bg-blend-multiply py-28">
          <div className="h-full p-2 md:p-7 flex flex-col items-center justify-center">
            <div className="flex gap-3">
              <TbBackslash />
              <h3 className="text-sm md:text-base">
                シェアハウスや求人の情報多数
              </h3>
              <TbSlash />
            </div>
            <h1 className="tracking-wider md:text-lg lg:text-2xl">
              カナダに住む日本人のための情報サイト
            </h1>

            <Image src={Waccanet} alt="Waccanet Logo" width={500} />
            <div className="flex flex-col items-center px-1 sm:px-3">
              <p className="mt-7 text-sm md:text-base">
                日本を意味する
                <span className="font-bold text-base md:text-xl">「和」</span>
                とカナダの頭文字
                <span className="font-bold text-base md:text-xl">「カ」</span>
                が合わさり、
                <span className="font-bold text-base md:text-xl">
                  「輪っか」
                </span>
                になるという意味が込められています。
              </p>
              <p className="text-sm md:text-base">
                カナダに住む日本人にとって情報の
                <span className="font-bold text-base md:text-xl">「輪」</span>
                が広がるネットワークとなることを願っています。
              </p>
            </div>
          </div>
        </div>

        <div className="py-7 sm:py-16 px-3 flex flex-col items-center md:flex-row md:items-start justify-around bg-white">
          <div className="flex items-end justify-center gap-2 pb-5 sm:py-7 sm:flex-col sm:items-start">
            <h3 className="text-gray-500 text-4xl md:text-7xl font-bold tracking-wider">
              Our
            </h3>
            <h3 className="text-gray-700 text-4xl md:text-6xl font-bold tracking-wider">
              Service
            </h3>
          </div>

          <div className="sm:grid sm:grid-cols-2">
            <InfoContainer
              id="house"
              title="シェアハウスを探す"
              body="バンクーバーの様々なエリアを網羅しています。条件を指定して検索することで希望の家を見つけよう！"
              color="#3F74FD"
              path="/"
            />
            <InfoContainer
              id="work"
              title="仕事を探す"
              body="Coming Soon..."
              color="#DB0038"
              path="/developing"
            />
            <InfoContainer
              id="buy-sell"
              title="売る買う"
              body="Coming Soon..."
              color="#33A852"
              path="/developing"
            />
            <InfoContainer
              id="other"
              title="その他機能も随時搭載予定"
              body="みなさまからの「こんな情報欲しい！」等のコメントお待ちしています。"
              color="#F7C200"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-around md:flex-row md:items-start py-7 md:py-16">
          <h3 className="text-gray-700 text-4xl lg:text-6xl font-bold tracking-wider px-7 pb-5 sm:py-7">
            Information
          </h3>

          <div className="px-1 sm:px-3">
            <div>
              <h6 className="text-gray-900 text-base sm:text-lg font-semibold flex items-center gap-2">
                <FaCheck />
                このサイトについて
              </h6>
              <p className="text-sm sm:text-base text-gray-600">
                このサイトは有志のプログラマーたちによって開発が進められています。
                <br />
                まだ途中段階であり、ユーザーのフィードバックを元に開発を進行しています。
                <br />
                皆様のコメントなどをお待ちしております。
                <br />
                少しでもお役に立てることを心より願っております。
              </p>
            </div>
            <div>
              <h6 className="text-gray-900 text-base sm:text-lg font-semibold pt-5 flex items-center gap-2">
                <FaCheck />
                サーバーについて
              </h6>
              <p className="text-sm sm:text-base text-gray-600">
                現在、無料のクラウドサービスを使用しておりページの読み込み、処理等に時間がかかる場合がございます。
                <br />
                あらかじめご了承ください。
              </p>
            </div>
          </div>
        </div>

        {/* <h2 className="block gap-2 text-xl sm:text-2xl font-semibold text-gray-800 ">
            お知らせ
          </h2>

          <div className="max-w-sm mx-auto">
            <p className="mt-2 text-sm text-gray-600 ">
              このサイトは有志のプログラマーたちによって開発が進められています。
              <br></br>
              まだ途中段階であり、ユーザーのフィードバックを元に開発を進行しています。
              <br></br>皆様のコメントなどをお待ちしております。
              <br></br>少しでもお役に立てることを心より願っております。
            </p>
          </div> */}

        {/* <div className="mt-8 sm:mt-10 divide-y divide-gray-200 ">
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
          </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button label="物件一覧へ" actionType="link" href="/" />
        </div> */}
      </main>
    </>
  );
};

export default AboutOurSite;
