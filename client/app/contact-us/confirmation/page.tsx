import Link from "next/link";

export default function Confirmation() {
  return (
    <main className="h-full w-full p-6 place-items-center bg-white  flex items-center justify-center  ">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          送信完了
        </h1>
        <p className="mt-6 text-medium leading-7 text-gray-600">
          内容を確認次第メールにて返信いたしますので、2,3日お待ちください。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            物件一覧へ
          </Link>
        </div>
      </div>
    </main>
  );
}
