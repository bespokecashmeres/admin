import { DashboardPage } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  return generateAdminPageMetadata({ title: "Dashboard" });
}

export default function Dashboard() {
  return <DashboardPage />;
}
