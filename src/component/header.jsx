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
import { IoMenu, IoClose } from "react-icons/io5";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Map Search", path: "/" },
    { name: "Market Trends", path: "/market-trends" },
    { name: "Home Valuation", path: "/home-valuation" },
    { name: "Agents", path: "/agents" },
  ];

  return (
    <Navbar
      className="bg-[#132141] py-4 px-4 md:px-6"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      {/* Mobile Menu Toggle */}
     

      {/* Logo */}
      <NavbarContent
        className="basis-1/5 sm:basis-full max-w-[200px]"
        justify="start"
      >
        <NavbarBrand>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto min-w-[200px] object-contain cursor-pointer"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
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

        <NavbarMenuItem>
          <Link
            to="/role/login"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full py-4 px-4"
          >
            <Button className="w-full border border-white rounded-full text-white py-2">
              Login
            </Button>
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            to="/role/signup"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full py-2 px-4"
          >
            <Button className="w-full bg-white rounded-full text-[#132141] py-2">
              Sign Up
            </Button>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>

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
    </Navbar>
  );
}
