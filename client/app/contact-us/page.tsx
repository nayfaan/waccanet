import Footer from "../components/footer/Footer";
import Form from "./ContactForm";

export default function ContactUs() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-between bg-white">
      <div className="mt-14 mx-2 sm:mx-10 py-3 h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            お問い合わせ
          </h1>
        </div>
        <Form />
      </div>
      <Footer />
    </main>
  );
}
