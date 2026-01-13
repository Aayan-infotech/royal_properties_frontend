import React, { useState, useEffect } from "react";
import axiosInstance from "../../component/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { motion } from "framer-motion";
import {
  MdAdd,
  MdFilterList,
  MdKeyboardArrowDown,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { FaHome, FaChartLine, FaCalendarCheck } from "react-icons/fa";
export default function AgentProperty() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [pagination, setPagination] = React.useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleResponse = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/properties/AgentProperties`);
      setData(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };


  const handleAddProperty = () => {
    navigate("/sellers/property-listing");
  };

  const handleViewDetails = (propertyId) => {
    // You can replace this with your navigation logic
    navigate(`/agents/property-detail/${propertyId}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      handleResponse(page);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get status text based on property status
  const getStatusText = (property) => {
    if (property.propertyBLOCK) return "Blocked";
    if (property.soldOut) return "Sold";
    if (property.isApprovalByAdmin === "approved") return "Active";
    if (property.isApprovalByAdmin === "approval") return "Pending";
    return "Inactive";
  };

  // Get status color
  const getStatusColor = (property) => {
    if (property.propertyBLOCK) return "bg-red-500";
    if (property.soldOut) return "bg-purple-500";
    if (property.isApprovalByAdmin === "approved") return "bg-green-500";
    if (property.isApprovalByAdmin === "approval") return "bg-yellow-500";
    return "bg-gray-500";
  };

  // Get status description
  const getStatusDescription = (property) => {
    if (property.propertyBLOCK) return "Blocked • Not available";
    if (property.soldOut) return "Sold • Property sold";
    if (property.isApprovalByAdmin === "approved")
      return "Active • Ready to move";
    if (property.isApprovalByAdmin === "approval")
      return "Pending • Under review";
    return "Inactive • Not available";
  };

  useEffect(() => {
    handleResponse(1);
  }, []);

  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Properties Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            {/* Image Skeleton */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaHome className="w-12 h-12 text-gray-300" />
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-20 h-7 bg-gray-300 rounded-lg"></div>
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-7 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center mt-8 gap-2 flex-col">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="mt-2">
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? <LoadingSkeleton /> :
              <>
                {
                  data.map((property, index) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      {/* Property Image */}
                      <div className="relative h-56 w-full overflow-hidden">
                        {property.photos && property.photos.length > 0 ? (
                          <img
                            src={property?.photos[0]?.url}
                            alt={property.property}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <FaHome className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full shadow-md">
                            {property.keyFacts?.size || "N/A"}
                          </span>
                        </div>

                        {/* Property Type */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
                            {property.keyFacts?.propertyType || "Property"}
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                              {property.property}
                            </h3>
                            <span className="text-lg font-bold text-blue-600">
                              {formatPrice(property.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <span className="text-sm">{property.address}</span>
                          </div>

                          {/* Status Indicator */}
                          <div className="flex items-center gap-2 mb-4">
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
                                property
                              )}`}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {getStatusDescription(property)}
                            </span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="text-gray-600">
                            <span className="font-medium">Bedrooms:</span>{" "}
                            {property?.details?.bedrooms || "N/A"}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Bathrooms:</span>{" "}
                            {property?.details?.fullBathrooms || "N/A"}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Year Built:</span>{" "}
                            {property?.keyFacts?.yearBuilt || "N/A"}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Parking:</span>{" "}
                            {property?.keyFacts?.parking || "N/A"}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetails(property._id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#132141] text-white font-semibold rounded-lg transition-all duration-200 group"
                          >
                            <span>View Details</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                }
              </>
            }

          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mt-8 gap-2 flex-col"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                    }`}
                >
                  <MdChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages around current page
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium ${currentPage === page
                          ? "bg-[#132141] text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${currentPage === pagination.totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                    }`}
                >
                  <MdChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="ml-4 text-sm text-gray-600">
                Showing {(currentPage - 1) * pagination.limit + 1} -{" "}
                {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
                {pagination.total} properties
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {data.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <FaHome className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first property to get started
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
