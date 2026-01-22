import React, { useState, useEffect, use } from "react"
import axiosInstance from "../../component/axiosInstance"
import { motion } from "framer-motion"
import { formatDate } from "../../utils/constant"
import { useNavigate } from "react-router-dom"
import Building from "../../assets/building.png";
import CardLoader from "../../loaders/cardLoader"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
export default function ClientManagement() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [pagination, setPagination] = React.useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });
    const [currentPage, setCurrentPage] = React.useState(1);



    const fetchClients = async (page = 1) => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/enquiries/agent?page=${page}&limit=10`)
            console.log("Clients response:", response.data?.data?.items)
            setData(response.data?.data?.items)
            setPagination(response.data?.data?.pagination)
        } catch (error) {
            console.error("Error fetching clients:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchClients(page);
        }
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

    const handlePropertyClick = (property) => {
        console.log("button clicking", property);
        navigate(`/agents/property-detail/${property._id}`, { state: { property } });
    };


    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Client Management</h1>
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        variants={containerVariants}
                    >
                        {loading && <CardLoader count={4} />}
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                variants={itemVariants}
                                whileHover="hover"
                                initial="initial"
                            >
                                <motion.div variants={cardVariants}>
                                    <Card
                                        className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full `}
                                    >
                                        <CardBody className="overflow-visible pb-2" onClick={() => handlePropertyClick(item?.propertyId)}>
                                            <motion.div
                                                className="relative"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.img
                                                    alt="Card background"
                                                    className="object-cover h-[200px]"
                                                    src={Building}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ borderRadius: "15px 15px 0 0" }}
                                                />

                                                <motion.span
                                                    className="absolute bottom-2 left-2 bg-[#FF6F1E] text-dark px-2 py-1 rounded-sm text-sm"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {item.status}
                                                </motion.span>

                                            </motion.div>
                                            {/* Rest of card content remains the same */}
                                            <div className="flex flex-col gap-1 px-3 pt-2 px-2">
                                                <span className="text-gray-800 text-sm">
                                                    <b>{item?.propertyId?.property}</b>
                                                </span>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-800 text-sm">
                                                        Listed: <b>${item?.propertyId?.price}</b>
                                                    </span>
                                                    <span className="text-gray-500 text-sm">
                                                        {formatDate(item.createdAt)}
                                                    </span>
                                                </div>
                                                <span className="text-gray-800 text-sm truncate ">
                                                    {item?.propertyId?.address}
                                                </span>
                                                <div className="flex row gap-2 text-sm py-2">
                                                    <img src="https://imgs.search.brave.com/k3xl25-f80cwvl7DLZm0qrcfYg9YCq_-EPtqakgyxCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTY5/NTcwMTQvcGhvdG8v/cHJvZmlsZS1vZi1l/bGRlcmx5LW1hbi1z/aXR0aW5nLWF0LXRh/YmxlLXR5cGluZy1v/bi1sYXB0b3AuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVl6/dE03RWgzZjJJVVR6/aTFKcHFTMTFNWFM0/T3djd09pb2dIdzcy/clJ5Z1E9"
                                                        alt="image" className="h-10 w-10 rounded-full object-cover" />
                                                    <div className="">
                                                        <span className="text-gray-800 text-sm">
                                                            <b>{(item?.buyerId?.name).toUpperCase()} {item?.isResolved ? <span className="text-green-500 text-sm">Resolved</span> : <span className="text-red-500 text-sm">Pending</span>}</b>
                                                        </span>
                                                        <div className="text-gray-500 text-sm">
                                                            {item?.enquiryType}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-2">
                                                {/* <hr className="border-gray-400" /> */}
                                                <span className="text-gray-500 text-sm pt-2">
                                                    {item.des}
                                                </span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

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
        </>
    )
}