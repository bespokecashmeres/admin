import { DefaultLayout } from "@/components";

export default async function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
