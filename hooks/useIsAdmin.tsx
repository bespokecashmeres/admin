import { ROUTES } from "@/constants";
import { usePathname } from "next/navigation";

export const useIsAdmin = (): boolean => {
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  return isAdmin;
};
