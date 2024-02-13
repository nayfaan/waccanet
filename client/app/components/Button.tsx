"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface ButtonProps {
  label: string;
  actionType?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  actionType,
  href,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (actionType === "back") {
      router.back();
    } else if (actionType === "link" && href) {
      router.push(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {label}
    </button>
  );
};

export default Button;
