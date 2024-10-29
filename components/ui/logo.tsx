"use client";

import Link from "next/link";
import { LogoIcon } from "../common";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

export default function Logo() {
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  return (
    <Link
      className="block"
      href={`/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.dashboard}`}
    >
      <LogoIcon />
    </Link>
  );
}
