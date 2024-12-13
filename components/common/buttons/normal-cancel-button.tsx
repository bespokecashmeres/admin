import { FC } from "react";

const NormalCancelButton: FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NormalCancelButton;
