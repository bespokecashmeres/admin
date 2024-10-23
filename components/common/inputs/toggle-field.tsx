import React from "react";

const ToggleField = ({
  checked,
  onChange,
  name = "switch-1",
}: {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}) => {
  return (
    <div className="flex items-center">
      <div className="form-switch">
        <input
          type="checkbox"
          id={name}
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <label className="bg-slate-400 dark:bg-slate-700" htmlFor={name}>
          <span className="bg-white shadow-sm" aria-hidden="true"></span>
        </label>
      </div>
    </div>
  );
};

export default ToggleField;
