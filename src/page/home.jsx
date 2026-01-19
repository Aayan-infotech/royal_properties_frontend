import React, { useState, useRef, useEffect } from "react";
import banner from "../assets/banner.jpg";
import { Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Image } from "@heroui/image";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
import Building from "../assets/building.png";
import data from "../data/home.json";
import Chart from "react-apexcharts";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { NearbyPlace } from '../utils/constant';
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const API_KEY = "AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c";
  const addressInputRef = React.useRef(null);
  const autocompleteRef = React.useRef(null);
  const navigate = useNavigate()

  const handleSearch = (query, location = null) => {
    console.log("Searching for:", query);
    
      navigate(`/property-listing?address=${encodeURIComponent(query)}`);
    
    // Add your search navigation logic here
    // For example: navigate to search results page
    // 
  };
  const initAutocomplete = () => {
    if (!inputRef.current || !window.google) {
      console.log("Google Maps not loaded or input ref not available");
      return;
    }

    // Clear any existing autocomplete instance
    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    // Initialize autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode", "establishment"],
        componentRestrictions: { country: "in" }, // Change to "ca" for Canada
      }
    );

    // Add listener for place selection
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      // Update search query with selected address
      const address = place.formatted_address || place.name || "";
      setSearchQuery(address);

      console.log("Selected place:", {
        address: address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      // You can add your search logic here
      // handleSearch(address, {
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // });
    });
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        initAutocomplete();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (existingScript) {
        existingScript.addEventListener("load", initAutocomplete);
        return;
      }

      // Create and load the script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // handleSearch(searchQuery);
    }
  };



  const series = [
    {
      name: "Institute Score",
      type: "area",
      data: [
        90.744, 89.5, 91.2, 90.744, 92.1, 89.8, 90.744, 91.5, 90.2, 90.744,
      ],
    },
    {
      name: "Trend Line",
      type: "line",
      data: [90, 90.2, 90.5, 90.7, 90.9, 91.1, 91.3, 91.4, 91.5, 91.6],
    },
    {
      name: "Target",
      type: "line",
      data: [92, 92, 92, 92, 92, 92, 92, 92, 92, 92],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 3, 3],
      dashArray: [0, 0, 5],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: [5, 0, 0],
    },
    colors: ["#4CAF50", "#2196F3", "#FF9800"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      title: {
        text: "Months",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#263238",
        },
      },
    },
    yaxis: {
      title: {
        text: "Score",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#263238",
        },
      },
      min: 88,
      max: 94,
    },
    title: {
      text: "Institute Performance Dashboard",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    subtitle: {
      text: "Current Score: 90.744 | Last Updated: 10:00",
      align: "center",
      style: {
        fontSize: "12px",
        color: "#666",
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value) {
          return value.toFixed(3);
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: 90.744,
          borderColor: "#4CAF50",
          label: {
            text: "Current (90.744)",
            style: {
              color: "#fff",
              background: "#4CAF50",
            },
          },
        },
      ],
    },
  };

  const citiesData = {
    Ontario: [
      "Toronto",
      "Mississauga",
      "North York",
      "Brampton",
      "Scarborough",
      "Vaughan",
      "Barrie",
      "Oakville",
      "Markham",
      "London",
    ],
    "British Columbia": [
      "Vancouver",
      "Surrey",
      "Burnaby",
      "Richmond",
      "Langley",
      "Kelowna",
      "Coquitlam",
      "North Vancouver",
      "Abbotsford",
      "Abbotsford",
    ],
    Alberta: [
      "Calgary",
      "Edmonton",
      "Airdrie",
      "Red Deer",
      "Lethbridge",
      "Grande Prairie",
      "St. Albert",
      "Sherwood Park",
      "Fort McMurray",
      "Fort McMurray",
    ],
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
        type: "spring",
        stiffness: 100,
        damping: 12,
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

  const bannerVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  const cityCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSearch();
  //   }
  // };

  // const handleSearch = () => {
  //   console.log("Searching for:", searchQuery);
  //   // Add your search navigation logic here
  //   // For example: navigate to search results page
  //   // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  // };

  return (
    // <APIProvider apiKey={API_KEY}>
    <div className="max-w-7xl mx-auto lg:px-6 lg:pt-12">
      <motion.div
        className="dark-bg"
        variants={bannerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.img
          src={banner}
          alt="Banner"
          className="w-full mb-8 lg:rounded-xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="text-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h1
            className="heading-outline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Explore a Home
          </motion.h1>
          <motion.h3
            className="heading-sub"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your Unique Vision
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Browse 22 years of sales history.
            <br />
            Watch new listings, get notified when they're sold.
          </motion.p>
          <motion.div
            className="relative mt-3 w-full"
            style={{ maxWidth: "600px" }}
            variants={itemVariants}
          >
            {/* <AutocompleteSearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
              /> */}
            {/* Replace the existing search input section with this code */}
            <motion.div
              className="relative mt-3 w-full flex flex-row gap-2"
              style={{ maxWidth: "600px" }}
              variants={itemVariants}
            >
              <motion.div className="relative w-full">
                <motion.input
                  type="text"
                  ref={inputRef}
                  placeholder="Search properties, areas, or keywords..."
                  className="w-full max-h-[42px] flex-auto rounded-md bg-white px-3.5 border-0 pl-10 py-2 text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
                <FaSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={20}

                />
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="submit"
                  className="flex-none rounded-md bg-[#132141] lg:min-w-[120px] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!searchQuery}
                  onClick={() => handleSearch(searchQuery)}
                >
                  Search
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Featured Listing Section */}
      <motion.div
        className="max-w-7xl mx-auto py-4 px-3 lg:px-0"
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
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
                  className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full ${item?.login && `blur-[1.5px]`
                    }`}
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
                        1045678, Century 21{" "}
                      </span>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
              {item?.login && (
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
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Just Sold in British Columbia Section */}
      <motion.div
        className="max-w-7xl mx-auto py-4 px-3 lg:px-0"
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
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
              <motion.div variants={cardVariants}>
                <Card
                  className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full ${item?.login && `blur-[1.5px]`
                    }`}
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
                        1045678, Century 21
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
              {item?.login && (
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
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Just Sold in Alberta */}
      <motion.div
        className="max-w-7xl mx-auto py-4 px-3 lg:px-0"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div className="flex justify-between" variants={itemVariants}>
          <h5>Just Sold in Alberta</h5>
          <motion.div whileHover={{ x: 5 }}>
            <Link to="/" className="text-primary font-semibold hover:underline">
              See All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" variants={containerVariants}
        >
          {data.slice(0, 4).map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
            >
              <motion.div variants={cardVariants}>
                <Card
                  className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full ${item?.login && `blur-[1.5px]`
                    }`}
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
                        1045678, Century 21{" "}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
              {item?.login && (
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
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>


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
            <Link to="/category-listing" className="text-primary font-semibold hover:underline">
              See All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {Object.entries(NearbyPlace)
            .slice(0, 4)
            .map(([key, item], index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
              >
                <Link to={`/property-listing?nearbyPlaces=${item.label}`}>
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
                          <h2 className="text-gray-800 text-md text-center">{item.label}</h2>
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
      {/* Chart Section */}
      <motion.div
        className="my-3 mb-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={itemVariants}>
          <h2
            className="text-xl font-bold"
            style={{ color: "#2c3e50", marginBottom: "5px" }}
          >
            Vancouver Statistics *(All property types)
          </h2>
        </motion.div>

        <motion.div variants={chartVariants}>
          <Chart options={options} series={series} type="line" height={450} />
        </motion.div>

        <motion.div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
            fontSize: "14px",
            color: "#555",
          }}
          variants={itemVariants}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {[
              { color: "#4CAF50", label: "Institute Score (Area)" },
              { color: "#2196F3", label: "Trend Line" },
              { color: "#FF9800", label: "Target (92.0)", dash: true },
              { color: "#4CAF50", label: "Current: 90.744", circle: true },
            ].map((item, index) => (
              <motion.div
                key={index}
                style={{ display: "flex", alignItems: "center", margin: "5px" }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  style={{
                    width: "12px",
                    height: item.circle ? "12px" : "3px",
                    backgroundColor: item.color,
                    borderRadius: item.circle ? "50%" : "2px",
                    marginRight: "8px",
                    borderBottom: item.dash ? "2px dashed #FF9800" : "none",
                  }}
                ></div>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Cities Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h3
          className="text-2xl font-semibold text-gray-900 mb-2 text-center"
          variants={itemVariants}
        >
          Homes for Sale in Popular Cities
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(citiesData).map(([province, cities], index) => (
            <motion.div
              key={province}
              variants={cityCardVariants}
              custom={index}
              whileHover={{ y: -5 }}
            >
              <motion.div className="px-6 pt-6" whileHover={{ x: 5 }}>
                <h2 className="text-lg font-medium text-black">{province}</h2>
              </motion.div>

              <div className="p-6">
                <ul className="space-y-3">
                  {cities.map((city, cityIndex) => (
                    <motion.li
                      key={cityIndex}
                      className="flex items-center"
                      variants={listItemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <a
                        href={`#${city.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-700 hover:text-blue-600 hover:font-medium transition-colors duration-200 text-sm"
                      >
                        Homes for Sale in {city}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    // </APIProvider>
  );
}
