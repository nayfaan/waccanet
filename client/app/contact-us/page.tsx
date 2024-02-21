import Footer from "../components/footer/Footer";
import Form from "./ContactForm";

export default function ContactUs() {
  return (
    <main className="pt-14 h-screen w-full flex flex-col justify-between bg-white">
      <div className="max-w-xl mx-auto h-full flex flex-col justify-center items-center">
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
