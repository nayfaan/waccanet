import Link from 'next/link';

const PostMenu = () => {
    return (
        <Link href="/developing" >
            <div className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                物件新規登録
            </div>
        </Link>
    );
};

export default PostMenu;