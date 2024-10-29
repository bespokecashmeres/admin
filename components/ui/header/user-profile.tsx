"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";

type fontSizes = "sm" | "md" | "xs" | "xl" | "2xl" | "3xl";

const sizeClasses = (size: fontSizes) => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "md":
      return "text-md";
    case "xs":
      return "text-xs";
    case "xl":
      return "text-xl";
    case "2xl":
      return "text-2xl";
    case "3xl":
      return "text-3xl";
    default:
      return "text-md";
  }
};

export default function UserProfile({
  profile,
  firstName,
  lastName,
  height = 32,
  width = 32,
  fontSize = "sm",
}: {
  profile?: string;
  firstName?: string;
  lastName?: string;
  height?: number;
  width?: number;
  fontSize?: fontSizes;
}) {
  const [showInitials, setShowInitials] = useState(false);

  const handleImageError = () => {
    setShowInitials(true); // Show initials on image load error
  };

  const getInitials = useCallback(() => {
    if (!firstName && !lastName) return "NA";
    const initials = `${firstName?.charAt?.(0) ?? ""}${
      lastName?.charAt?.(0) ?? ""
    }`;
    return initials.toUpperCase();
  }, [firstName, lastName]);

  return (
    <div
      className={`flex items-center justify-center rounded-full`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {showInitials || !profile ? (
        <div
          className={clsx(
            `flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full font-semibold uppercase text-slate-500 dark:text-slate-400`,
            sizeClasses(fontSize)
          )}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {getInitials()}
        </div>
      ) : (
        <img
          className={`rounded-full`}
          src={profile}
          onError={handleImageError}
          width={width}
          height={height}
          alt="User"
        />
      )}
    </div>
  );
}
