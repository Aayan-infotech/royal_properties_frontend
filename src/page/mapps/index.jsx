import React, { useEffect, useState, useMemo, useRef } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { getCategories, loadTreeDataset } from './trees';
import { ClusteredTreeMarkers } from './clusterd-tree-markers';
import { formatDate, NearbyPlace, locationOptions, PriceOptions, HomeOptions, SaleOptions, PropertyOptions } from "../../utils/constant";
import { RiFilter3Line } from "react-icons/ri";
import { Button } from '@heroui/button';
import { FaSearch } from "react-icons/fa";
import {
    FiSearch,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiCheck,
} from "react-icons/fi";
import axiosInstance from '../../component/axiosInstance';
import { motion } from 'framer-motion';

const API_KEY = "AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c";

function AutocompleteInput({ searchQuery, setSearchQuery, onSearch }) {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const placesLib = useMapsLibrary('places');

    useEffect(() => {
        if (!placesLib || !inputRef.current) return;

        // Clear any existing autocomplete
        if (autocompleteRef.current) {
            google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }

        // Create autocomplete
        autocompleteRef.current = new placesLib.Autocomplete(inputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: "in" },
            fields: ['formatted_address', 'geometry', 'name', 'place_id']
        });

        // Listen for place selection
        const listener = autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();

            if (!place.geometry) {
                console.log("No details available for input");
                return;
            }

            const address = place.formatted_address || place.name || "";
            // setSelectedLocation(address);
            setSearchQuery(address);
        });

        return () => {
            if (listener) {
                google.maps.event.removeListener(listener);
            }
        };
    }, [placesLib, setSearchQuery]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative w-full border border-gray-300 rounded-xl">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search properties, areas, or keywords..."
                    className="w-full bg-white rounded-xl px-4 py-2 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoComplete="off"
                />
                <FiSearch
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    size={20}
                    onClick={onSearch}
                />
            </div>
        </div>
    );
}

function MapContent() {
    const [trees, setTrees] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState("select location");
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPrice, setSelectedPrice] = useState("Select Price");
    const [selectedHome, setSelectedHome] = useState("Select Home");
    const [selectedSale, setSelectedSale] = useState("Select Sale");
    const [openEnquiry, setOpenEnquiry] = useState(false);

    useEffect(() => {
        loadTreeDataset().then(data => setTrees(data));
    }, []);

    const categories = useMemo(() => getCategories(trees), [trees]);
    const filteredTrees = useMemo(() => {
        if (!trees) return null;
        return trees.filter(t => !selectedCategory || t.category === selectedCategory);
    }, [trees, selectedCategory]);

    const handleSearch = () => {
        console.log("Searching for:", searchQuery, "in", selectedLocation);
        // Implement search logic here
    };

    const EnquiryModal = ({ open, onClose, agentId }) => {

        const [localLoading, setLocalLoading] = useState(false);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                {/* Modal */}
                <motion.div
                    // initial={{ y: 100, opacity: 0 }}
                    // animate={{ y: 0, opacity: 1 }}
                    // exit={{ y: 100, opacity: 0 }}
                    className="relative bg-white w-full sm:max-w-[800px] rounded-t-2xl sm:rounded-2xl p-6 m-auto mx-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Search</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 text-2xl hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-14 gap-4 items-center">
                        {/* Location Dropdown */}
                        <div className="col-span-2 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document
                                            .getElementById("location-dropdown-mobile")
                                            .classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedLocation}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="location-dropdown-mobile"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {PropertyOptions.map((location, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedLocation(location);
                                                document
                                                    .getElementById("location-dropdown-mobile")
                                                    .classList.add("hidden");
                                            }}
                                        >
                                            {location}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Search Box with Autocomplete */}
                        <div className="col-span-2 lg:col-span-3 text-sm">
                            <AutocompleteInput
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                // setSelectedLocation={setSelectedLocation}
                                onSearch={handleSearch}
                            />
                        </div>

                        {/* Price Dropdown */}
                        <div className="col-span-2 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document
                                            .getElementById("price-dropdown-mobile")
                                            .classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedPrice}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="price-dropdown-mobile"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {PriceOptions.map((price, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedPrice(price);
                                                document.getElementById("price-dropdown-mobile").classList.add("hidden");
                                            }}
                                        >
                                            {price}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Home Type Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document.getElementById("home-dropdown-mobile").classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedHome}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="home-dropdown-mobile"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {HomeOptions.map((home, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedHome(home);
                                                document.getElementById("home-dropdown-mobile").classList.add("hidden");
                                            }}
                                        >
                                            {home}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sale Type Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document.getElementById("sale-dropdown-mobile").classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedSale}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="sale-dropdown-mobile"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {SaleOptions.map((sale, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedSale(sale);
                                                document.getElementById("sale-dropdown-mobile").classList.add("hidden");
                                            }}
                                        >
                                            {sale}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="col-span-2 lg:col-span-3">
                            <div className="flex flex-row gap-3 w-full">
                                <Button
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Clear
                                </Button>
                                <Button
                                    onClick={handleSearch}
                                    className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-white p-3 hidden md:block relative ">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-14 gap-4 items-center">
                        {/* Location Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document
                                            .getElementById("location-dropdown")
                                            .classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedLocation}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="location-dropdown"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {PropertyOptions.map((location, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
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
                        </div>

                        {/* Search Box with Autocomplete */}
                        <div className="md:col-span-2 lg:col-span-3 text-sm">
                            <AutocompleteInput
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                // setSelectedLocation={setSelectedLocation}
                                onSearch={handleSearch}
                            />
                        </div>

                        {/* Price Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document
                                            .getElementById("price-dropdown")
                                            .classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedPrice}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="price-dropdown"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {PriceOptions.map((price, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedPrice(price);
                                                document.getElementById("price-dropdown").classList.add("hidden");
                                            }}
                                        >
                                            {price}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Home Type Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document.getElementById("home-dropdown").classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedHome}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="home-dropdown"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {HomeOptions.map((home, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedHome(home);
                                                document.getElementById("home-dropdown").classList.add("hidden");
                                            }}
                                        >
                                            {home}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sale Type Dropdown */}
                        <div className="md:col-span-1 lg:col-span-2">
                            <div className="relative w-full">
                                <div
                                    className="border border-gray-300 flex items-center justify-between bg-white rounded-xl px-4 py-2 cursor-pointer w-full"
                                    onClick={() =>
                                        document.getElementById("sale-dropdown").classList.toggle("hidden")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-800 font-medium truncate text-sm">
                                            {selectedSale}
                                        </span>
                                    </div>
                                    <FiChevronDown className="text-gray-600 flex-shrink-0" />
                                </div>

                                <div
                                    id="sale-dropdown"
                                    className="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                                >
                                    {SaleOptions.map((sale, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                            onClick={() => {
                                                setSelectedSale(sale);
                                                document.getElementById("sale-dropdown").classList.add("hidden");
                                            }}
                                        >
                                            {sale}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <Button
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Clear
                                </Button>
                                <Button
                                    onClick={handleSearch}
                                    className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute end-0 bottom-60 md:hidden z-1">
                <Button
                    onClick={() => setOpenEnquiry(true)}
                    className="m-4 inline-flex items-center justify-center px-4 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200"
                >
                    <FaSearch />
                </Button>
            </div>

            <EnquiryModal
                open={openEnquiry}
                onClose={() => setOpenEnquiry(false)}

            />

            <Map
                style={{ width: '100%', height: 'calc(100vh - 100px)' }}
                mapId="bf51a910020fa25a"
                defaultCenter={{ lat: 43.64, lng: -79.41 }}
                defaultZoom={10}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={false}
            >
                {filteredTrees && <ClusteredTreeMarkers trees={filteredTrees} />}
            </Map>

        </>
    );
}

export default function Mapps() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <APIProvider apiKey={API_KEY}>
                <MapContent />
            </APIProvider>
        </div>
    );
}