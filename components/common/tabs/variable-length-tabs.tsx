"use client";

import { DropDownOptionType } from "@/types/index";
import clsx from "clsx";
import { ChangeEventHandler, MouseEventHandler } from "react";
import EditIcon from "../icons/edit-icon";
import { ToggleField } from "../inputs";

const VariableLengthTabs = ({
  active,
  handleChange,
  tabs,
  handleDelete,
  handleEdit,
}: {
  active: string;
  handleChange: (selected: string) => void;
  tabs: DropDownOptionType[];
  handleDelete: ChangeEventHandler<HTMLInputElement>;
  handleEdit: MouseEventHandler<SVGSVGElement>;
}) => {
  return (
    <ul className="flex flex-wrap -m-1 gap-2">
      {tabs.map((tab) => (
        <li className="m-1 flex flex-col gap-2" key={tab.value}>
          <button
            type="button"
            disabled={!tab.status}
            onClick={() => handleChange(tab.value)}
            className={clsx(
              "inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border duration-150 ease-in-out",
              {
                "border-transparent shadow-sm bg-indigo-500 text-white":
                  active === tab.value,
                "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400":
                  active !== tab.value,
                "line-through": !tab.status,
              }
            )}
          >
            {tab.label.toUpperCase()}
          </button>
          <div className="flex gap-2">
            <ToggleField
              checked={!!tab.status}
              name={tab.value}
              onChange={handleDelete}
              disabled={active === tab.value}
            />
            <EditIcon id={tab.value} onClick={handleEdit} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VariableLengthTabs;
