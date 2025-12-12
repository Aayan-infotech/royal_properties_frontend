import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaChartLine,
  FaBook,
  FaEnvelope,
  FaRegClock,
  FaHome,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import Property from "../assets/property1.png";
import { LuCalendarDays } from "react-icons/lu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title:
        "Downtown Miami: Exploring the Best Neighborhoods for Young Professionals",
      date: "January 6, 2025",
      readTime: "6 minutes",
      excerpt:
        "Innovacy with downtown Miami is in charge for young professionals. From the start we get to a compelling spouse and business opportunities, both at real areas. This once the perfect place to take work, and thanks to a competitive market share value, they are also a trusted designer who will not relegate into 2025 market trends. Learn about pricing, shifts, neighborhoods, and key strategies for make informed decisions, whether you're buying, selling, or investing this year.",
    },
    {
      id: 2,
      title: "Top 5 Tips for Buying Your Dream Home in 2025",
      date: "January 6, 2025",
      readTime: "9 minutes",
      icon: <FaHome className="text-blue-600" />,
    },
    {
      id: 3,
      title: "2025 Real Estate Trends: What Buyers and Sellers Need to Know",
      date: "January 6, 2025",
      readTime: "9 minutes",
      icon: <FaArrowTrendUp className="text-green-600" />,
    },
    {
      id: 4,
      title:
        "The Ultimate Guide to Understanding Real Estate Market Cycles in 2025",
      date: "January 6, 2025",
      readTime: "9 minutes",
      icon: <FaChartLine className="text-purple-600" />,
    },
  ];

  const featuredPosts = blogPosts.slice(1); // All except the first one

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
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      rotate: 45,
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const infoItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
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

  return (
    <motion.div
      className="min-h-screen py-12 px-4 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-bold mb-10" variants={titleVariants}>
        Your Go-To Source for
        <motion.span
          className="text-[#3B5999] italic"
          animate={{
            color: ["#3B5999", "#4A6FDC", "#3B5999"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {" "}
          Real Estate Knowledge{" "}
        </motion.span>
      </motion.h1>

      <motion.div variants={sectionVariants}>
        <Link to={`/blog/1`} className="flex flex-col md:flex-row gap-6 mt-5">
          {/* Image */}
          <motion.div className="w-full md:w-1/2" variants={imageVariants}>
            <motion.img
              src={Property}
              alt="House"
              className="w-full h-64 md:h-80 object-cover rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col gap-3 justify-between"
            variants={itemVariants}
          >
            <div className="">
              <motion.h2
                className="text-xl md:text-2xl font-semibold leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Downtown Miami: Exploring the Best Neighborhoods for Young
                Professionals
              </motion.h2>

              <motion.p
                className="text-gray-700 text-sm leading-relaxed"
                variants={paragraphVariants}
              >
                Discover why downtown Miami is a hotspot for young
                professionals. From vibrant nightlife to coworking spaces and
                luxurious apartments, learn what makes this area the perfect
                place to live, work, and thrive in a competitive real estate
                market. Learn about pricing shifts, emerging neighborhoods, and
                key strategies to make informed decisions in 2025.
              </motion.p>
            </div>

            {/* Footer row */}
            <motion.div
              className="flex items-center gap-6 text-gray-600 text-sm mb-2"
              variants={containerVariants}
            >
              <motion.span
                className="flex items-center gap-2"
                variants={infoItemVariants}
                whileHover="hover"
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCalendarAlt />
                </motion.span>
                January 5, 2025
              </motion.span>

              <motion.span
                className="flex items-center gap-2"
                variants={infoItemVariants}
                whileHover="hover"
              >
                <motion.span
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaRegClock />
                </motion.span>
                6 minutes
              </motion.span>

              <motion.span
                className="ml-auto text-xl cursor-pointer hover:text-gray-800 transition"
                variants={iconVariants}
                whileHover="hover"
              >
                <GoArrowUpRight />
              </motion.span>
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto py-8 mt-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <Link to={`/blog/${post.id}`}>
              <motion.div
                key={post.id}
                className="bg-[#e9f0ff] rounded-xl shadow-sm hover:shadow-md transition"
                variants={gridItemVariants}
                custom={index}
                whileHover="hover"
                initial="initial"
              >
                <motion.div variants={cardVariants}>
                  {/* Image */}
                  <motion.img
                    src={Property}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                    alt={post.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="p-4">
                    <motion.h3
                      className="text-lg font-semibold mb-2 leading-snug"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {post.title}
                    </motion.h3>

                    {/* Footer */}
                    <motion.div
                      className="flex items-center justify-between text-gray-600 text-sm mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-6">
                        <motion.span
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.span
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <LuCalendarDays />
                          </motion.span>
                          {post.date}
                        </motion.span>

                        <motion.span
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.span
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                          >
                            <FaRegClock />
                          </motion.span>
                          {post.readTime}
                        </motion.span>
                      </div>

                      <motion.span
                        whileHover={{
                          rotate: 45,
                          scale: 1.3,
                          color: "#3B5999",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <GoArrowUpRight className="text-lg cursor-pointer hover:text-gray-900" />
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Blogs;
