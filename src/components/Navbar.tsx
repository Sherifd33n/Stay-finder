"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdMenu, IoMdPerson } from "react-icons/io";
import StepModal from "./listing-modal/ListingSteps";
import { FaRegHeart } from "react-icons/fa";
import DropDown from "./NavbarDropdown";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/explore", label: "Explore" },
    { href: "/properties", label: "Properties" },
    // { href: "/agent", label: "Agent" },
  ];

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const stored = localStorage.getItem("favorites");
      setCount(stored ? JSON.parse(stored).length : 0);
    };

    updateCount();

    window.addEventListener("storage", updateCount);
    window.addEventListener("favoritesChanged", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("favoritesChanged", updateCount);
    };
  }, []);

  const menuItems = [
    { label: "Profile", action: () => alert("Profile clicked") },
    { label: "Settings", action: () => alert("Settings clicked") },
    { label: "Help", action: () => alert("Help clicked") },
    { label: "Logout", action: () => alert("Logout clicked"), danger: true },
  ];

  return (
    <div className="py-2.5 border-b border-gray-200">
      <Container className="flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
        </Link>

        <div className="bg-[#f1f3f7] rounded-full py-1.5">
          <ul className="text-[16px] font-semi text-[#506a88] flex justify-center">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={`inline-block mx-2 px-3.5 py-2.5 rounded-full transition-colors
                ${
                  isActive
                    ? "bg-white text-[#089589] duration-300 transition-all"
                    : "hover:text-[#089589]"
                }
              `}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setOpen(true)}
            className="text-[#424f62] text-[16px] cursor-pointer hover:text-gray-900">
            List your properties
          </button>
          <StepModal isOpen={open} onClose={() => setOpen(false)} />
          <Link href="/favorite" className="relative">
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
            <FaRegHeart className="text-[#424f62] cursor-pointer" size={23} />
          </Link>
          <div className="flex items-center gap-5 border border-gray-200 rounded-full py-3 px-2">
            <DropDown
              buttonContent={
                <>
                  <IoMdMenu
                    className="text-[#424f62] hover:scale-110 duration-200 cursor-pointer"
                    size={23}
                  />
                </>
              }
              menuItems={menuItems}
              buttonClassName="hover:scale-105"
            />
            <div>
              <IoMdPerson
                className="text-[#6b7280] bg-[#f3f4f6] px-1 h-10.5 w-8 py-2 rounded-full"
                size={23}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
