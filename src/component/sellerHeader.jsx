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
import { decrypt } from "../utils/constant";
import { IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";

export default function SellerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  const menuItems = [
    { name: "Map Search", path: "/" },
    { name: "Market Trends", path: "/market-trends" },
    { name: "Home Valuation", path: "/home-valuation" },
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
          <Link to="/sellers/home" onClick={() => setIsMenuOpen(false)}>
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

        {localStorage.getItem("token") && decryptedUserType === "sellers" ? (
          <NavbarItem>
            <Link to="/sellers/user-profile">
              <IoPersonOutline className="text-xl text-white hover:text-blue-400 transition" />
            </Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/role/login">
                <Button className="border border-white rounded-full text-white px-4 py-2">
                  Login
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/role/signup">
                <Button className="bg-white rounded-full text-[#132141] px-4 py-2">
                  Sign Up
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
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
        <Link to="/sellers/user-profile" onClick={() => setIsMenuOpen(false)}>
          <IoPersonOutline className="text-xl text-white" />
        </Link>
      </NavbarItem>
    </Navbar>
  );
}
