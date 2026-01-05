import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Button } from "@headlessui/react";

import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { encrypt, decrypt } from "../utils/constant";
import { IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";

export default function AgentHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  console.log("Decrypted User Type in SellerHeader:", decryptedUserType);

  const menuItems = [
    { name: "Client management", path: "/" },
    { name: "Appointments", path: "/market-trends" },
    { name: "Property Listing", path: "/home-valuation" },
    { name: "Map View", path: "/agents" },
    { name: "Reports", path: "/agents" },
  ];

  return (
    <Navbar
      className="bg-[#132141] py-4 px-4 md:px-6 mobile-menu"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBordered={false}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          icon={(isOpen) =>
            isOpen ? (
              <IoClose className="text-white text-2xl" />
            ) : (
              <IoMenu className="text-white text-2xl" />
            )
          }
        />
      </NavbarContent>

      {/* Logo/Brand */}
      <NavbarContent
        className="basis-1/5 sm:basis-full max-w-[200px]"
        justify="start"
      >
        <NavbarBrand className="">
          <Link to="/agents/home" onClick={() => setIsMenuOpen(false)}>
            <img
              src={Logo}
              alt="Logo"
              className="cursor-pointer h-8 w-auto min-w-[200px] object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-4 md:gap-6" justify="end">
        <NavbarItem>
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition text-sm md:text-base"
          >
            Client management
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/market-trends"
            className="text-white hover:text-blue-400 transition text-sm md:text-base"
          >
            Appointments
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/home-valuation"
            className="text-white hover:text-blue-400 transition text-sm md:text-base"
          >
            Property Listing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition text-sm md:text-base"
          >
            Map View
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition text-sm md:text-base"
          >
            Reports
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Link to="/agents/user-profile">
            <IoPersonOutline className="text-xl text-white hover:text-blue-400 transition" />
          </Link>
        </NavbarItem>

        {/* Mobile Profile Icon */}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#132141] pt-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              to={item.path}
              className="w-full text-white py-4 px-4 hover:bg-blue-900/50 hover:text-blue-300 transition-colors block border-b border-blue-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarItem className="sm:hidden">
        <Link to="/agents/user-profile" onClick={() => setIsMenuOpen(false)}>
          <IoPersonOutline className="text-xl text-white" />
        </Link>
      </NavbarItem>
    </Navbar>
  );
}
