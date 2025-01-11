"use client";

import { DropDownOptionType } from "@/types/index";
import clsx from "clsx";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DeleteButtonWithConfirmation } from "../buttons";
import EditIcon from "../icons/edit-icon";
import { ToggleField } from "../inputs";
import CONFIG from "@/config";

const ItemType = {
  TAB: "tab",
};

const VariableLengthTabs = ({
  active,
  handleChange,
  tabs,
  handleDelete,
  handleEdit,
  handlePermanentDelete,
  moveTab,
}: {
  active: string;
  handleChange: (selected: string) => void;
  tabs: DropDownOptionType[];
  handleDelete: ChangeEventHandler<HTMLInputElement>;
  handleEdit: MouseEventHandler<SVGSVGElement>;
  handlePermanentDelete: (deleteId: string) => Promise<void>;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
}) => {
  return (
    <ul className="flex flex-wrap -m-1 gap-2">
      {tabs.map((tab, index) => (
        <DraggableTab
          key={tab.value}
          index={index}
          tab={tab}
          active={active}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePermanentDelete={handlePermanentDelete}
          moveTab={moveTab}
        />
      ))}
    </ul>
  );
};

const DraggableTab = ({
  index,
  tab,
  active,
  handleChange,
  handleDelete,
  handleEdit,
  handlePermanentDelete,
  moveTab,
}: {
  index: number;
  tab: DropDownOptionType;
  active: string;
  handleChange: (selected: string) => void;
  handleDelete: ChangeEventHandler<HTMLInputElement>;
  handleEdit: MouseEventHandler<SVGSVGElement>;
  handlePermanentDelete: (deleteId: string) => Promise<void>;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  // Drag functionality
  const [, drag] = useDrag({
    type: ItemType.TAB,
    item: { index },
    canDrag: CONFIG.developmentMode,
  });

  // Drop functionality
  const [, drop] = useDrop({
    accept: ItemType.TAB,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTab(item.index, index);
        item.index = index; // Update the dragged item's index
      }
    },
  });

  // Attach drag and drop refs
  drag(drop(ref));

  return (
    <li className="m-1 flex flex-col gap-2 cursor-pointer" ref={ref}>
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
      <div className="flex gap-1 items-center justify-center">
        {CONFIG.developmentMode && <ToggleField
          checked={!!tab.status}
          name={tab.value}
          onChange={handleDelete}
          disabled={active === tab.value}
        />}
        <EditIcon id={tab.value} onClick={handleEdit} />
        {CONFIG.developmentMode && <DeleteButtonWithConfirmation
          deleteId={tab.value}
          handleDelete={handlePermanentDelete}
        />}
      </div>
    </li>
  );
};

export default VariableLengthTabs;
