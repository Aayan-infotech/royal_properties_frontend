import React from "react";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  FaStar,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaCheck,
  FaHome,
  FaUsers,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const EnquiryModal = ({ open, onClose }) => {
  if (!open) return null;
  const [selectedType, setSelectedType] = useState("General Inquiry");
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
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Send Enquiry</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl">
            ×
          </button>
        </div>

        {/* Enquiry Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Enquiry Type</label>
          <div className="grid grid-cols-4 gap-3">
            {[
              "General Inquiry",
              "Schedule Viewing",
              "Price Information",
              "Request Callback",
            ].map((type, i) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`border rounded-full py-2 text-sm transition
          ${
            selectedType === type
              ? "bg-[#132141] text-white "
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
             <div className="mb-2">
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-2 border rounded-lg px-3 py-2 outline-none  border-gray-500"
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-2 border rounded-lg px-3 py-2 outline-none  border-gray-500"
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 border rounded-lg px-3 py-2 outline-none border-gray-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full mt-2 border rounded-lg px-3 py-2 outline-none  border-gray-500"
            />
          </div>

          {/* Message */}
          <div className="mb-4 col-span-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full mt-2 border rounded-lg px-3 py-2 outline-none resize-none  border-gray-500"
            />
          </div>
        </div>
        {/* Full Name */}

        {/* Submit */}
        <button className="w-full bg-[#3b5c9c] text-white py-3 rounded-lg font-semibold">
          Send Enquiry
        </button>
      </motion.div>
    </div>
  );
};

const AgentProfile = () => {
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const agentData = {
    name: "John Smith",
    title: "Senior Real Estate Agent",
    company: "Royal Properties",
    rating: 4.9,
    reviews: 128,
    stats: [
      { label: "Sold", value: "156", icon: <FaCheck /> },
      { label: "Listed", value: "24", icon: <FaHome /> },
      { label: "Years", value: "15+", icon: <FaChartLine /> },
    ],
    about:
      "John Smith is a highly experienced real estate agent with over 15 years in the industry. Specializing in luxury properties and first-time home buyers, John has helped hundreds of families find their dream homes.",
    specializations: [
      "Luxury Homes",
      "First-Time Buyers",
      "Investment Properties",
    ],
    serviceAreas: ["Toronto", "Mississauga", "Vaughan", "Markham"],
    recentListings: [
      {
        name: "Modern Villa",
        price: "$1.2M",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      },
      {
        name: "Downtown Condo",
        price: "$580K",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      },
      {
        name: "Family House",
        price: "$890K",
        image: "https://images.unsplash.com/photo-1572120360610-d971b9b63902",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* PAGE TITLE */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800"
          variants={itemVariants}
        >
          Agent Profile
        </motion.h1>

        {/* AGENT CARD */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT */}
            <div className="flex gap-6 flex-1">
              <div className="w-80 h-30 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                JS
              </div>

              <div>
                <h2 className="text-2xl font-bold">{agentData.name}</h2>
                <p className="text-gray-600">{agentData.title}</p>
                <p className="text-blue-600 font-semibold mb-3">
                  {agentData.company}
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(agentData.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 font-bold">{agentData.rating}</span>
                  <span className="text-gray-600">({agentData.reviews})</span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {agentData.about}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4 w-full lg:w-80">
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg">
                  <FaPhone /> Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg">
                  <FaCommentDots /> Message
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded-lg">
                <FaEnvelope /> Email
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#132141] text-white py-3 rounded-lg font-semibold"
                onClick={() => setOpenEnquiry(true)}
              >
                Contact Agent
              </motion.button>

              <div className="grid grid-cols-3 gap-3 pt-4">
                {agentData.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-lg text-center p-3"
                  >
                    <div className="text-xl font-bold text-blue-700">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SPECIALIZATION + SERVICE AREA */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4">Specializations</h3>
            <div className="space-y-3">
              {agentData.specializations.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  {i === 0 && <FaHome />}
                  {i === 1 && <FaUsers />}
                  {i === 2 && <FaChartLine />}
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4">Service Areas</h3>
            <div className="grid grid-cols-2 gap-3">
              {agentData.serviceAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <FaMapMarkerAlt className="text-blue-600" />
                  {area}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RECENT LISTINGS GRID */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Recent Listings</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentData.recentListings.map((listing, i) => (
              <Link to="/buyers/property-detail/1">
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden shadow-md group"
                >
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                    <h4 className="text-white font-bold text-lg">
                      {listing.name}
                    </h4>
                    <p className="text-white font-semibold">{listing.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <EnquiryModal open={openEnquiry} onClose={() => setOpenEnquiry(false)} />
    </div>
  );
};

export default AgentProfile;
