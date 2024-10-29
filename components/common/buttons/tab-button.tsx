import clsx from "clsx";

interface TabButtonProps {
  isActive: boolean;
  handleClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  handleClick,
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 duration-150 ease-in-out border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm",
        isActive
          ? "bg-indigo-500 text-black dark:bg-indigo-500 dark:text-white border-none dark:border-none hover:border-none dark:hover:border-none shadow-none"
          : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400"
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
