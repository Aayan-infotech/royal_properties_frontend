export const type = location.pathname.split("/")[1];
import CryptoJS from "crypto-js";
import { AES } from "crypto-js";
const secretKey = "RoyalPropertyKey";
import {
  FaSchool,
  FaHospital,
  FaUniversity,
  FaShoppingCart,
  FaShoppingBag,
  FaTree,
  FaBus,
  FaSubway,
  FaTrain,
  FaPlane,
  FaBuilding,
  FaCreditCard,
  FaUtensils,
  FaHotel,
  FaGasPump,
  FaPlaceOfWorship,
  FaMosque,
  FaChurch
} from 'react-icons/fa';

export const NearbyPlace = {
  SCHOOL: { label: 'School', icon: FaSchool },
  HOSPITAL: { label: 'Hospital', icon: FaHospital },
  COLLEGE: { label: 'College', icon: FaUniversity },
  MARKET: { label: 'Market', icon: FaShoppingCart },
  MALL: { label: 'Mall', icon: FaShoppingBag },
  PARK: { label: 'Park', icon: FaTree },
  BUS_STOP: { label: 'Bus Stop', icon: FaBus },
  METRO_STATION: { label: 'Metro Station', icon: FaSubway },
  RAILWAY_STATION: { label: 'Railway Station', icon: FaTrain },
  AIRPORT: { label: 'Airport', icon: FaPlane },
  BANK: { label: 'Bank', icon: FaBuilding },
  ATM: { label: 'ATM', icon: FaCreditCard },
  RESTAURANT: { label: 'Restaurant', icon: FaUtensils },
  HOTEL: { label: 'Hotel', icon: FaHotel },
  PETROL_PUMP: { label: 'Petrol Pump', icon: FaGasPump },
  TEMPLE: { label: 'Temple', icon: FaPlaceOfWorship },
  MOSQUE: { label: 'Mosque', icon: FaMosque },
  CHURCH: { label: 'Church', icon: FaChurch }
}
export const PropertyOptions = [
"Residential",
"Commercial",
"Pre Construction Condo",
];


export const locationOptions = [
  "All Locations",
  "GTA-Central",
  "GTA-North",
  "City 1",
  "City 2",
  "City 3",
  "City 4",
  "City 5",
];

export const PriceOptions = [
  "under $300,000",
  "$300,000",
  "$400,000",
  "$500,000",
  "$600,000",
  "$700,000",
  "$800,000",
  "$900,000",
  "above $900,000"
];

export const HomeOptions = [
  "Detached",
  "Bungalow",
  "Semi-detached",
  "Attached/Townhouse",
  "Apartment/Condo",
  "Link",
  "Stacked",
  "Duplex",
  "Triplex",
  "Fourplex",
  "Garden Home",
  "Mobile Home",
  "Manufactured Home/Mobile",
  "Special Purpose",
  "Residential Commercial Mix",
  "Manufactured Home",
  "Commercial Apartment",
  "Other",
];

export const SaleOptions = [
  "Sale",
  "Rent",
  "Rented",
  "Sold",

];
export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return '-'; // Handle null/undefined/empty

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const userType = decrypt(localStorage.getItem("userRole") || "");


export const menuItems = [
  { name: "Map Search", path: "/map" },
  { name: "Market Trends", path: "/market-trends" },
  { name: "Home Valuation", path: "/home-valuation" },
  { name: "Agents", path: "/agents" },
];

export const accountMenuItems = [
  { name: "Netherlands", abbreviation: "NL" },
  // { name: "Ontario", abbreviation: "ON" },
  // { name: "Alberta", abbreviation: "AB" },
  // { name: "Columbia", abbreviation: "CB" },
];
