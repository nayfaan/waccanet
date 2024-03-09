'use server';

import {
    PropertyRegisterDataPrevious,
} from "../types/types";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createContact(formData: FormData) {
    const options = {
        month: "2-digit" as const,
        day: "2-digit" as const,
        year: "numeric" as const,
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: true,
        timeZone: "America/Vancouver",
    };
    var today = new Date();

    const vancouverDate = new Intl.DateTimeFormat("en-US", options).format(
        today
    );

    const dateParts = vancouverDate.split(/[.,/ :]+/);

    const month = dateParts[0].padStart(2, "0");
    const day = dateParts[1].padStart(2, "0");
    let hour = parseInt(dateParts[3]);
    hour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    const minute = dateParts[4].padStart(2, "0");
    const formattedDate = `${dateParts[2]}-${month}-${day}`;

    const rawFormData = {
        pub_date: formattedDate,
        first_name: formData.get('first-name'),
        last_name: formData.get('last-name'),
        email_address: formData.get('email'),
        contact_type: formData.get('type'),
        detail: formData.get('about'),

    };

    const api_server_link = process.env.api_server_link
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const X_Api_Key = process.env.X_Api_Key;
    if (X_Api_Key) {
        headers['X-Api-Key'] = X_Api_Key;
    } else {
        console.error('X_Api_Key is missing or undefined.'); // X_Api_Keyが存在しない場合のエラー処理
        throw new Error('X_Api_Key is missing or undefined.');
    }
    const apt_query = `${api_server_link}/contactus/create-inquiry/`
    try {
        const res = await fetch(apt_query, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(rawFormData),
        });
        if (!res.ok) {
            // エラー処理
            console.error('Request failed with status:', res.status);
            throw new Error('Request failed with status:');
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to post contact data.');
    }
    revalidatePath('/contact-us');
    redirect('/contact-us/confirmation/');
}

export async function registerePropertyData(PropertyDataPrevious: PropertyRegisterDataPrevious) {
    
    const PropertyData = {
        pub_date: PropertyDataPrevious.pub_date,
        name: PropertyDataPrevious.title,
        price: PropertyDataPrevious.rent,
        description: PropertyDataPrevious.description,
        reference: PropertyDataPrevious.reference,
        email: PropertyDataPrevious.ownerEmail,
    };

    console.log("lib from api PropertyData");
    console.log(PropertyData);

    const api_server_link = process.env.api_server_link
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const X_Api_Key = process.env.X_Api_Key;
    if (X_Api_Key) {
        headers['X-Api-Key'] = X_Api_Key;
    } else {
        throw new Error('X_Api_Key is missing or undefined.');
    }


    const apt_query = `${api_server_link}/property/apis/property_add/`

    try {
        const res = await fetch(apt_query, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(PropertyData),
        });
    
        if (!res.ok) {
            // エラー処理
            const errorText = await res.text(); // APIからのエラーメッセージを取得
            // 例外を投げるか、適切なエラー処理を実行
            throw new Error(errorText);
        }
    
        // 成功した場合の処理
        const data = await res.json();
        console.log(data);
        return data
    } catch (error) {
        throw error;
    }
  
}

export async function deletePropertyData(propertyData: string,propertyPassword: string) {

    const passwordData = {
        password:propertyPassword
    }

    // console.log("lib from api passwordData");
    // console.log(propertyData);
    // console.log(passwordData);

    const api_server_link = process.env.api_server_link
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const X_Api_Key = process.env.X_Api_Key;
    if (X_Api_Key) {
        headers['X-Api-Key'] = X_Api_Key;
    } else {
        // console.error('X_Api_Key is missing or undefined.'); // X_Api_Keyが存在しない場合のエラー処理
        throw new Error('X_Api_Key is missing or undefined.');
    }

    const apt_query = `${api_server_link}/property/apis/${propertyData}/property_delete/`

    try {
        const res = await fetch(apt_query, {
            method: 'POST',
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
        return data

    } catch (error) {
        throw error;
    }
  
}