import React, { memo } from "react";

interface IconProps {
  isActive: boolean;
}

const PencilRulerIcon: React.FC<IconProps> = memo(({ isActive }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 90.63 122.88"
      className={`fill-current shrink-0 h-6 w-6 ${
        isActive ? "text-indigo-500" : "text-slate-600"
      }`}
    >
      <g>
        <path d="M1.62,0.79h44.7h1.62v1.62v118.85v1.62h-1.62H1.62H0v-1.62V2.41V0.79H1.62L1.62,0.79z M90.2,31.25v90.01H59.58V31.25h-0.37 l0.91-1.86L73.3,2.31L74.43,0l1.19,2.29l14.03,27.07l0.98,1.89H90.2L90.2,31.25z M77.42,11.39h-5.66l-8.41,17.27h23.02L77.42,11.39 L77.42,11.39z M5.68,112.8h6.97v3.24H5.68V112.8L5.68,112.8z M5.68,106.57h6.97v3.24H5.68V106.57L5.68,106.57z M5.68,100.34h6.97 v3.24H5.68V100.34L5.68,100.34z M5.68,94.11h6.97v3.24H5.68V94.11L5.68,94.11z M5.68,87.88h6.97v3.24H5.68V87.88L5.68,87.88z M5.68,81.65h11.59v3.24H5.68V81.65L5.68,81.65z M5.68,75.42h6.97v3.24H5.68V75.42L5.68,75.42z M5.68,69.19h6.97v3.24H5.68V69.19 L5.68,69.19z M5.68,62.97h6.97v3.24H5.68V62.97L5.68,62.97z M5.68,56.74h6.97v3.24H5.68V56.74L5.68,56.74z M5.68,50.51h6.97v3.24 H5.68V50.51L5.68,50.51z M5.68,44.28h11.59v3.24H5.68V44.28L5.68,44.28z M5.68,38.05h6.97v3.24H5.68V38.05L5.68,38.05z M5.68,31.82 h6.97v3.24H5.68V31.82L5.68,31.82z M5.68,25.59h6.97v3.24H5.68V25.59L5.68,25.59z M5.68,19.36h6.97v3.24H5.68V19.36L5.68,19.36z M5.68,13.14h6.97v3.24H5.68V13.14L5.68,13.14z M5.68,6.91h11.59v3.24H5.68V6.91L5.68,6.91z M44.7,4.03H3.24v115.61H44.7V4.03 L44.7,4.03z" />
      </g>
    </svg>
  );
});

PencilRulerIcon.displayName = "PencilRulerIcon";

export default PencilRulerIcon;
