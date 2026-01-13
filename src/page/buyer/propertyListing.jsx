import React from "react";
import { motion , AnimatePresence} from "framer-motion";
import { useNavigate , Link } from "react-router-dom";
import Building from "../../assets/building.png";
import { formatDate } from "../../utils/constant";
import axiosInstance from "../../component/axiosInstance";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";
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


export default function PropertyListing() {
    const [hoveredCard, setHoveredCard] = React.useState(null);
    const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
    const navigate = useNavigate();
    const handlePropertyClick = (property) => {
        console.log("button clicking", property);
        navigate(`/buyers/property-detail/${property._id}`, { state: { property } });
        // navigate(`/buyers/property-detail/${property.id}`, { state: { property } });
    };

    const getData = async (page) => {
        try {
            const response = await axiosInstance.get(
                `/properties/approved?page=${page}&limit=12`
            );
            setData(response.data.data.data);
            setPagination(response.data.data.pagination);
            setCurrentPage(page);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            getData(page);
        }
    };

    React.useEffect(() => {
        getData(1);
    }, []);
    return (
        <>

            <motion.div
                className="max-w-7xl mx-auto py-4"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <motion.div className="flex justify-between" variants={itemVariants}>
                    <h5>Featured Listing</h5>
                   
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
                                    className={`my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full cursor-pointer`}
                                >
                                    <CardBody
                                        className="overflow-visible pb-2"
                                        onClick={() => handlePropertyClick(item)}
                                    >
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.img
                                                alt="Card background"
                                                className="object-cover h-[200px]"
                                                src={item?.photos[0]?.url || Building}
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
                                            <span className="text-gray-800 text-sm">
                                                <b>{item?.property}</b>
                                            </span>
                                            <div className="flex justify-between">
                                                <span className="text-gray-800 text-sm">
                                                    Listed: <b>${item.price}</b>
                                                </span>
                                                <span className="text-gray-500 text-sm">
                                                    {formatDate(item.createdAt)}
                                                </span>
                                            </div>
                                            <span className="text-gray-800 text-sm truncate ">
                                                {item.address}
                                            </span>
                                            <div className="flex row gap-2 text-sm py-2">
                                                <span className="flex row gap-2">
                                                    <IoBedSharp size={20} /> {item?.details?.bedrooms}
                                                </span>
                                                <span className="flex row gap-2">
                                                    <FaBath size={16} /> {item?.details?.fullBathrooms}
                                                </span>
                                                <span className="flex row gap-2">
                                                    <PiGarageFill size={20} /> {item?.keyFacts?.parking}
                                                </span>
                                            </div>
                                        </div>

                                        <motion.div
                                            className="px-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >

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
        </>
    )
}