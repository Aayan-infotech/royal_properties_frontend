import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaHeart,
  FaShare,
  FaPhone,
} from "react-icons/fa";
import {
  MdHome,
  MdApartment,
  MdLocationOn,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { Link } from "react-router-dom";

const NearbyProperties = () => {
  // Initial properties data
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Cozy Family Home",
      type: "house",
      status: "For Sale",
      location: "Toronto, ON",
      distance: "0.5 km",
      price: 890000,
      formattedPrice: "$890K",
      beds: 4,
      baths: 3,
      area: 2150,
      description:
        "Beautiful family home in a quiet neighborhood with modern amenities and spacious backyard.",
      featured: true,
    },
    {
      id: 2,
      title: "Urban Loft",
      type: "apartment",
      status: "For Rent",
      location: "Toronto, ON",
      distance: "0.8 km",
      price: 650000,
      formattedPrice: "$650K",
      beds: 2,
      baths: 1,
      area: 1200,
      description:
        "Stylish loft apartment in the heart of downtown with exposed brick and high ceilings.",
      featured: false,
    },
    {
      id: 3,
      title: "Modern Apartment",
      type: "apartment",
      status: "For Sale",
      location: "Toronto, ON",
      distance: "1.2 km",
      price: 520000,
      formattedPrice: "$520K",
      beds: 2,
      baths: 2,
      area: 1100,
      description:
        "Contemporary apartment with updated kitchen, stainless steel appliances, and balcony.",
      featured: false,
    },
    {
      id: 4,
      title: "Luxury Condo",
      type: "condo",
      status: "For Sale",
      location: "Toronto, ON",
      distance: "2.1 km",
      price: 1250000,
      formattedPrice: "$1.25M",
      beds: 3,
      baths: 2,
      area: 1800,
      description:
        "High-end condo with panoramic city views, premium finishes, and concierge service.",
      featured: true,
    },
    {
      id: 5,
      title: "Suburban Townhouse",
      type: "townhouse",
      status: "For Rent",
      location: "Toronto, ON",
      distance: "3.5 km",
      price: 3200,
      formattedPrice: "$3,200/mo",
      beds: 3,
      baths: 2.5,
      area: 1650,
      description:
        "Spacious townhouse with finished basement, private yard, and two-car garage.",
      featured: false,
    },
    {
      id: 6,
      title: "Waterfront Property",
      type: "house",
      status: "For Sale",
      location: "Toronto, ON",
      distance: "4.8 km",
      price: 2450000,
      formattedPrice: "$2.45M",
      beds: 5,
      baths: 4,
      area: 3200,
      description:
        "Stunning waterfront property with private dock, gourmet kitchen, and panoramic lake views.",
      featured: true,
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all", // 'all', 'sale', 'rent'
    type: "all", // 'all', 'house', 'apartment', 'condo', 'townhouse'
    beds: "any",
    baths: "any",
    maxPrice: 3000000,
  });

  const [sortBy, setSortBy] = useState("distance"); // 'distance', 'price-low', 'price-high'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([1, 4]);

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => {
      // Filter by status
      if (
        filters.status !== "all" &&
        property.status !==
          `For ${
            filters.status.charAt(0).toUpperCase() + filters.status.slice(1)
          }`
      ) {
        return false;
      }

      // Filter by type
      if (filters.type !== "all" && property.type !== filters.type) {
        return false;
      }

      // Filter by beds
      if (filters.beds !== "any" && property.beds < parseInt(filters.beds)) {
        return false;
      }

      // Filter by baths
      if (filters.baths !== "any" && property.baths < parseInt(filters.baths)) {
        return false;
      }

      // Filter by price
      if (property.price > filters.maxPrice) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Get property type icon
  const getPropertyIcon = (type) => {
    switch (type) {
      case "house":
        return <MdHome className="text-blue-600" />;
      case "apartment":
        return <MdApartment className="text-purple-600" />;
      case "condo":
        return <TbBuildingSkyscraper className="text-green-600" />;
      case "townhouse":
        return <MdHome className="text-orange-600" />;
      default:
        return <MdHome className="text-gray-600" />;
    }
  };

  // Handle favorite toggle
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const propertyCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      {/* Header Section */}
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Nearby Properties
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center text-gray-600">
            <MdLocationOn className="text-blue-500 mr-2" />
            <span className="font-medium">Your Location:</span>
            <span className="ml-2">Toronto, Ontario, Canada</span>
          </div>

          <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <span className="font-bold mr-2">{filteredProperties.length}</span>
            <span>Properties Found</span>
            <span className="mx-2">•</span>
            <span>Within 5 km</span>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* <motion.aside
          className="lg:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaFilter className="mr-3 text-blue-500" />
              Filters & Search
            </h2>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Status</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "sale", "rent"].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-2 rounded-lg transition ${
                      filters.status === status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleFilterChange("status", status)}
                  >
                    {status === "all"
                      ? "All"
                      : status === "sale"
                      ? "For Sale"
                      : "For Rent"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                Property Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {["all", "house", "apartment", "condo", "townhouse"].map(
                  (type) => (
                    <button
                      key={type}
                      className={`px-4 py-2 rounded-lg flex items-center transition ${
                        filters.type === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleFilterChange("type", type)}
                    >
                      {type !== "all" && (
                        <span className="mr-2">{getPropertyIcon(type)}</span>
                      )}
                      {type === "all"
                        ? "All"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Beds</h3>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.beds}
                  onChange={(e) => handleFilterChange("beds", e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Baths</h3>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.baths}
                  onChange={(e) => handleFilterChange("baths", e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Max Price</h3>
                <span className="font-bold text-blue-600">
                  $
                  {filters.maxPrice >= 1000000
                    ? `${(filters.maxPrice / 1000000).toFixed(1)}M`
                    : `${(filters.maxPrice / 1000).toFixed(0)}K`}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="100000"
                value={filters.maxPrice}
                onChange={(e) =>
                  handleFilterChange("maxPrice", parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$100K</span>
                <span>$2.5M</span>
                <span>$5M</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaSortAmountDown className="mr-2" />
                Sort By
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "distance", label: "Distance" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`px-4 py-2 rounded-lg transition ${
                      sortBy === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.aside> */}

        {/* Main Content - Property Listings */}
        <motion.main
          className="lg:w-3/4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProperties.map((property) => (
                <Link to="/buyers/property-detail/123">
                  <motion.div
                    key={property.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    variants={propertyCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    layout
                  >
                    {/* Property Image/Header */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white font-semibold text-sm ${
                          property.status === "For Sale"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {property.status}
                      </div>

                      {/* Favorite Button */}
                      <button
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white"
                        onClick={() => toggleFavorite(property.id)}
                      >
                        <FaHeart
                          className={
                            favorites.includes(property.id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        />
                      </button>

                      {/* Property Type Icon */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-2xl">
                          {getPropertyIcon(property.type)}
                        </div>
                      </div>

                      {/* Distance */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {property.distance}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {property.title}
                        </h3>
                        <span className="text-2xl font-bold text-blue-700">
                          {property.formattedPrice}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-4">
                        <MdLocationOn className="text-gray-400 mr-1" />
                        <span>{property.location}</span>
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {property.description}
                      </p>

                      {/* Property Features */}
                      <div className="flex justify-between border-t border-gray-200 pt-4">
                        <div className="flex items-center text-gray-700">
                          <FaBed className="mr-2 text-blue-500" />
                          <span className="font-semibold">{property.beds}</span>
                          <span className="ml-1">Beds</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <FaBath className="mr-2 text-blue-500" />
                          <span className="font-semibold">
                            {property.baths}
                          </span>
                          <span className="ml-1">Baths</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <FaRulerCombined className="mr-2 text-blue-500" />
                          <span className="font-semibold">{property.area}</span>
                          <span className="ml-1">sqft</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {/* <div className="flex gap-3 mt-6">
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <FaPhone className="mr-2" />
                        Contact Agent
                      </button>

                      <button
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <FaShare />
                      </button>

                      <button
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <MdKeyboardArrowRight className="text-xl" />
                      </button>
                    </div> */}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProperties.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl text-gray-300 mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No properties found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setFilters({
                    status: "all",
                    type: "all",
                    beds: "any",
                    baths: "any",
                    maxPrice: 3000000,
                  });
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default NearbyProperties;
