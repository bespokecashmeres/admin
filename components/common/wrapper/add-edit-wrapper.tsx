import React, { Fragment } from "react";

const AddEditWrapper = ({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) => {
  return (
    <Fragment>
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            {title} ✨
          </h1>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative p-5">
        {children}
      </div>
    </Fragment>
  );
};

export default AddEditWrapper;
