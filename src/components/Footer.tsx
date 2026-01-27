import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Footer = () => {
  const exploreLinks = [
    { href: "/category/house", label: "Houses" },
    { href: "/category/warehouse", label: "Warehouses" },
    { href: "/category/hotel", label: "Hotels" },
    { href: "/category/apartment", label: "Apartments" },
    { href: "/category/land", label: "Lands" },
  ];

  const agentLinks = [
    { href: "/category/house", label: "Agent Login" },
    { href: "/category/warehouse", label: "List Properties" },
    { href: "/category/hotel", label: "Tools and Apps" },
  ];

  const companyLinks = [
    { href: "/category/house", label: "About Us" },
    { href: "/category/warehouse", label: "Press" },
    { href: "/category/hotel", label: "Contact" },
  ];

  return (
    <div className="bg-[#0f172a] pt-20">
      <Container className="gap-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <div className="">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={70}
              />
            </Link>
            <p className="text-sm text-[#9ca3af] my-4">
              Elevating the real estate experience with curated premium listings
              and seamless digital solutions for agents and buyer alike.
            </p>

            <div className="flex gap-6 items-center">
              <Link
                href="/"
                className="border rounded-full border-[#484a4e] p-1 hover:border-[#c1c4ca] transition">
                <FaInstagram size={17} className="text-white" />
              </Link>

              <Link
                href="/"
                className="border rounded-full border-[#484a4e] p-1 hover:border-[#c1c4ca] transition">
                <FaTwitter size={17} className="text-white" />
              </Link>

              <Link
                href="/"
                className="border rounded-full border-[#484a4e] p-1 hover:border-[#c1c4ca] transition">
                <FaLinkedin size={17} className="text-white" />
              </Link>
            </div>
          </div>

          <div className="ml-0 md:ml-12">
            <p className="text-[#fdfdfd] text-base uppercase font-semibold mb-1">
              Explore
            </p>
            <div>
              {exploreLinks.map((link) => (
                <li key={link.href} className="list-none mb-1">
                  <Link
                    href={link.href}
                    className="text-[#667387] hover:text-white transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#fdfdfd] text-base uppercase font-semibold mb-1">
              For agents
            </p>
            <div>
              {agentLinks.map((link) => (
                <li key={link.href} className="list-none mb-1">
                  <Link
                    href={link.href}
                    className="text-[#667387] hover:text-white transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[#fdfdfd] text-base uppercase font-semibold mb-1">
              Company
            </p>
            <div>
              {companyLinks.map((link) => (
                <li key={link.href} className="list-none mb-1">
                  <Link
                    href={link.href}
                    className="text-[#667387] hover:text-white transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div className="">
            <p className="text-[#fdfdfd] text-base uppercase font-semibold mb-1">
              Newsletter
            </p>
            <p className="text-sm text-[#667387]">
              Join 5,000+ subscribers for the latest market insights and
              exclusive property offers.
            </p>

            <div className="flex gap-2 border w-50 border-gray-400 bg-[#162033] rounded-lg px-2 py-2.5 mt-4 relative">
              <input
                type="email"
                placeholder="Email address"
                className="outline-none text-gray-400 w-35"
              />
              <button className="bg-[#089589] px-2 py-2 absolute right-1 top-1 rounded-lg cursor-pointer">
                {" "}
                <IoMdSend size={20} className="text-white " />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm py-6 border-t mt-20 border-gray-800 text-[#667387]">
          &copy; stay-finder 2026
        </p>
      </Container>
    </div>
  );
};

export default Footer;
