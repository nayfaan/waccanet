"use server";

import { ContactData, PropertyRegisterData } from "../types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFormattedDate } from "../format/formattedData";

export async function createContact(contactData: ContactData) {
  const formattedDate = getFormattedDate(contactData.pub_date);

  const rawFormData = {
    pub_date: formattedDate,
    first_name: contactData.first_name,
    last_name: contactData.last_name,
    email_address: contactData.email_address,
    contact_type: contactData.contact_type,
    detail: contactData.detail,
  };

  const api_server_link = process.env.api_server_link;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const X_Api_Key = process.env.X_Api_Key;
  if (X_Api_Key) {
    headers["X-Api-Key"] = X_Api_Key;
  } else {
    console.error("X_Api_Key is missing or undefined."); // X_Api_Keyが存在しない場合のエラー処理
    throw new Error("X_Api_Key is missing or undefined.");
  }

  const apt_query = `${api_server_link}/contactus/create-inquiry/`;
  try {
    const res = await fetch(apt_query, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(rawFormData),
    });
    if (!res.ok) {
      // エラー処理
      console.error("Request failed with status:", res.status);
      throw new Error("Request failed with status:");
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to post contact data.");
  }
  revalidatePath("/contact-us");
  redirect("/contact-us/confirmation/");
}

export async function registerPropertyData(PropertyData: FormData) {
  const api_server_link = process.env.api_server_link;
  const headers: Record<string, string> = {
    //  "Content-Type": "multipart/form-data"
  };
  const X_Api_Key = process.env.X_Api_Key;
  if (X_Api_Key) {
    headers["X-Api-Key"] = X_Api_Key;
  } else {
    throw new Error("X_Api_Key is missing or undefined.");
  }

  const apt_query = `${api_server_link}/property/apis/property_add/`;

  try {
    const res = await fetch(apt_query, {
      method: "POST",
      headers: headers,
      body: PropertyData,
    });

    if (!res.ok) {
      // エラー処理
      const errorText = await res.text(); // APIからのエラーメッセージを取得
      // 例外を投げるか、適切なエラー処理を実行
      throw new Error(errorText);
    }

    // 成功した場合の処理
    const data = await res.json();
    console.log("登録時のIDを取得");
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deletePropertyData(
  propertyData: string,
  propertyPassword: string
) {
  const passwordData = {
    password: propertyPassword,
  };

  // console.log("lib from api passwordData");
  // console.log(propertyData);
  // console.log(passwordData);

  const api_server_link = process.env.api_server_link;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const X_Api_Key = process.env.X_Api_Key;
  if (X_Api_Key) {
    headers["X-Api-Key"] = X_Api_Key;
  } else {
    // console.error('X_Api_Key is missing or undefined.'); // X_Api_Keyが存在しない場合のエラー処理
    throw new Error("X_Api_Key is missing or undefined.");
  }

  const apt_query = `${api_server_link}/property/apis/${propertyData}/property_delete/`;

  try {
    const res = await fetch(apt_query, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(passwordData),
    });

    if (!res.ok) {
      // エラー処理
      const errorText = await res.text(); // APIからのエラーメッセージを取得
      // 例外を投げるか、適切なエラー処理を実行
      throw new Error(errorText);
    }

    // 成功した場合の処理
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
