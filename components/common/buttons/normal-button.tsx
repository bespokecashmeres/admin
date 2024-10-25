import React, { Fragment } from "react";

const NormalButton = ({
  label,
  disabled,
  type = "button",
  onClick,
  Icon,
}: {
  label: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  Icon?: React.FC;
}) => {
  return (
    <button
      type={type}
      className="btn bg-indigo-500 my-2 hover:bg-indigo-600 text-white whitespace-nowrap flex gap-2"
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default NormalButton;
