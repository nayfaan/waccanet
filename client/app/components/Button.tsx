"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  back?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, back }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (back) {
      router.back();
    } else if (onClick) {
      console.log("button clicked");
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {label}
    </button>
  );
};

export default Button;
