import Button from "@/app/components/Button";
import Footer from "@/app/components/footer/Footer";

export default function Confirmation() {
  return (
    <main className="h-full w-full pt-20 place-items-center bg-white  flex flex-col items-center justify-between min-h-screen">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          送信完了
        </h1>
        <p className="mt-6 text-medium leading-7 text-gray-600">
          内容を確認次第メールにて返信いたしますので、2,3日お待ちください。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button label="物件一覧へ" small actionType="link" href="/" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
