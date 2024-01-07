'use server';

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
    const headers = {
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