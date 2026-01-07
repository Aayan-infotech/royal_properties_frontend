import React from "react";
import logo from "../assets/footer-logo.png";
import apple from "../assets/apple.png";
import google from "../assets/play.png";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaSquareXTwitter , FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#132141] text-white py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          <div className="md:col-span-2">
            <img src={logo} alt="Logo" className="w-full mb-4" />
            <p className="text-gray-400 text-sm">
              Royal Property is a leading technology platform that utilizes
              artificial intelligence technology to estimate Canadian home
              values in real time.
            </p>
            <div className="flex flex-row gap-2 mt-3">
              <a href="#">
                <RiFacebookBoxFill className="w-6 h-6" />
              </a>
               <a href="#">
                <FaSquareXTwitter className="w-6 h-6" />
              </a>
               <a href="#">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-4 text-gray-400">Sitemaps</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Ontario Sitemap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Alberta Sitemap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  British Columbia Sitemap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-400">Company</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Recently Sold Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Market Trends
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-400">Support</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Feedback{" "}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Privacy & Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-gray-400 text-sm space-y-2 grid grid-cols-2 md:grid-cols-1 gap-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  <img src={apple} alt="Logo" className="w-full mb-4" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  <img src={google} alt="Logo" className="w-full mb-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © COPYRIGHT 2025 BY ROYAL PROPERTY INC. BROKERAGE ALL RIGHTS
            RESERVED{" "}
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">App Version 7.21.144</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
