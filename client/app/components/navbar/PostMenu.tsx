import Link from 'next/link';

const PostMenu = () => {
    return (
        <div className="flex flex-row items-center gap-3">
            <Link href="/developing" >
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    物件新規登録
                </div>
            </Link>
        </div>
    );
};

export default PostMenu;