import Link from 'next/link';

const ContactMenu = () => {
    return (
        <Link href="/about-our-site" >
            <div className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                サイト概要
            </div>
        </Link>
    );
};

export default ContactMenu;