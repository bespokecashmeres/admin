import React from "react";
import { DefaultLayout } from "../../layout";
import { WelcomeBanner } from "../../welcome-banner";

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <WelcomeBanner />
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
