import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Fieldset,
} from "@headlessui/react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { PiGarageFill } from "react-icons/pi";
import { CiShare1 } from "react-icons/ci";
import {
  FaTag,
  FaCalendarAlt,
  FaDollarSign,
  FaFileAlt,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../component/axiosInstance";

export default function PropertyDetail() {
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeDescTab, setActiveDescTab] = useState("original");
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const [propertyData, setPropertyData] = useState(location?.state?.property);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentForm, setAgentForm] = useState({
    name: "",
    enquiry: "General Inquiry",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedAgent, setSelectedAgent] = useState(null);

  console.log("Location state:", location.state);
  // Sample images - replace with your actual images
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      alt: "Front view with lake",
      label: "For Sale",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      alt: "Exterior view",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      alt: "Interior staircase",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      alt: "Living room",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
      alt: "Modern interior",
    },
  ];

  const listingHistory = [
    {
      dateStart: "2025-11-10",
      dateEnd: "",
      price: "$7,788,000",
      event: "For Sale",
      listingId: "R3067039",
    },
    {
      dateStart: "",
      dateEnd: "",
      price: "(Sign-in required)",
      event: "Sold",
      listingId: "(Sign-in required)",
    },
    {
      dateStart: "",
      dateEnd: "",
      price: "(Sign-in required)",
      event: "Sold",
      listingId: "(Sign-in required)",
    },
    {
      dateStart: "",
      dateEnd: "",
      price: "(Sign-in required)",
      event: "Sold",
      listingId: "(Sign-in required)",
    },
  ];

  const handlePrevious = () => {
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const keyFactsData = {
    tax: "$32,879 / 2024",
    propertyType: "Single Family Residence",
    yearBuilt: "1997",
    size: "7304 feet²",
    pricePerSqft: "$1,066",
    lotSize: "85 x 168 feet",
    parking: "3",
    coopCommission: "Contact listing agent",
  };

  const detailsData = {
    listingId: "R3067039",
    dateSource: "REBGV",
    listingBrokerage: "Sutton Group-West Coast Realty",
    daysOnSite: "1 days",
    statusChange: "1 hour ago",
    addedToRoyalProperty: "2025-11-12",
    updatedOn: "2025-11-13",
  };

  const description = `• The residence is a 3-story house.
• It has unobstructed panoramic views from its location on a quiet street.
• The house has been upgraded and maintained by the current owner for nearly a decade.
• The main level features a double-height foyer, a formal living room with a fireplace, and an open-concept dining and family area.`;

  const fullDescription =
    description +
    `
• Additional features include a gourmet kitchen with high-end appliances.
• The master suite offers a spa-like ensuite bathroom and walk-in closet.
• Outdoor living spaces include multiple decks and a landscaped garden.
• Located in a prestigious neighborhood with excellent schools nearby.`;

  const homeValueData = [
    {
      icon: <FaTag className="w-6 h-6" />,
      label: "SigmaEstimate",
      status: "Insufficient data",
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      label: "Estimated Date",
      status: "Insufficient data",
    },
    {
      icon: <FaDollarSign className="w-6 h-6" />,
      label: "Estimated Rent",
      status: "Insufficient data",
    },
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      label: "Rental Yield",
      status: "Insufficient data",
    },
    {
      icon: <FaHome className="w-6 h-6" />,
      label: "Rental DOM",
      status: "Insufficient data",
    },
  ];

  const EnquiryModal = ({ open, onClose, agentId }) => {
    const [localForm, setLocalForm] = useState({
      name: "",
      enquiry: "General Inquiry",
      email: "",
      phone: "",
      message: "",
      agentId: agentId,
      propertyId: propertyData?._id,
    });

    const [localLoading, setLocalLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLocalLoading(true);
      console.log("Form submitted:", localForm, agentId);
      try {
        const response = await axiosInstance.post("/enquiries", {
          propertyId: propertyData?._id,
          agentId: agentId,
          name: localForm?.name,
          enquiry: localForm?.enquiry,
          email: localForm?.email,
          phoneNumber: localForm?.phone,
          message: localForm?.message,
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Enquiry sent successfully:", response.data);
          setLocalForm({
            name: "",
            enquiry: "General Inquiry",
            email: "",
            phone: "",
            message: "",
          });
          onClose();
          alert("Enquiry sent successfully!");
        }
      } catch (error) {
        console.error("Error sending enquiry:", error);
        alert("Failed to send enquiry. Please try again.");
      } finally {
        setLocalLoading(false);
      }
    };

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="relative bg-white w-full sm:max-w-[800px] rounded-t-2xl sm:rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Send Enquiry</h2>
            <button
              onClick={onClose}
              className="text-gray-400 text-2xl hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-3">
              <div className="mb-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  onChange={(e) =>
                    setLocalForm({ ...localForm, name: e.target.value })
                  }
                  value={localForm.name}
                  className="w-full mt-2 border rounded-lg px-3 py-2 outline-none border-gray-500"
                />
              </div>

              <div className="mb-2">
                <label className="text-sm font-medium">Enquiry Type</label>
                <select
                  className="w-full mt-2 border border-gray-500 rounded-lg px-3 py-2 outline-none"
                  name="enquiry"
                  value={localForm.enquiry}
                  onChange={(e) =>
                    setLocalForm({ ...localForm, enquiry: e.target.value })
                  }
                >
                  {[
                    "General Inquiry",
                    "Schedule Viewing",
                    "Price Information",
                    "Request Callback",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="mb-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 border rounded-lg px-3 py-2 outline-none border-gray-500"
                  name="email"
                  onChange={(e) =>
                    setLocalForm({ ...localForm, email: e.target.value })
                  }
                  value={localForm.email}
                />
              </div>

              {/* Phone */}
              <div className="mb-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full mt-2 border rounded-lg px-3 py-2 outline-none border-gray-500"
                  name="phone"
                  onChange={(e) =>
                    setLocalForm({ ...localForm, phone: e.target.value })
                  }
                  value={localForm.phone}
                />
              </div>

              {/* Message */}
              <div className="mb-4 col-span-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full mt-2 border rounded-lg px-3 py-2 outline-none resize-none border-gray-500"
                  name="message"
                  onChange={(e) =>
                    setLocalForm({ ...localForm, message: e.target.value })
                  }
                  value={localForm.message}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#3b5c9c] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a7a] disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={localLoading}
            >
              {localLoading ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        {/* <div className="bg-white mb-4">
          <div className="flex justify-between items-end w-full">
            <div className="flex space-x-8 px-6">
              {[
                "Overview",
                "Listing History",
                "Estimates",
                "Comparables",
                "Schools",
                "Community",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    tab === "Overview"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex space-x-3 px-6 mb-1">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Sold Watch
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
              <button className="px-2 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[600px]">
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
            <img
              src={propertyData?.photos[0].url}
              alt="property image"
              className="w-full h-full object-cover"
              onClick={() => {
                setModalImageIndex(0);
                setIsOpen(true);
              }}
            />
            <button className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              View Listing in Full Map
            </button>
            <div className="absolute bottom-4 left-4 bg-[#E9F6F7] px-3 py-1.5 rounded-md text-sm font-semibold text-[#3B5999]">
              {images[0].label}
            </div>
          </div>

          {/* Right Side Images */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {propertyData?.photos.slice(1, 5).map((img, idx) => (
              <div
                key={img._id}
                className="relative group cursor-pointer overflow-hidden rounded-lg h-[295px]"
                onClick={() => {
                  setModalImageIndex(idx + 1);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img?.url}
                  alt="other images"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <button
                      className="bg-[#3B5999] px-4 py-2 rounded-md text-sm font-semibold text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                        setModalImageIndex(0);
                      }}
                    >
                      See all {images.length} photos
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-screen bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Section - Property Details */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between flex-wrap lg:flex-nowrap border-b  border-gray-200">
                  <div className=" pb-4">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                      {propertyData?.address}
                    </h1>
                    <p className="text-gray-600 mb-2 text-md">
                      West Vancouver - Canterbury WV
                    </p>
                    <p className="text-sm text-gray-500">
                      Single Family Residence
                    </p>
                  </div>
                  <div className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-600">Listed for</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${propertyData?.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(propertyData?.createdAt).toUTCString()}
                    </p>
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex justify-between items-center gap-8 mb-6 mt-4 flex-wrap lg:flex-nowrap">
                  <div className="flex  items-center gap-2">
                    <IoBedSharp size={30} />
                    <span className="text-gray-700">
                      {propertyData?.details?.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath size={30} />
                    <span className="text-gray-700">
                      {propertyData?.details?.halfBathrooms} half Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath size={30} />
                    <span className="text-gray-700">
                      {propertyData?.details?.fullBathrooms} full Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoBedSharp size={30} />
                    <span className="text-gray-700">
                      {propertyData?.details?.additionalRooms} Additional Rooms
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                  <TabList className="flex gap-8 border-b border-gray-200">
                    <Tab
                      className={({ selected }) =>
                        `pb-3 text-sm font-medium border-b-2 transition-colors outline-none ${
                          selected
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      Listing History
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `pb-3 text-sm font-medium border-b-2 transition-colors outline-none ${
                          selected
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      Price Changes (0)
                    </Tab>
                  </TabList>

                  <TabPanels className="mt-4">
                    {/* Listing History Tab */}
                    <TabPanel>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          Buy/sell history for {propertyData.address},{" "}
                          {propertyData.location} ({propertyData.type})
                        </p>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-500 bg-[#F2F2F2]">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                Date Start
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                Date End
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                Price
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                Event
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                Listing ID
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listingHistory.map((item, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 even:bg-[#F2F2F2]"
                              >
                                <td className="py-3 px-4 text-sm text-gray-900">
                                  {item.dateStart || "-"}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900">
                                  {item.dateEnd || "-"}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900">
                                  {item.price}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900">
                                  {item.event}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {item.listingId}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Sign-in Notice */}
                      <div className="mt-4 flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
                        <CiLock className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          Real estate boards require you to{" "}
                          <button className="text-blue-600 hover:underline">
                            Join
                          </button>{" "}
                          or{" "}
                          <button className="text-blue-600 hover:underline">
                            Log in
                          </button>{" "}
                          to see the full details of this property.
                        </p>
                      </div>
                    </TabPanel>

                    {/* Price Changes Tab */}
                    <TabPanel>
                      <div className="py-8 text-center text-gray-500">
                        <p>No price changes recorded</p>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>

                <TabGroup>
                  <TabList className="border-b border-gray-200">
                    <div className="flex">
                      <Tab
                        className={({ selected }) =>
                          `px-6 py-4 text-sm font-medium outline-none ${
                            selected
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900"
                          }`
                        }
                      >
                        Key Facts
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          `px-6 py-4 text-sm font-medium outline-none ${
                            selected
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900"
                          }`
                        }
                      >
                        Details
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          `px-6 py-4 text-sm font-medium outline-none ${
                            selected
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900"
                          }`
                        }
                      >
                        Rooms
                      </Tab>
                    </div>
                  </TabList>

                  <TabPanels>
                    {/* Key Facts Panel */}
                    <TabPanel className="p-6">
                      <p className="text-sm text-gray-600 mb-6">
                        Key facts for 1525 Errigal Place, Canterbury WV, West
                        Vancouver.
                      </p>

                      {/* Two Column Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Left Column - Key Facts */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">Tax:</span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.tax}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Property Type:
                            </span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.propertyType}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Year Built:
                            </span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.yearBuilt}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">Size:</span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.size}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Price/sqft:
                            </span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.pricePerSqft}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Lot Size:
                            </span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.lotSize}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Parking:
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaHome className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              Coop Commission:
                              <IoMdInformationCircle className="w-4 h-4 text-gray-400" />
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaFileAlt className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Listing #:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.listingId}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Data Source:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.dateSource}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Listing Brokerage:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.listingBrokerage}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Days on Site:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.daysOnSite}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Status Change:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.statusChange}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Added to Royal Property:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.addedToRoyalProperty}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600">
                              Updated on:
                            </span>
                            <span className="text-sm text-gray-900">
                              {detailsData.updatedOn}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div className="border-t border-b  border-gray-200 pt-6">
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">
                            Description:
                          </span>
                        </div>

                        {/* Description Tabs */}
                        <div className="border-b  border-gray-200 mb-4">
                          <div className="flex gap-6">
                            <button
                              onClick={() => setActiveDescTab("original")}
                              className={`pb-2 text-sm font-medium border-b-2 ${
                                activeDescTab === "original"
                                  ? "border-blue-600 text-blue-600"
                                  : "border-transparent text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              Original
                            </button>
                            <button
                              onClick={() => setActiveDescTab("summary")}
                              className={`pb-2 text-sm font-medium border-b-2 ${
                                activeDescTab === "summary"
                                  ? "border-blue-600 text-blue-600"
                                  : "border-transparent text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              Summary (AI)
                            </button>
                          </div>
                        </div>

                        {/* Description Content */}
                        <div className="text-sm text-gray-700 whitespace-pre-line mb-4">
                          {showMore ? fullDescription : description}
                        </div>

                        <button
                          onClick={() => setShowMore(!showMore)}
                          className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          {showMore ? "Show Less" : "Show More"}
                        </button>
                      </div>

                      {/* Home Value Section */}
                      <div className="border-t border-b  border-gray-200 pt-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Home Value
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          Current valuation for 1525 Errigal Place, Canterbury
                          WV, West Vancouver. Listed for $7,788,000 on Sign-in
                          required
                        </p>

                        {/* Home Value Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                          {homeValueData.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center text-center py-2 rounded-lg"
                            >
                              <div className="text-gray-400 mb-2">
                                {item.icon}
                              </div>
                              <div className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                {item.label}
                                <IoMdInformationCircle className="w-3 h-3 text-gray-400" />
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.status}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* School and Rental Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              School:
                              <IoMdInformationCircle className="w-4 h-4 text-gray-400" />
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <AiFillStar
                                  key={star}
                                  className="w-4 h-4 text-blue-600"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 lg:justify-end">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              Rental:
                              <IoMdInformationCircle className="w-4 h-4 text-gray-400" />
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <AiOutlineStar
                                  key={star}
                                  className="w-4 h-4 text-gray-300"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    {/* Details Panel */}
                    <TabPanel className="p-6">
                      <p className="text-gray-600">
                        Details content coming soon...
                      </p>
                    </TabPanel>

                    {/* Rooms Panel */}
                    <TabPanel className="p-6">
                      <p className="text-gray-600">
                        Rooms content coming soon...
                      </p>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              {/* Right Section - Schedule Viewing Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 px-3 ">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-500 py-2 ">
                      Property Agent
                    </h3>
                    <div>
                      <p className="text-xs text-gray-700">
                        Tour with Royal Property Agent
                      </p>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-3">
                    {propertyData?.agentIds?.map((agentId) => (
                      <div
                        key={agentId?._id}
                        className=" border border-gray-300 rounded-lg mb-4"
                      >
                        <div className="flex items-center items-center">
                          <div className="flex flex-col items-center w-full">
                            <img
                              src={
                                agentId?.agentImage ||
                                "https://imgs.search.brave.com/Ra2YlxZk0tKBLBaMqBBnBfWFCoLbtTRp1bJs36rHAv4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM2LzEy/LzY0LzM2MTI2NGM3/M2U2OWViNmQyMDRl/MjFiZjlkMTYxNGM4/LmpwZw"
                              }
                              alt="Agent"
                              className="w-30 lg:w-full h-35 object-cover"
                            />
                            <p className="text-lg font-semibold text-gray-600">
                              {agentId?.fullName?.toUpperCase(" ")}
                            </p>
                            <div>
                              {/* <p className="text-xs text-gray-600">
                              {agentTitle}
                            </p> */}
                              <div className="flex gap-2 flex-col items-center px-1 pb-3">
                                {" "}
                                <button
                                  type="button"
                                  className="px-4 py-2 text-sm text-white rounded-md bg-[#132141] hover:bg-indigo-400"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setSelectedAgent(agentId?._id);
                                    setOpenEnquiry(true);
                                  }}
                                >
                                  Schedule Viewing
                                </button>
                                <button
                                  type="button"
                                  className="px-4 py-2 text-sm text-white rounded-md bg-gray-500 hover:bg-gray-400 w-full"
                                >
                                  View Profile
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        placeholder="I want to book an appointment to view: [R3067039], 1525 Errigal Place, West Vancouver"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        defaultValue="I want to book an appointment to view: [R3067039], 1525 Errigal Place, West Vancouver"
                      />
                    </div>

                    <div className="text-xs text-gray-600">
                      <span className="text-red-500">*</span> Required field
                    </div>

                    <div className="text-xs text-gray-600 leading-relaxed">
                      By submitting this form, I understand Royal Property will
                      share my information with registered real estate
                      professionals.
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#3B5999] hover:bg-[#3b5999a8] text-white font-medium py-3 rounded-md transition-colors"
                    >
                      Schedule Viewing
                    </button>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-7xl transform transition-all">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <IoMdClose className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-4 py-2 rounded-md text-sm font-medium">
                  {modalImageIndex + 1} / {images.length}
                </div>

                {/* Main Image Display with Magnify */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <div className="w-full max-w-2xl h-[80vh] flex items-center justify-center p-4">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "property image",
                          isFluidWidth: true,
                          src: propertyData?.photos[modalImageIndex].url,
                        },
                        largeImage: {
                          src: propertyData?.photos[modalImageIndex]?.url,
                          width: 1800,
                          height: 1200,
                        },
                        enlargedImageContainerDimensions: {
                          width: "150%",
                          height: "150%",
                        },
                        enlargedImageContainerClassName: "z-[1500]",
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        imageStyle: {
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                          maxHeight: "75vh",
                        },
                      }}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                  >
                    <FaChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
                  >
                    <FaChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {propertyData?.photos.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setModalImageIndex(idx)}
                      className={`shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        modalImageIndex === idx
                          ? "border-blue-500 opacity-100"
                          : "border-transparent opacity-50 hover:opacity-75"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        agentId={selectedAgent}
      />
    </div>
  );
}
