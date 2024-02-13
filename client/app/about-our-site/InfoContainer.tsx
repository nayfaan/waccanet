"use client";
import { FaHouseChimney } from "react-icons/fa6";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { useState } from "react";

interface InfoContainerProps {
  id: string;
  title: string;
  body: string;
  color: string;
  path?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  id,
  title,
  body,
  color,
  path,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  let Icon = FaHouseChimney;
  if (id === "work") Icon = FaPersonChalkboard;
  if (id === "buy-sell") Icon = MdSell;
  if (id === "other") Icon = LuHeartHandshake;

  const style = {
    borderColor: color,
    backgroundColor: isHovered ? color : "white",
  };

  return (
    <div className="relative group">
      <a
        className="lg:w-80 lg:h-80 w-64 h-64 p-10 max-w-sm bg-white border-2 rounded-full shadow flex flex-col justify-center items-center gap-2 cursor-pointer transition-all duration-300"
        href={path}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <Icon
            size={30}
            color={color}
            className={`transition-all duration-300 ${
              isHovered ? "opacity-0" : ""
            }`}
          />
          <h5
            className={`mb-1 text-sm lg:text-lg font-semibold tracking-tight text-gray-900 transition-all duration-300 ${
              isHovered ? "opacity-0" : ""
            }`}
          >
            {title}
          </h5>

          {/* lg以上の時はhidden */}
          <p className="mb-1 text-sm text-gray-500 lg:hidden">{body}</p>
        </div>
      </a>

      {/* hover時に表示するbody */}
      <div
        className={`absolute hidden lg:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        } `}
      >
        <p className="mb-1 text-sm text-white">{body}</p>
      </div>
    </div>
  );
};

export default InfoContainer;
