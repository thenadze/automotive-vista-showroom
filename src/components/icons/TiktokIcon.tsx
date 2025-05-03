
import React from "react";

interface TiktokIconProps {
  className?: string;
}

const TiktokIcon: React.FC<TiktokIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c5 0 5 6 8 7" />
    </svg>
  );
};

export default TiktokIcon;
