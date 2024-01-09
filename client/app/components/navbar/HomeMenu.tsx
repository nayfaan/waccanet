import Link from 'next/link';
import { FaHome } from "react-icons/fa";

const HomeMenu = () => {
    return (
        <Link href="/" >
            <div className="py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                <FaHome size={25} />
            </div>
        </Link>
    );
};

export default HomeMenu;