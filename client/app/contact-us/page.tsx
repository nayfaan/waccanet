import Form from "./ContactForm";

export default function ContactUs() {
  return (
    <main className="h-screen w-full px-10 py-6  place-items-center bg-white">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            お問い合わせ
          </h1>
        </div>
        <Form />
      </div>
    </main>
  );
}
