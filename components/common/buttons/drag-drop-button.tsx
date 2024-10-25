import React from "react";

const DragDropButton = () => {
  return (
    <svg
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="42px"
      height="42px"
      viewBox="0 0 32.00 32.00"
      stroke-width="0.00032"
      className="fill-gray-700 stroke-gray-700 dark:fill-gray-300 dark:stroke-gray-300"
    >
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0"
        transform="translate(16,16), scale(0)"
      >
        <rect
          x="0"
          y="0"
          width="32.00"
          height="32.00"
          rx="0"
          fill="#7ed0ec"
          strokeWidth="0"
        />
      </g>

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.704"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>draggable</title> <rect x="10" y="6" width="4" height="4" />{" "}
        <rect x="18" y="6" width="4" height="4" />{" "}
        <rect x="10" y="14" width="4" height="4" />{" "}
        <rect x="18" y="14" width="4" height="4" />{" "}
        <rect x="10" y="22" width="4" height="4" />{" "}
        <rect x="18" y="22" width="4" height="4" />{" "}
        <rect
          id="_Transparent_Rectangle_"
          className="fill-none"
          width="32"
          height="32"
        />{" "}
      </g>
    </svg>
  );
};

export default DragDropButton;
