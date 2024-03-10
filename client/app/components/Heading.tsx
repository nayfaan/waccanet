import React from "react";

interface HeadingProps {
  title: string;
  stepNum?: string;
  subtitle?: string;
  center?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  stepNum,
  subtitle,
  center,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold flex justify-between">
        <div>{title}</div>
        <span className="text-neutral-500 text-base font-normal mb-2 text-right">
          {stepNum}
        </span>
      </div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
