import React, { memo } from "react";

interface IconProps {
  isActive: boolean;
}

const FittingSizesIcon: React.FC<IconProps> = memo(({ isActive }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 108.99 122.88"
      className="shrink-0 h-6 w-6"
    >
      <g>
        <path
          className={`fill-current ${
            isActive ? "text-indigo-500" : "text-slate-600"
          }`}
          d="M25.77,4.5l27.95,30.89L83.18,4.48c-0.42-0.26-0.91-0.42-1.44-0.42H61.61l-35.08,0.1C26.26,4.23,26,4.35,25.77,4.5 L25.77,4.5z M46.57,67.4h7.48v18.27h11.71v5.96H46.57V67.4L46.57,67.4z M56.96,42.33v15.94h-5.09V41.83L25.8,52.02 c-2.39,0.93-4.38,0.14-4.69-6.16c-0.23-4.68-0.45-11.53-0.55-19.6c-0.11,0.02-0.22,0.02-0.33,0.02H6.98c-0.68,0-1.3,0.28-1.75,0.73 c-0.45,0.45-0.73,1.07-0.73,1.75v87.14c0,0.68,0.28,1.3,0.73,1.75c0.45,0.45,1.07,0.73,1.75,0.73h44.89v-17.29h5.09v17.29h45.05 c0.68,0,1.3-0.28,1.75-0.73c0.45-0.45,0.73-1.07,0.73-1.75V28.76c0-0.68-0.28-1.3-0.73-1.75c-0.45-0.45-1.07-0.73-1.75-0.73H88.52 c0.01,10.05-0.18,18.42-1.29,22.68c-1.47,5.66-6.3,3.54-10.14,1.91L56.96,42.33L56.96,42.33z M88.5,21.78h13.51 c1.92,0,3.67,0.78,4.93,2.05c1.26,1.26,2.05,3.01,2.05,4.93v87.14c0,1.92-0.78,3.67-2.05,4.93c-1.26,1.26-3.01,2.05-4.93,2.05H6.98 c-1.92,0-3.67-0.78-4.93-2.05C0.78,119.57,0,117.82,0,115.9V28.76c0-1.92,0.78-3.67,2.05-4.93c1.26-1.26,3.01-2.05,4.93-2.05h13.26 c0.1,0,0.19,0.01,0.28,0.02c-0.03-4.74-0.02-9.82,0.05-15.06c0-1.29,0.37-2.49,0.99-3.51c0.42-1.76,2-3.07,3.89-3.07l0.65,0 c0.37-0.06,0.75-0.1,1.14-0.1V0.04h0.01h40.34L83.63,0v0c0.96,0,1.93,0.34,2.7,1.05c0.73,0.67,1.15,1.53,1.27,2.44 c0.53,0.96,0.84,2.07,0.84,3.25h0.02v0.01h-0.02C88.43,11.88,88.47,16.97,88.5,21.78L88.5,21.78z M50.05,37.33L24.56,9.05v36.69 c0,1.85,1.82,1.85,3.98,1.08C34.77,44.62,46.9,38.79,50.05,37.33L50.05,37.33z M84.43,9.03L57.37,37.32l24.38,11.11 c1.33,0.64,2.68-1.21,2.68-2.68V9.03L84.43,9.03z M20.55,6.74L20.55,6.74L20.55,6.74z"
        />
      </g>
    </svg>
  );
});

FittingSizesIcon.displayName = "FittingSizesIcon";

export default FittingSizesIcon;