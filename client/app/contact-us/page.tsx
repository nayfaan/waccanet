"use client";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/footer/Footer";
import { createContact } from "../lib/action";
import Input from "../components/inputs/Input";
import Dropdown from "../components/inputs/Dropdown";
import { useState } from "react";
import { ContactData } from "../types/types";
import validator from "validator";

export default function ContactUs() {
  const [contactData, setContactData] = useState<ContactData>({
    pub_date: new Date(),
    first_name: "",
    last_name: "",
    email_address: "",
    contact_type: "",
    detail: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: string, value: string) => {
    setContactData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = () => {
    if (validateInput()) {
      return;
    }
    setErrors({});

    createContact(contactData);
    //api
  };

  const validateInput = () => {
    let hasError = false;
    if (validator.isEmpty(contactData.last_name)) {
      setErrors((prevError) => ({
        ...prevError,
        last_name: "名字を入力してください",
      }));
      hasError = true;
    } else if (validator.isEmpty(contactData.first_name)) {
      setErrors((prevError) => ({
        ...prevError,
        first_name: "名前を入力してください",
      }));
      hasError = true;
    } else if (validator.isEmpty(contactData.email_address)) {
      setErrors((prevError) => ({
        ...prevError,
        email_address: "メールアドレスを入力してください",
      }));
      hasError = true;
    } else if (!validator.isEmail(contactData.email_address)) {
      setErrors((prevError) => ({
        ...prevError,
        email_address: "正しい形式のメールアドレスではありません。",
      }));
      hasError = true;
    } else if (validator.isEmpty(contactData.detail)) {
      setErrors((prevError) => ({
        ...prevError,
        detail: "お問い合わせ内容を入力してください。",
      }));
      hasError = true;
    }
    return hasError;
  };

  let bodyContent = (
    <form>
      <div className="grid gap-4 lg:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <Input
            id="last_name"
            label="姓"
            onChange={handleInputChange}
            errorMessage={errors.last_name}
            required
          />
          <Input
            id="first_name"
            label="名"
            onChange={handleInputChange}
            errorMessage={errors.first_name}
            required
          />
        </div>
        <Input
          id="email_address"
          label="メールアドレス"
          onChange={handleInputChange}
          errorMessage={errors.email_address}
          required
        />
        <Dropdown
          id="contact_type"
          label="カテゴリ"
          value={contactData.contact_type}
          onChange={handleInputChange}
          items={[
            "",
            "質問",
            "バグ報告",
            "案件依頼",
            "物件の追加・削除",
            "追加機能の提案",
            "その他",
          ]}
        />
        <Input
          id="detail"
          label="お問い合わせ内容"
          value={contactData.detail}
          onChange={handleInputChange}
          errorMessage={errors.detail}
          textarea
          required
        />
      </div>
    </form>
  );
  return (
    <div className="p-2 pt-14 min-h-screen flex flex-col justify-between">
      <RegisterForm
        onSubmit={onSubmit}
        actionLabel="送信"
        body={bodyContent}
        title="お問い合わせ"
      />
      <Footer />
    </div>
  );
}
