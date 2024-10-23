import { DefaultLayout } from "@/components";
import { Viewport } from "next";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { WelcomeBanner } from "@/components";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  return generateAdminPageMetadata({ title: "Dashboard" });
}

export default function Dashboard() {
  return (
    <DefaultLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        <WelcomeBanner />
      </div>
    </DefaultLayout>
  );
}
