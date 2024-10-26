import SettingsSidebar from "./settings-sidebar";

const SettingsWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          {title} ✨
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SettingsSidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsWrapper;
