import Button from "@/app/components/Button";

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
          <Button label="物件一覧へ" actionType="link" href="/" />
        </div>
      </div>
    </main>
  );
}
