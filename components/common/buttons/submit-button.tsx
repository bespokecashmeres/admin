import React from "react";

const SubmitButton = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
