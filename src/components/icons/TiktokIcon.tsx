
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
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6 5.82C15.9061 5.03962 15.5332 4.03743 15.54 3H12.45V16.54C12.4262 17.0547 12.1993 17.5387 11.8185 17.8858C11.4377 18.2329 10.9297 18.4142 10.415 18.39C9.34 18.39 8.48 17.54 8.48 16.46C8.48 15.12 9.75 14.08 11.09 14.45V11.28C8.09 11.04 5.44 13.35 5.44 16.45C5.44 19.44 7.92 21.38 10.4 21.38C13.06 21.38 15.21 19.23 15.21 16.57V9.66C16.4193 10.5783 17.8804 11.0787 19.38 11.08V8C19.38 8 17.73 8.11 16.6 5.82Z"
      />
    </svg>
  );
};

export default TiktokIcon;
