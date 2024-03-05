"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface ButtonProps {
  label: string;
  color?: string;
  small?: boolean;
  actionType?: string;
  href?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = "blue",
  small,
  actionType,
  href,
  disabled,
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
      className={`rounded-md bg-${color}-500 hover:bg-${color}-600 px-5 py-2 text-sm font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-500 ${
        small ? "" : "w-full"
      }
      ${
        disabled
          ? "bg-gray-200 cursor-default"
          : `bg-${color}-500 hover:bg-${color}-600`
      }
      `}
    >
      {label}
    </button>
  );
};

export default Button;
