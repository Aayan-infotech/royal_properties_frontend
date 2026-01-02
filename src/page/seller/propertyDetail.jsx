import React , { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { PiGarageFill } from "react-icons/pi";
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
import { useParams } from "react-router-dom";
import axiosInstance from "../../component/axiosInstance";

export default function SellerPropertyDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeDescTab, setActiveDescTab] = useState("original");
  const [showMore, setShowMore] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample fallback images - will be used if no images in API
  const fallbackImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      alt: "Property front view",
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

  // Get status text based on property status
  const getStatusText = (property) => {
    if (property?.propertyBLOCK) return "Blocked";
    if (property?.soldOut) return "Sold";
    if (property?.isApprovalByAdmin === "approved") return "Active";
    if (property?.isApprovalByAdmin === "approval") return "Pending";
    return "Inactive";
  };

  // Format price to currency
  const formatPrice = (price) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get property images
  const getPropertyImages = () => {
    if (propertyData?.photos && propertyData.photos.length > 0) {
      return propertyData.photos.map((photo, index) => ({
        id: index + 1,
        src: photo.url,
        alt: `${propertyData?.property || "Property"} image ${index + 1}`,
        label: getStatusText(propertyData),
      }));
    }
    return fallbackImages;
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/properties/${id}`);
        setPropertyData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const handlePrevious = () => {
    const images = getPropertyImages();
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    const images = getPropertyImages();
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !propertyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Property Not Found
          </h3>
          <p className="text-gray-500">Unable to load property details.</p>
        </div>
      </div>
    );
  }

  const images = getPropertyImages();

  const propertyFeatures = {
    address: propertyData.address || "Address not available",
    location: `${
      propertyData.keyFacts?.municipality ||
      propertyData.address ||
      "Location not available"
    }`,
    type: propertyData.keyFacts?.propertyType || "Property Type not available",
    price: formatPrice(propertyData.price),
    addedDate: propertyData.createdAt
      ? `Added ${formatDate(propertyData.createdAt)}`
      : "Date not available",
    bedrooms: propertyData.details?.bedrooms || "N/A",
    bathrooms: propertyData.details?.fullBathrooms || "N/A",
    garages: propertyData.keyFacts?.parking || "N/A",
  };

  const keyFactsData = {
    tax: "Contact for details", // Not available in API
    propertyType: propertyData.keyFacts?.propertyType || "N/A",
    yearBuilt: propertyData.keyFacts?.yearBuilt || "N/A",
    size: propertyData.keyFacts?.size || "N/A",
    pricePerSqft: propertyData.keyFacts?.pricePerSqft || "N/A",
    lotSize: propertyData.keyFacts?.lotSize || "N/A",
    parking: propertyData.keyFacts?.parking || "N/A",
    coopCommission: "Contact listing agent", // Not available in API
  };

  const detailsData = {
    listingId: propertyData._id?.substring(0, 8) || "N/A",
    dateSource: "Royal Properties",
    listingBrokerage: propertyData.sellerId?.fullName || "N/A",
    daysOnSite: "Calculating...", // You might calculate this
    statusChange: "Recently", // You might calculate this
    addedToRoyalProperty: formatDate(propertyData.createdAt),
    updatedOn: formatDate(propertyData.updatedAt),
  };

  const description = `• ${propertyData.property || "Property details"}`;

  const fullDescription =
    description +
    (propertyData.address ? `\n• Address: ${propertyData.address}` : "") +
    (propertyData.keyFacts?.size
      ? `\n• Size: ${propertyData.keyFacts.size}`
      : "") +
    (propertyData.details?.buildingAge
      ? `\n• Building Age: ${propertyData.details.buildingAge}`
      : "") +
    (propertyData.details?.constructionType
      ? `\n• Construction Type: ${propertyData.details.constructionType}`
      : "") +
    (propertyData.details?.exteriorFeature
      ? `\n• Exterior Features: ${propertyData.details.exteriorFeature}`
      : "") +
    (propertyData.details?.additionalRooms
      ? `\n• Additional Rooms: ${propertyData.details.additionalRooms}`
      : "");

  const homeValueData = [
    {
      icon: <FaTag className="w-6 h-6" />,
      label: "Property Value",
      status: formatPrice(propertyData.price),
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      label: "Listed Date",
      status: formatDate(propertyData.createdAt),
    },
    {
      icon: <FaDollarSign className="w-6 h-6" />,
      label: "Price per Sqft",
      status: propertyData.keyFacts?.pricePerSqft || "N/A",
    },
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      label: "Property Type",
      status: propertyData.keyFacts?.propertyType || "N/A",
    },
    {
      icon: <FaHome className="w-6 h-6" />,
      label: "Status",
      status: getStatusText(propertyData),
    },
  ];

  const listingHistory = [
    {
      dateStart: formatDate(propertyData.createdAt),
      dateEnd: "",
      price: formatPrice(propertyData.price),
      event: getStatusText(propertyData),
      listingId: propertyData._id?.substring(0, 8) || "N/A",
    },
    // Add more history items if available
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="bg-white mb-4">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367

-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
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
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[600px]">
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
            <img
              src={images[0].src}
              alt={images[0].alt}
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
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={img.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg h-[295px]"
                onClick={() => {
                  setModalImageIndex(idx + 1);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {idx === 3 && images.length > 5 && (
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
                <div className="flex justify-between border-b border-gray-200">
                  <div className="pb-4">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                      {propertyFeatures.address}
                    </h1>
                    <p className="text-gray-600 mb-2 text-md">
                      {propertyFeatures.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {propertyFeatures.type}
                    </p>
                  </div>
                  <div className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-600">Listed for</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {propertyFeatures.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {propertyFeatures.addedDate}
                    </p>
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex justify-between items-center gap-8 mb-6 mt-4">
                  <div className="flex items-center gap-2">
                    <IoBedSharp size={30} />
                    <span className="text-gray-700">
                      {propertyFeatures.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath size={30} />
                    <span className="text-gray-700">
                      {propertyFeatures.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiGarageFill size={30} />
                    <span className="text-gray-700">
                      {propertyFeatures.garages} Parking
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
                          Buy/sell history for {propertyFeatures.address},{" "}
                          {propertyFeatures.location} ({propertyFeatures.type})
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
                        Key facts for {propertyFeatures.address},{" "}
                        {propertyFeatures.location}.
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
                              <span className="text-sm text-gray-900">
                                {keyFactsData.parking}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              Coop Commission:
                              <IoMdInformationCircle className="w-4 h-4 text-gray-400" />
                            </span>
                            <span className="text-sm text-gray-900">
                              {keyFactsData.coopCommission}
                            </span>
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
                      <div className="border-t border-b border-gray-200 pt-6">
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">
                            Description:
                          </span>
                        </div>

                        {/* Description Tabs */}
                        <div className="border-b border-gray-200 mb-4">
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

                        {fullDescription.length > description.length && (
                          <button
                            onClick={() => setShowMore(!showMore)}
                            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            {showMore ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>

                      {/* Home Value Section */}
                      <div className="border-t border-b border-gray-200 pt-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Property Information
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                          Current information for {propertyFeatures.address},{" "}
                          {propertyFeatures.location}.
                          {propertyFeatures.price !== "N/A" &&
                            ` Listed for ${propertyFeatures.price}`}
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

                        {/* School and Rental Info - Placeholder */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              School Rating:
                              <IoMdInformationCircle className="w-4 h-4 text-gray-400" />
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <AiFillStar
                                  key={star}
                                  className="w-4 h-4 text-gray-300"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 lg:justify-end">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              Rental Potential:
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
                      <div className="space-y-4">
                        {propertyData.details &&
                          Object.entries(propertyData.details).map(
                            ([key, value]) => (
                              <div key={key} className="grid grid-cols-2 gap-4">
                                <span className="text-sm text-gray-600 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </span>
                                <span className="text-sm text-gray-900">
                                  {value || "N/A"}
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    </TabPanel>

                    {/* Rooms Panel */}
                    <TabPanel className="p-6">
                      {propertyData.rooms?.items &&
                      propertyData.rooms.items.length > 0 ? (
                        <div className="space-y-4">
                          {propertyData.rooms.items.map((room, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-200 pb-4 last:border-b-0"
                            >
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                {room.name}
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <span>Size: {room.size || "N/A"}</span>
                                <span>Level: {room.level || "N/A"}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          No room information available.
                        </p>
                      )}
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>

              {/* Right Section - Schedule Viewing Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-500 py-2 ">
                      Schedule Viewing
                    </h3>
                    <div>
                      <p className="text-xs text-gray-700">
                        Tour with Royal Property Agent
                      </p>
                    </div>
                  </div>

                  <form className="space-y-4">
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
                        placeholder={`I want to book an appointment to view: [${detailsData.listingId}], ${propertyFeatures.address}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        defaultValue={`I want to book an appointment to view: [${detailsData.listingId}], ${propertyFeatures.address}`}
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
                  </form>
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
                          alt: images[modalImageIndex].alt,
                          isFluidWidth: true,
                          src: images[modalImageIndex].src,
                        },
                        largeImage: {
                          src: images[modalImageIndex].src,
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
                  {images.map((img, idx) => (
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
                        src={img.src}
                        alt={img.alt}
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
    </div>
  );
}
