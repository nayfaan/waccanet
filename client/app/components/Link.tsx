import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => {
  return (
    <Link
      href={href}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {label}
    </Link>
  );
};

export default LinkButton;
