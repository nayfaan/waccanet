import Link from "next/link";

export default function AboutOurSite() {
  return (
    <>
      <main className="h-screen w-full p-6  place-items-center bg-white  flex items-center justify-center  ">
        <div className="text-center">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm pointer-events-auto ">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-xl sm:text-2xl font-semibold text-gray-800 ">
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              物件一覧へ
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
