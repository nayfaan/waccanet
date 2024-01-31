"use client";

import Button from "@/app/components/Button";
import { createContact } from "../lib/action";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const router = useRouter();
  return (
    <div className="mt-5 max-w-lg mx-auto">
      {/* <!-- Card --> */}

      <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8">
        <form action={createContact}>
          <div className="grid gap-4 lg:gap-6">
            {/* <!-- Grid --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            {/* <!-- End Grid --> */}

            {/* <!-- Grid --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  カテゴリ
                </label>
                <select
                  id="type"
                  name="type"
                  autoComplete="type-name"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                  <option>質問</option>
                  <option>バグ報告</option>
                  <option>案件依頼</option>
                  <option>追加機能の提案</option>
                </select>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  内容
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={5}
                    className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    required
                  />
                </div>
              </div>
            </div>

            {/* <!-- End Grid --> */}
          </div>

          <div className="mt-6 flex items-stretch justify-end gap-x-6">
            <Button label="戻る" onClick={() => router.back()} />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              送信
            </button>
          </div>
          {/* <!-- End Grid --> */}
        </form>
      </div>
      {/* <!-- End Card --> */}
    </div>
  );
};

export default ContactForm;
