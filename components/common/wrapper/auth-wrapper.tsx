import { AuthHeader, AuthImage } from "@/components/ui";
import React from "react";

const AuthWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) => {
  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                {title}! ✨
              </h1>
              {children}
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
};

export default AuthWrapper;
