import React, { memo } from "react";

interface IconProps {
  isActive: boolean;
}

const StepsIcon: React.FC<IconProps> = memo(({ isActive }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 82.64"
      className="shrink-0 h-6 w-6"
    >
      <g>
        <path
          className={`fill-current ${
            isActive ? "text-indigo-500" : "text-slate-600"
          }`}
          d="M94.83,0h26.1c1.07,0,1.95,0.88,1.95,1.95v79.25c0,0.05,0,0.09,0,0.13v1.3H0V65.86 c-0.02-2.16,1.13-3.31,3.34-3.54l27.03,0.04V42.99c-0.02-0.99,0.41-1.51,1.3-1.52H60.8V22.85c0.07-1.3,0.81-1.87,1.96-2.01h29.53 V2.88C92.24,2.01,92.87,0,94.83,0L94.83,0z"
        />
      </g>
    </svg>
  );
});

StepsIcon.displayName = "StepsIcon";

export default StepsIcon;
