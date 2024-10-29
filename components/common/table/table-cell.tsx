import clsx from "clsx";
import React, { ReactNode } from "react";

const TableCell = ({
  value,
  cursorPointer = false,
}: {
  value: ReactNode;
  cursorPointer?: boolean;
}) => {
  return (
    <div className="flex justify-center">
      <span
        className={clsx({
          "cursor-pointer": cursorPointer,
        })}
      >
        {value}
      </span>
    </div>
  );
};

export default TableCell;
