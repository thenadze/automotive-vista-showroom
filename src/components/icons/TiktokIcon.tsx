
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
      <path d="M16.5 5.5v4.5a7 7 0 01-7 7v0a7 7 0 01-7-7v0a7 7 0 017-7h4.5" />
      <path d="M16 8.5a4 4 0 004 4V5.5a4 4 0 00-4-4v7Z" />
    </svg>
  );
};

export default TiktokIcon;
