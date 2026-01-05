export const type = location.pathname.split("/")[1];
import CryptoJS from "crypto-js";
import { AES } from "crypto-js";
const secretKey = "RoyalPropertyKey";

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const menuItems = [
  { name: "Map Search", path: "/" },
  { name: "Market Trends", path: "/market-trends" },
  { name: "Home Valuation", path: "/home-valuation" },
  { name: "Agents", path: "/agents" },
];

export const accountMenuItems = [
  { name: "Netherlands", abbreviation: "NL" },
  { name: "Ontario", abbreviation: "ON" },
  { name: "Alberta", abbreviation: "AB" },
  { name: "Columbia", abbreviation: "CB" },
];
