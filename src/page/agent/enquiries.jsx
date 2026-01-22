import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../component/axiosInstance";
import { motion } from "framer-motion";
import { formatDate } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import Building from "../../assets/building.png";
import CardLoader from "../../loaders/cardLoader";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/button";
import {
    FiSearch,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiCheck,
} from "react-icons/fi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Enquiries() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });
    const [enquiryType, setEnquiryType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openEnquiry, setOpenEnquiry] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [status, setStatus] = useState("");
    const [resolutionNote, setResolutionNote] = useState("");

    const statusOptions = [
        { value: "open", label: "Open" },
        { value: "in_progress", label: "In Progress" },
        { value: "resolved", label: "Resolved" },
        { value: "closed", label: "Closed" },
    ];

    const fetchClients = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `/enquiries/agent?page=${page}&limit=10`
            );
            console.log("Clients response:", response.data?.data?.items);
            setData(response.data?.data?.items || []);
            setPagination(response.data?.data?.pagination || {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 1,
            });
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchClients(page);
        }
    };

  

    const openUpdateModal = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setStatus(enquiry.status || "");
        setResolutionNote(enquiry.resolutionNote || "");
        setOpenEnquiry(true);
    };

    const EnquiryModal = ({ open, onClose }) => {
        const modalRef = useRef(null);

          const updateEnquiryStatus = async (enquiryId) => {
        if (!status.trim()) {
            alert("Please select a status");
            return;
        }

        setUpdatingId(enquiryId);
        try {
            const response = await axiosInstance.patch(
                `/enquiries/agent/${enquiryId}/status`,
                {
                    status: status,
                    resolutionNote: resolutionNote || "",
                }
            );

            if (response.data?.success) {
                // Update the local state
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === enquiryId
                            ? { ...item, status: status, isResolved: status === "resolved" }
                            : item
                    )
                );
                setOpenEnquiry(false);
                setSelectedEnquiry(null);
                setStatus("");
                setResolutionNote("");
                alert("Enquiry status updated successfully!");
            }
        } catch (error) {
            console.error("Error updating enquiry:", error);
            alert("Failed to update enquiry status");
        } finally {
            setUpdatingId(null);
        }
    };

        // Handle click outside to close
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onClose();
                }
            };

            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [open, onClose]);

        if (!open || !selectedEnquiry) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
                {/* Backdrop with proper click handling */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />

                {/* Modal content */}
                <motion.div
                    // ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white w-full sm:max-w-[600px] rounded-t-2xl sm:rounded-2xl p-6 m-auto mx-2"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Update Enquiry Status
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 text-2xl hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Enquiry
                            </label>
                            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                                <p className="text-gray-800">
                                    <strong>Property:</strong> {selectedEnquiry?.propertyId?.property}
                                </p>
                                <p className="text-gray-800">
                                    <strong>From:</strong> {selectedEnquiry?.buyerId?.name}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Type:</strong> {selectedEnquiry?.enquiryType}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#132141] focus:border-transparent"
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resolution Note (Optional)
                            </label>
                            <textarea
                                value={resolutionNote}
                                onChange={(e) => setResolutionNote(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#132141] focus:border-transparent"
                                rows="3"
                                placeholder="Add any notes about the resolution..."
                            />
                        </div>

                        <div className="flex flex-row gap-3 pt-4">
                            <Button
                                onClick={onClose}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => updateEnquiryStatus(selectedEnquiry._id)}
                                disabled={updatingId === selectedEnquiry._id}
                                className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updatingId === selectedEnquiry._id ? "Updating..." : "Update Status"}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

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

    const handlePropertyClick = (property) => {
        if (property?._id) {
            navigate(`/agents/property-detail/${property._id}`, {
                state: { property },
            });
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Enquiries
                    </h1>

                    {loading && data.length === 0 ? (
                        <CardLoader count={4} />
                    ) : data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No enquiries found</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.map((item, index) => (
                                <motion.div
                                    key={item._id || index}
                                    className="relative"
                                    variants={itemVariants}
                                    whileHover="hover"
                                    initial="initial"
                                >
                                    <motion.div variants={cardVariants}>
                                        <Card className="my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full">
                                            <CardBody className="overflow-visible pb-2">
                                                <motion.div
                                                    className="relative"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.img
                                                        alt="Card background"
                                                        className="object-cover h-[200px] w-full"
                                                        src={
                                                            item?.propertyId?.images?.[0] ||
                                                            item?.propertyId?.image ||
                                                            Building
                                                        }
                                                        style={{ borderRadius: "15px 15px 0 0" }}
                                                    />

                                                    <motion.span
                                                        className={`absolute bottom-2 left-2 px-2 py-1 rounded-sm text-sm ${item.status === "resolved"
                                                            ? "bg-green-500 text-white"
                                                            : item.status === "in_progress"
                                                                ? "bg-yellow-500 text-white"
                                                                : item.status === "closed"
                                                                    ? "bg-gray-500 text-white"
                                                                    : "bg-[#FF6F1E] text-dark"
                                                            }`}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        {item.status?.replace("_", " ") || "Open"}
                                                    </motion.span>
                                                </motion.div>

                                                <div className="flex flex-col gap-1 px-3 pt-2">
                                                    <span className="text-gray-800 text-sm">
                                                        <b>{item?.propertyId?.property || "Property"}</b>
                                                    </span>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-800 text-sm">
                                                            Listed:{" "}
                                                            <b>${item?.propertyId?.price?.toLocaleString() || "N/A"}</b>
                                                        </span>
                                                        <span className="text-gray-500 text-sm">
                                                            {formatDate(item.createdAt)}
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-800 text-sm truncate">
                                                        {item?.propertyId?.address || "Address not available"}
                                                    </span>
                                                    <div className="flex row gap-2 text-sm py-2">
                                                        <img
                                                            src={
                                                                item?.buyerId?.profileImage ||
                                                                "https://imgs.search.brave.com/k3xl25-f80cwvl7DLZm0qrcfYg9YCq_-EPtqakgyxCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTY5/NTcwMTQvcGhvdG8v/cHJvZmlsZS1vZi1l/bGRlcmx5LW1hbi1z/aXR0aW5nLWF0LXRh/YmxlLXR5cGluZy1v/bi1sYXB0b3AuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVl6/dE03RWgzZjJJVVR6/aTFKcHFTMTFNWFM0/T3djd09pb2dIdzcy/clJ5Z1E9"
                                                            }
                                                            alt="Buyer"
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <span className="text-gray-800 text-sm">
                                                                <b>
                                                                    {(item?.buyerId?.name || "Unknown").toUpperCase()}
                                                                </b>
                                                                {item.isResolved || item.status === "resolved" ? (
                                                                    <span className="text-green-500 text-sm ml-2">
                                                                        ✓ Resolved
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-red-500 text-sm ml-2">
                                                                        ● Pending
                                                                    </span>
                                                                )}
                                                            </span>
                                                            <div className="text-gray-500 text-sm">
                                                                {item?.enquiryType || "General Enquiry"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                                <div className="flex flex-row gap-2 w-full mt-4">
                                                    <button
                                                        onClick={() => openUpdateModal(item)}
                                                        disabled={loading}
                                                        className="w-full mb-4 rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Update Enquiry
                                                    </button>
                                                    <button
                                                        onClick={() => handlePropertyClick(item?.propertyId)}
                                                        disabled={loading}
                                                        className="w-full mb-4 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            <EnquiryModal
                open={openEnquiry}
                onClose={() => {
                    setOpenEnquiry(false);
                    setSelectedEnquiry(null);
                    setStatus("");
                    setResolutionNote("");
                }}
            />

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
                            } else if (page === currentPage - 2 || page === currentPage + 2) {
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
                        {pagination.total} enquiries
                    </div>
                </motion.div>
            )}
        </>
    );
}