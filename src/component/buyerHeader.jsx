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
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { decrypt } from "../utils/constant";
import { IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";

export default function BuyerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  const menuItems = [
    { name: "For sale or gold", path: "/" },
    { name: "Precon", path: "/market-trends" },
    { name: "Rental", path: "/home-valuation" },
    { name: "Home Valuation", path: "/agents" },
    { name: "Recommended Communities", path: "/agents" },
    { name: "Blogs", path: "/agents" },
    { name: "Agents", path: "/agents" },
  ];

  return (
    <Navbar
      className="bg-[#132141] py-4 px-4 md:px-6 mobile-menu"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      {/* Mobile Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          icon={(isOpen) =>
            isOpen ? (
              <IoClose className="text-white text-2xl" />
            ) : (
              <IoMenu className="text-white text-2xl" />
            )
          }
        />
      </NavbarContent>

      {/* Logo */}
      <NavbarContent
        className="basis-1/5 sm:basis-full max-w-[200px]"
        justify="start"
      >
        <NavbarBrand>
          <Link to="/buyers/home" onClick={() => setIsMenuOpen(false)}>
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto min-w-[200px] object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4 md:gap-6" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              to={item.path}
              className="text-white hover:text-blue-400 transition text-sm md:text-base"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <Link to="/buyers/user-profile">
            <IoPersonOutline className="text-xl text-white hover:text-blue-400 transition" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#132141] pt-8">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-white py-4 px-4 border-b border-blue-900/30 hover:bg-blue-900/50"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

      
      </NavbarMenu>

       <NavbarItem className="sm:hidden">
              <Link to="/buyers/user-profile" onClick={() => setIsMenuOpen(false)}>
                <IoPersonOutline className="text-xl text-white" />
              </Link>
            </NavbarItem>
    </Navbar>
  );
}
