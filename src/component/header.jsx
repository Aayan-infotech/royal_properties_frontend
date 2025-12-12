import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Button } from '@headlessui/react'

import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="bg-[#132141] py-4 px-6">
      <NavbarBrand>
        <Link to="/">
          <img src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link to="/" className="text-white hover:text-blue-400 transition">
            Map Search
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/market-trends"
            className="text-white hover:text-blue-400 transition"
          >
            Market Trends
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/home-valuation" className="text-white hover:text-blue-400 transition">
            Home Valuation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/agents" className="text-white hover:text-blue-400 transition">
            Agents
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link to="/role">
            <Button className="border border-white rounded-full text-[#fff] px-4 py-2 cursor-pointer">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/role">
            <Button className="bg-white rounded-full text-[#132141] px-4 py-2 cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
