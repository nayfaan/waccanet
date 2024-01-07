import Link from 'next/link';

const ContactMenu = () => {
    return (
        <Link href="/contact-us" >
            <div className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                お問い合わせ
            </div>
        </Link>
    );
};

export default ContactMenu;