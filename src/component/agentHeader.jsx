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
import {
  IoPersonOutline,
  IoMenu,
  IoClose,
  IoChevronDown,
} from "react-icons/io5";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { accountMenuItems } from "../utils/constant";

export default function AgentHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  const menuItems = [
    { name: "Client management", path: "/" },
    { name: "Appointments", path: "/" },
    { name: "Property Listing", path: "/" },
    { name: "Map View", path: "/" },
    { name: "Reports", path: "/" },
  ];

  return (
    <Navbar
      className="bg-[#132141] py-4 px-4 md:px-6"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      {/* Mobile Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          icon={(open) =>
            open ? (
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
          <Link to="/agents/home">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto min-w-[200px] object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent
        className="hidden sm:flex w-full items-center gap-6 justify-end"
        justify="end"
      >
        <div className="flex items-center gap-5 justify-between w-full">
          <NavbarItem className="hidden lg:flex border border-white rounded-lg px-2 py-1">
            <Menu>
              <MenuButton className="flex items-center gap-1 text-white">
                Netherlands <IoChevronDown />
              </MenuButton>
              <MenuItems className="absolute mt-2 bg-white rounded-lg shadow-lg w-48 z-50 dropdown-headless">
                {accountMenuItems.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <button
                        className={`block w-full px-4 py-2 text-sm ${
                          active ? "bg-blue-50 text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </NavbarItem>
          <div className="flex gap-5 flex-row">
            {menuItems.map((item) => (
              <NavbarItem key={item.name}>
                <Link className="text-white hover:text-blue-400" to={item.path}>
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </div>

        <NavbarItem>
          <Link to="/agents/user-profile">
            <IoPersonOutline className="text-xl text-white" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#132141] pt-8">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link className="block text-white py-4 px-4" to={item.path}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Mobile dropdown */}
      <NavbarItem className="flex sm:hidden border border-white rounded-lg px-2 py-1">
        <Menu>
          <MenuButton className="flex items-center text-white">
            NL <IoChevronDown />
          </MenuButton>
          <MenuItems className="absolute mt-2 bg-white rounded-lg shadow-lg w-32 z-50">
            {accountMenuItems.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <button className="block w-full px-3 py-2 text-sm">
                    {item.abbreviation}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </NavbarItem>
    </Navbar>
  );
}
