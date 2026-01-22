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
    { name: "Client management", path: "client-management" },
    { name: "Appointments", path: "home" },
    { name: "Property Listing", path: "agent-property" },
    { name: "Map View", path: "map" },
    { name: "Reports", path: "home" },
  ];

  return (
    <Navbar
      className="bg-[#132141] py-4 md:px-6"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      {/* Mobile Toggle */}
      <NavbarContent className="lg:hidden" justify="start">
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
              className="h-8 w-auto min-w-[150px] md:min-w-[200px] object-contain"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent
        className="hidden lg:flex w-full items-center gap-6 justify-end"
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
                <Link className="text-white hover:text-blue-400" to={`/${decryptedUserType}/${item.path}`}>
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
      <NavbarMenu className="bg-[#132141] pt-8"  style={{zIndex:999}}>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name} onClick={() => setIsMenuOpen(false)}>
            <Link
              className="block text-white py-4 px-4"
              to={`/${decryptedUserType}/${item.path}`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Mobile dropdown */}
      <div className="flex flex-row gap-2 items-center">
        <NavbarItem className="flex lg:hidden border rounded-lg border-white px-2 py-1">
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
        <NavbarItem className="lg:hidden">
          <Link to="/agents/user-profile">
            <IoPersonOutline className="text-xl text-white" />
          </Link>
        </NavbarItem>
      </div>
    </Navbar>
  );
}
