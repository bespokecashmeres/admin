import Link from "next/link";
import React from "react";

const CancelLinkButton = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link
      href={href}
      className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
    >
      {label}
    </Link>
  );
};

export default CancelLinkButton;
