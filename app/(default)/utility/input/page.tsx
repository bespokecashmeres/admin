import TestRHFComponent from "./test-rhf-components";

export default function InputLibrary() {
    return (
      <div className="relative bg-white dark:bg-slate-900 h-full">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
              Inputs ✨
            </h1>
          </div>
  
          <div className="border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-8 mt-8 mb-8">
              <TestRHFComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }