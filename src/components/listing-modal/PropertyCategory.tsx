"use client";

import { ReactNode } from "react";

interface PropertyCategoryProps {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}


export default function PropertyCategory({
  label,
  icon,
  isActive = false,
  onClick,
}: PropertyCategoryProps) {
  return (
    <div
      onClick={onClick}
      className={`w-37.5 h-25 rounded-md flex flex-col items-center justify-center gap-3 cursor-pointer transition
        ${
          isActive
            ? "border-2 border-[#089589] bg-[#f3f8fe]"
            : "border border-[#9ca3af] bg-white hover:border-[#089589] hover:border-2 hover:bg-[#f3f8fe]"
        }
      `}
    >
      <div
        className={`${
          isActive ? "text-[#089589]" : "text-[#9ca3af]"
        }`}
      >
        {icon}
      </div>
      <p className="text-sm text-[#1e1f21]">{label}</p>
    </div>
  );
}
