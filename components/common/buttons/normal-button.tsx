import clsx from "clsx";
import React from "react";

const NormalButton = ({
  label,
  disabled,
  type = "button",
  onClick,
  Icon,
  className,
}: {
  label: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  Icon?: React.FC;
  className?: string;
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "btn bg-indigo-500 my-2 hover:bg-indigo-600 text-white whitespace-nowrap flex gap-2",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default NormalButton;
