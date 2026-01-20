import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react"
import { NearbyPlace, userType } from "../../utils/constant"
import Building from "../../assets/building.png";

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
export default function CategoryListing() {
    return (
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
                    <Link to="/buyers/property-listing" className="text-primary font-semibold hover:underline">
                        See All
                    </Link>
                </motion.div>
            </motion.div>
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={containerVariants}
            >
                {Object.entries(NearbyPlace).map(([key, item], index) => (
                    <motion.div
                        key={index}
                        className="relative"
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                    >
                        <Link to={userType ? `/${userType}/property-listing?nearbyPlaces=${item.label}` : `/property-listing?nearbyPlaces=${item.label}`}>
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
                    </motion.div >
                ))
                }
            </motion.div >
        </motion.div >
    )
}