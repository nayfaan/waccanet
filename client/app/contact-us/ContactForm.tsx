// "use client";

// import Button from "@/app/components/Button";
// import Input from "../components/inputs/Input";
// import { createContact } from "../lib/action";
// import Dropdown from "../components/inputs/Dropdown";
// import { useState } from "react";
// import { ContactData } from "../types/types";

// const ContactForm = () => {
//   const [contactData, setContactData] = useState<ContactData>({
//     pub_date: new Date(),
//     first_name: "",
//     last_name: "",
//     email_address: "",
//     contact_type: "",
//     detail: "",
//   });

//   const handleInputChange = () => {};

//   return (
//     <div className="w-full md:w-1/2 xl:w-1/3 flex flex-col mt-5 border rounded-xl p-4 sm:p-6 lg:p-8">
//       <form action={createContact}>
//         <div className="grid gap-4 lg:gap-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
//             <Input id="last-name" label="名字" required />
//             <Input id="first-name" label="名前" required />
//           </div>
//           <Input id="email" label="メールアドレス" required />
//           <Dropdown
//             id="type"
//             label="カテゴリ"
//             value={contactData.contact_type}
//             onChange={() => {}}
//             items={[
//               "質問",
//               "バグ報告",
//               "案件依頼",
//               "物件の追加・削除",
//               "追加機能の提案",
//             ]}
//           />
//           <Input id="content" label="お問い合わせ内容" textarea required />
//         </div>
//         <div className="mt-6 flex flex-col justify-center gap-1">
//           <button
//             type="submit"
//             className="rounded-md bg-blue-500 hover:bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
//           >
//             送信
//           </button>
//           <Button label="戻る" small actionType="back" color="gray" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
