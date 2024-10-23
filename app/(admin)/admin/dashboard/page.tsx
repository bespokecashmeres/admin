import { DefaultLayout } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { WelcomeBanner } from "@/components";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  return generateAdminPageMetadata({ title: "Dashboard" });
}

export default function Dashboard() {
  return (
    <DefaultLayout>
      <WelcomeBanner />
    </DefaultLayout>
  );
}
