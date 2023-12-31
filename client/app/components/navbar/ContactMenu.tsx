import Link from 'next/link';

const ContactMenu = () => {
    return (
        <div className="flex flex-row items-center gap-3">
            <Link href="/contact-us" >
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    お問い合わせ
                </div>
            </Link>
        </div>
    );
};

export default ContactMenu;