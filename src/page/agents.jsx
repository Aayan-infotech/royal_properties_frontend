import React from "react";
import { Link } from "react-router-dom";
import { MdBusiness } from "react-icons/md";
import { motion } from "framer-motion";

export default function Agents() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Agents</h1>
      <p className="text-gray-600 mb-8">
        Meet our experienced and certified real estate agents.
      </p>
      <div className="grid lg:grid-cols-4 gap-4">
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
          >
            View Details
          </motion.button>
        </div>
      </div>
    </div>
  );
}
