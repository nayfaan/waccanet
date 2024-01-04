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

    await fetch(`http://172.30.0.3:8000/contactus/create-inquiry/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });
    revalidatePath('/contact-us');
    redirect('/contact-us/confirmation/');

}