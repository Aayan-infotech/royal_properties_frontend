import React, { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { RiFilter3Line } from "react-icons/ri";
import data from "../../data/home.json";
import Building from "../../assets/building.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
import { Image } from "@heroui/image";
import Chart from "react-apexcharts";
import {
  FiHome,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronRight,
} from "react-icons/fi";
import { MdLocationOn, MdPeople, MdBusiness } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BuyerHome() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: "" });
  const [propertyType, setPropertyType] = useState({
    detached: false,
    semiDetached: false,
    freeholdTownhouse: false,
    condoTownhouse: false,
  });
  const [luxuryHouse, setLuxuryHouse] = useState(false);
  const [luxuryPrice, setLuxuryPrice] = useState({ min: 1000000, max: "" });
  const [selectedCities, setSelectedCities] = useState({
    "GTA-Central": {},
    "GTA-North": {},
  });

  // Location options for dropdown
  const locationOptions = [
    "All Locations",
    "GTA-Central",
    "GTA-North",
    "City 1",
    "City 2",
    "City 3",
    "City 4",
    "City 5",
  ];

  // City options
  const cityOptions = {
    "GTA-Central": ["City 1", "City 2", "City 3", "City 4", "City 5"],
    "GTA-North": ["City 1", "City 2", "City 3", "City 4", "City 5"],
  };

  // Handle property type checkbox
  const handlePropertyTypeChange = (type) => {
    setPropertyType((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle city selection
  const handleCityChange = (region, city) => {
    setSelectedCities((prev) => ({
      ...prev,
      [region]: {
        ...prev[region],
        [city]: !prev[region]?.[city],
      },
    }));
  };

  // Select all cities in a region
  const selectAllCities = (region) => {
    const allSelected = cityOptions[region].reduce((acc, city) => {
      acc[city] = true;
      return acc;
    }, {});

    setSelectedCities((prev) => ({
      ...prev,
      [region]: allSelected,
    }));
  };

  // Deselect all cities in a region
  const deselectAllCities = (region) => {
    setSelectedCities((prev) => ({
      ...prev,
      [region]: {},
    }));
  };

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", selectedLocation);
    // Implement search logic here
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Apply filters
  const applyFilters = () => {
    const filters = {
      priceRange,
      propertyType,
      luxuryHouse,
      luxuryPrice: luxuryHouse ? luxuryPrice : null,
      selectedCities,
    };
    console.log("Applied Filters:", filters);
    setSidebarOpen(false);
  };

  const priceChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3B82F6"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      min: 1000000,
      max: 1400000,
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    dataLabels: { enabled: false },
  };

  const priceChartSeries = [
    {
      name: "Median Price",
      data: [1150000, 1180000, 1200000, 1220000, 1215000, 1234000, 1250000],
    },
  ];

  // Chart data for Days on Market
  const daysChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#10B981"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      min: 15,
      max: 40,
    },
    dataLabels: { enabled: false },
  };

  const daysChartSeries = [
    {
      name: "Days on Market",
      data: [35, 32, 30, 28, 26, 24, 22],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Search and Location Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-center mb-4">
        {/* Location Dropdown */}
        <div className="relative flex-1">
          <div
            className="flex items-center justify-between bg-white rounded-xl px-4 py-3 cursor-pointer"
            onClick={() =>
              document
                .getElementById("location-dropdown")
                .classList.toggle("hidden")
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-medium">
                {selectedLocation}
              </span>
            </div>
            <FiChevronDown className="text-gray-600" />
          </div>

          {/* Dropdown Menu */}
          <div
            id="location-dropdown"
            className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
          >
            {locationOptions.map((location, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setSelectedLocation(location);
                  document
                    .getElementById("location-dropdown")
                    .classList.add("hidden");
                }}
              >
                {location}
              </div>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="flex-1 relative md:col-span-3">
          <input
            type="text"
            placeholder="Search properties, areas, or keywords..."
            className="w-full bg-white rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
            onClick={handleSearch}
          />
        </div>

        {/* Filter Button */}
        <div className="md:col-span-1.5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RiFilter3Line size={20} />
            <span className="font-medium">Personalize Listing</span>
          </button>
        </div>
      </div>

      {/* Featured Listing Section */}
      <motion.div
        className="max-w-7xl mx-auto py-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div className="flex justify-between" variants={itemVariants}>
          <h5>Featured Listing</h5>
          <motion.div whileHover={{ x: 5 }}>
            <Link to="/" className="text-primary font-semibold hover:underline">
              See All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div variants={cardVariants} style={{ originY: 0 }}>
                <Card
                  className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full
                   
                     `}
                >
                  <CardBody className="overflow-visible pb-2">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        alt="Card background"
                        className="object-cover"
                        src={Building}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "15px 15px 0 0" }}
                      />
                      <AnimatePresence>
                        {item.sale > 0 && (
                          <motion.span
                            className="absolute bottom-2 left-2 bg-[#E9F6F7] text-dark px-2 py-1 rounded-sm text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            For Sale
                          </motion.span>
                        )}
                        {item.sold > 0 && (
                          <motion.span
                            className="absolute bottom-2 left-2 bg-[#FF6F1E] text-dark px-2 py-1 rounded-sm text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            Sold
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <div className="flex flex-col gap-1 px-3 pt-2 px-2">
                      <motion.div
                        className="flex justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-gray-800 text-sm">
                          Listed: <b>${item.price}</b>
                        </span>
                        <span className="text-gray-500 text-sm">
                          {item.minutes} minutes ago
                        </span>
                      </motion.div>
                      <motion.span
                        className="text-gray-800 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.address}
                      </motion.span>
                      <motion.div
                        className="flex row gap-2 text-sm py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.span
                          className="flex row gap-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <IoBedSharp size={20} /> {item.bed}
                        </motion.span>
                        <motion.span
                          className="flex row gap-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaBath size={16} /> {item.bath}
                        </motion.span>
                        <motion.span
                          className="flex row gap-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <PiGarageFill size={20} /> {item.garage}
                        </motion.span>
                      </motion.div>
                    </div>

                    <motion.div
                      className="px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <hr className="border-gray-400" />
                      <span className="text-gray-500 text-sm pt-2">
                        {item.des}
                      </span>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
              {/* {item?.login && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    type="submit"
                    className="flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login required
                  </motion.button>
                </motion.div>
              )} */}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Just Sold in British Columbia Section */}
      <motion.div
        className="max-w-7xl mx-auto py-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div className="flex justify-between" variants={itemVariants}>
          <h5>Just Sold in British Columbia</h5>
          <motion.div whileHover={{ x: 5 }}>
            <Link to="/" className="text-primary font-semibold hover:underline">
              See All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {data.slice(0, 4).map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
            >
              <Link to="/buyers/property-detail/123">
                <motion.div variants={cardVariants}>
                  <Card
                    className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full `}
                  >
                    <CardBody className="overflow-visible pb-2">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          alt="Card background"
                          className="object-cover"
                          src={Building}
                          width="100%"
                          height="100%"
                          style={{ borderRadius: "15px 15px 0 0" }}
                        />
                        {item.sold > 0 && (
                          <motion.span
                            className="absolute bottom-2 left-2 bg-[#FF6F1E] text-dark px-2 py-1 rounded-sm text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Sold
                          </motion.span>
                        )}
                      </motion.div>
                      {/* Rest of card content remains the same */}
                      <div className="flex flex-col gap-1 px-3 pt-2 px-2">
                        <div className="flex justify-between">
                          <span className="text-gray-800 text-sm">
                            Listed: <b>${item.price}</b>
                          </span>
                          <span className="text-gray-500 text-sm">
                            {item.minutes} minutes ago
                          </span>
                        </div>
                        <span className="text-gray-800 text-sm">
                          {item.address}
                        </span>
                        <div className="flex row gap-2 text-sm py-2">
                          <span className="flex row gap-2">
                            <IoBedSharp size={20} /> {item.bed}
                          </span>
                          <span className="flex row gap-2">
                            <FaBath size={16} /> {item.bath}
                          </span>
                          <span className="flex row gap-2">
                            <PiGarageFill size={20} /> {item.garage}
                          </span>
                        </div>
                      </div>
                      <div className="px-2">
                        <hr className="border-gray-400" />
                        <span className="text-gray-500 text-sm pt-2">
                          {item.des}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* nearby section */}
      <motion.div
        className="max-w-7xl mx-auto py-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div className="flex justify-between" variants={itemVariants}>
          <h5>Nearby</h5>
          <motion.div whileHover={{ x: 5 }}>
            <Link to="/" className="text-primary font-semibold hover:underline">
              See All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {data.slice(0, 4).map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
            >
              <Link to="/buyers/property-detail/123">
                <motion.div variants={cardVariants}>
                  <Card
                    className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full`}
                  >
                    <CardBody className="overflow-visible pb-2">
                      <motion.img
                        alt="Card background"
                        className="object-cover"
                        src={Building}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "15px 15px 0 0" }}
                      />

                      {/* Rest of card content remains the same */}
                      <div className="flex flex-col gap-1 px-3 pt-2 px-2">
                        <h2>{item.title}</h2>
                        <motion.button
                          type="submit"
                          className="flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>{" "}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Market Statistics
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Median Price Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Median Price
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  $1,234,000
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <FiTrendingUp size={16} />
                <span className="text-sm font-medium">+37%</span>
              </div>
            </div>
            <div className="h-32">
              <Chart
                options={priceChartOptions}
                series={priceChartSeries}
                type="line"
                height="100%"
              />
            </div>
          </div>

          {/* New Listings Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  New Listings
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">148</h3>
              </div>
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                <FiTrendingDown size={16} />
                <span className="text-sm font-medium">-20%</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-8">
              <div className="space-y-2">
                {[30, 45, 60, 40, 55, 70, 50].map((height, index) => (
                  <div
                    key={index}
                    className="w-6 bg-gradient-to-t from-red-400 to-red-300 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center">
                <p>Weekly</p>
                <p>Trend</p>
              </div>
            </div>
          </div>

          {/* Price Change Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Price Change
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">+37%</h3>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <FiTrendingUp size={16} />
                <span className="text-sm font-medium">↑</span>
              </div>
            </div>
            <div className="h-32">
              <Chart
                options={daysChartOptions}
                series={daysChartSeries}
                type="line"
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* Market Trends Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <FiTrendingDown className="text-red-500" />
              <span className="text-gray-700">~ -2.2%</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Month over Month</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <FiTrendingDown className="text-red-500" />
              <span className="text-gray-700">~ -20%</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Year over Year</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <FiTrendingUp className="text-green-500" />
              <span className="text-gray-700">~ +37%</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Price Appreciation</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Our Agent Team */}

        <div className="flex items-center flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A1
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Agent 1</h4>
            <div className="flex items-center gap-2 mt-1">
              <MdBusiness className="text-gray-600" size={16} />
              <span className="text-gray-600 text-sm">Broker</span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/buyers/agent-detail/agent1")}
          >
            View Details
          </motion.button>
        </div>
        <div className="flex items-center flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A1
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Agent 1</h4>
            <div className="flex items-center gap-2 mt-1">
              <MdBusiness className="text-gray-600" size={16} />
              <span className="text-gray-600 text-sm">Broker</span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/buyers/agent-detail/agent1")}

          >
            View Details
          </motion.button>
        </div>
        <div className="flex items-center flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A1
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Agent 1</h4>
            <div className="flex items-center gap-2 mt-1">
              <MdBusiness className="text-gray-600" size={16} />
              <span className="text-gray-600 text-sm">Broker</span>
            </div>
          </div>
          <motion.button
            type="submit"
            className=" w-full flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/buyers/agent-detail/agent1")}

          >
            View Details
          </motion.button>
        </div>
        <div className="flex items-center flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A1
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Agent 1</h4>
            <div className="flex items-center gap-2 mt-1">
              <MdBusiness className="text-gray-600" size={16} />
              <span className="text-gray-600 text-sm">Broker</span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/buyers/agent-detail/agent1")}

          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Mobile Home Button */}
      <div className="md:hidden mt-6">
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          <FiHome size={20} />
          <span>Home</span>
        </button>
      </div>

      {/* Sidebar - Personalized Listing */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Personalize Listing
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Price Range
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="$0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="$Max"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Property Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Property Type
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        propertyType.detached
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => handlePropertyTypeChange("detached")}
                    >
                      {propertyType.detached && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                    <span className="text-gray-700">Detached</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <span className="text-gray-700">Semi-Detached</span>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        propertyType.semiDetached
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => handlePropertyTypeChange("semiDetached")}
                    >
                      {propertyType.semiDetached && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        propertyType.freeholdTownhouse
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        handlePropertyTypeChange("freeholdTownhouse")
                      }
                    >
                      {propertyType.freeholdTownhouse && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                    <span className="text-gray-700">Freehold Townhouse</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <span className="text-gray-700">Condo Townhouse</span>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        propertyType.condoTownhouse
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => handlePropertyTypeChange("condoTownhouse")}
                    >
                      {propertyType.condoTownhouse && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Luxury House */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Luxury House
                </h3>
                <div
                  className={`w-10 h-5 rounded-full cursor-pointer transition-colors ${
                    luxuryHouse ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setLuxuryHouse(!luxuryHouse)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      luxuryHouse ? "translate-x-6" : "translate-x-1"
                    } mt-0.5`}
                  />
                </div>
              </div>

              {luxuryHouse && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="$1000000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={luxuryPrice.min}
                      onChange={(e) =>
                        setLuxuryPrice((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="$Max"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={luxuryPrice.max}
                      onChange={(e) =>
                        setLuxuryPrice((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* City Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">City</h3>

              {/* GTA-Central */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">GTA-Central</h4>
                  <button
                    onClick={() => selectAllCities("GTA-Central")}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cityOptions["GTA-Central"].map((city, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedCities["GTA-Central"]?.[city]
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleCityChange("GTA-Central", city)}
                      >
                        {selectedCities["GTA-Central"]?.[city] && (
                          <FiCheck className="text-white" size={12} />
                        )}
                      </div>
                      <span className="text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* GTA-North */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">GTA-North</h4>
                  <button
                    onClick={() => selectAllCities("GTA-North")}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cityOptions["GTA-North"].map((city, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedCities["GTA-North"]?.[city]
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleCityChange("GTA-North", city)}
                      >
                        {selectedCities["GTA-North"]?.[city] && (
                          <FiCheck className="text-white" size={12} />
                        )}
                      </div>
                      <span className="text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <button
              onClick={applyFilters}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
