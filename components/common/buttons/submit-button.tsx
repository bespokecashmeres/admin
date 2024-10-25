import React from "react";

const SubmitButton = ({ label, disabled }: { label: string; disabled?: boolean; }) => {
  return (
    <button
      type="submit"
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
