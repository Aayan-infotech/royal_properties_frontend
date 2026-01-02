import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Button } from "@headlessui/react";

import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { encrypt, decrypt } from "../utils/constant";
import { IoPersonOutline } from "react-icons/io5";
export default function AgentHeader() {
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");
  console.log("Decrypted User Type in SellerHeader:", decryptedUserType);
  return (
    <Navbar className="bg-[#132141] py-4 px-6">
      <NavbarBrand>
        <Link to="/agents/home">
          <img src={Logo} alt="Logo" className="cursor-pointer" />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link to="/" className="text-white hover:text-blue-400 transition">
            For sale or gold
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/market-trends"
            className="text-white hover:text-blue-400 transition"
          >
            Precon
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/home-valuation"
            className="text-white hover:text-blue-400 transition"
          >
            Rental
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition"
          >
            Home Valuation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition"
          >
            Recommended Communities
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition"
          >
            Blogs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/agents"
            className="text-white hover:text-blue-400 transition"
          >
            Agents
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/agents/user-profile">
            <IoPersonOutline className="text-xl text-white" />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
