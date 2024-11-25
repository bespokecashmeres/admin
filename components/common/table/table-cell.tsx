import clsx from "clsx";
import React, { ReactNode } from "react";
import { CopyIcon } from "../icons";

const TableCell = ({
  value,
  cursorPointer = false,
  showCopyButton = false,
}: {
  value: ReactNode;
  cursorPointer?: boolean;
  showCopyButton?: boolean;
}) => {
  return (
    <div className="flex justify-center gap-1">
      <span
        className={clsx({
          "cursor-pointer": cursorPointer,
        })}
      >
        {value}
      </span>
      {showCopyButton && <CopyIcon value={value as string} />}
    </div>
  );
};

export default TableCell;
