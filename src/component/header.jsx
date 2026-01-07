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
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { menuItems, accountMenuItems } from "../utils/constant";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="bg-[#132141] py-4 md:px-6"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
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
               className="h-8 w-auto min-w-[150px] md:min-w-[200px] object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent
        className="hidden lg:flex gap-4 md:gap-6 w-full"
        justify="end"
      >
        <div className="flex justify-between w-full items-center">
          {/* Desktop dropdown with full content */}
          <NavbarItem className="hidden lg:flex border rounded-lg border-white px-2 py-1">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-1 text-white hover:text-blue-400 transition text-sm md:text-base focus:outline-none">
                Netherlands
                <IoChevronDown className="h-4 w-4" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 dropdown-headless">
                {accountMenuItems.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-50 text-blue-600" : "text-gray-700"
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {item.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </NavbarItem>

          <div className="flex flex-row gap-5 align-center">
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
          </div>
        </div>

        <NavbarItem className="hidden lg:flex">
          <Link to="/role/login">
            <Button className="border border-white rounded-full text-white px-4 py-2 hover:bg-white/10 transition">
              Login
            </Button>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/role/signup">
            <Button className="bg-white rounded-full text-[#132141] px-4 py-2 hover:bg-gray-100 transition">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#132141] pt-8 z-50">
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
            <Button className="w-full border border-white rounded-full text-white py-2 hover:bg-white/10">
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
            <Button className="w-full bg-white rounded-full text-[#132141] py-2 hover:bg-gray-100">
              Sign Up
            </Button>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent className="lg:hidden order-last" justify="start">
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

      {/* Tablet dropdown (sm:flex but not lg) - shows full content */}
      <NavbarItem className="hidden sm:flex lg:hidden border rounded-lg border-white px-2 py-1">
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-1 text-white hover:text-blue-400 transition text-sm md:text-base focus:outline-none">
            Netherlands
            <IoChevronDown className="h-4 w-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 dropdown-headless">
            {accountMenuItems.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    {item.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </NavbarItem>

      {/* Mobile dropdown (smallest screens) - shows abbreviations */}
      <NavbarItem className="flex sm:hidden border rounded-lg border-white px-2 py-1">
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-1 text-white hover:text-blue-400 transition text-sm focus:outline-none">
            NL
            <IoChevronDown className="h-4 w-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 dropdown-headless">
            {accountMenuItems.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    } block w-full text-left px-3 py-2 text-sm`}
                  >
                    {item.abbreviation}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </NavbarItem>

      {/* Login button for mobile/tablet */}
      {/* <NavbarItem className="hidden sm:flex lg:hidden">
        <Link to="/role/login">
          <Button className="border border-white rounded-full text-white px-3 py-1.5 hover:bg-white/10 transition text-sm">
            Login
          </Button>
        </Link>
      </NavbarItem> */}
    </Navbar>
  );
}
