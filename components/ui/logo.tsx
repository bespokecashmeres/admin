"use client";

import { ROUTES } from "@/constants";
import androidBrandLogo from "@/public/pictures/android-chrome-512x512.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  return (
    <Link
      className="block bg-white rounded-full p-2"
      href={`/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.dashboard}`}
    >
      <Image height={32} width={32} src={androidBrandLogo} alt="brand-logo" />
    </Link>
  );
}
