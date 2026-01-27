import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {ClusteredPropertyMarkers} from './clusterd-tree-markers.jsx';
import {
    FiSearch,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiCheck,
} from "react-icons/fi";
const API_KEY = "AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c";
import { formatDate, NearbyPlace, locationOptions, PriceOptions, HomeOptions, SaleOptions, PropertyOptions } from "../../utils/constant";

// PropertyMarker Component
const PropertyMarker = ({ property, onClick, setMarkerRef }) => {
    const handleClick = useCallback(() => onClick(property), [onClick, property]);
    const ref = useCallback(
        (marker) => setMarkerRef(marker, property.key),
        [setMarkerRef, property.key]
    );

    return (
        <AdvancedMarker position={property.location} ref={ref} onClick={handleClick}>
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                {property.propertyCount}
            </div>
        </AdvancedMarker>
    );
};

// Autocomplete Input Component
function AutocompleteInput({ searchQuery, setSearchQuery, onSearch }) {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const placesLib = useMapsLibrary('places');

    useEffect(() => {
        if (!placesLib || !inputRef.current) return;

        if (autocompleteRef.current) {
            google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }

        autocompleteRef.current = new placesLib.Autocomplete(inputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: "in" },
            fields: ['formatted_address', 'geometry', 'name', 'place_id']
        });

        const listener = autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();

            if (!place.geometry) {
                return;
            }

            const address = place.formatted_address || place.name || "";
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

// Map Content Component
function MapContent() {
    const [properties, setProperties] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState("Select Property");
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPrice, setSelectedPrice] = useState("Select Price");
    const [selectedHome, setSelectedHome] = useState("Select Home");
    const [selectedSale, setSelectedSale] = useState("Select Sale");
    const [openEnquiry, setOpenEnquiry] = useState(false);
    const [loading, setLoading] = useState(false);

    const [mapPosition, setMapPosition] = useState({
        lat: 26.8467,
        lng: 80.9462,
        zoom: 10
    });

    const map = useMap();
    const debounceTimer = useRef(null);

    const fetchProperties = useCallback(async (lat, lng, zoom) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://44.195.249.112:7878/map/properties?lat=${lat}&lon=${lng}&zoom=${zoom}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTVkZWZhNmI5NDk0NGFjNTEzNmMzYTMiLCJlbWFpbCI6ImRha3NoLmt1bWFyQGFheWFuaW5mb3RlY2guY29tIiwicm9sZSI6ImFnZW50IiwiaWF0IjoxNzY5MDc5MjAwLCJleHAiOjE3NjkxNjU2MDB9.nx8HPifNCRH-pIy7mpfge8LpTMLNAeuoV4R76t73ebY'
                    }
                }
            );

            const result = await response.json();

            if (result.success && result.data?.data) {
                const transformedData = result.data.data
                    .filter(item => item.location.lat !== null && item.location.lon !== null)
                    .map((item, index) => ({
                        key: `property-${index}`,
                        location: {
                            lat: Number(item.location.lon),
                            lng: Number(item.location.lat)
                        },
                        propertyCount: item.propertyCount
                    }));

                console.log('Transformed properties:', transformedData);
                setProperties(transformedData);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties(mapPosition.lat, mapPosition.lng, mapPosition.zoom);
    }, []);

    useEffect(() => {
        if (!map) return;

        const listener = map.addListener('idle', () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            debounceTimer.current = setTimeout(() => {
                const center = map.getCenter();
                const zoom = map.getZoom();

                if (center) {
                    const newPosition = {
                        lat: center.lat(),
                        lng: center.lng(),
                        zoom: zoom
                    };

                    setMapPosition(newPosition);
                    fetchProperties(newPosition.lat, newPosition.lng, newPosition.zoom);
                }
            }, 500);
        });

        return () => {
            if (listener) {
                google.maps.event.removeListener(listener);
            }
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [map, fetchProperties]);

    const handleSearch = useCallback(async () => {
        await fetchProperties(mapPosition.lat, mapPosition.lng, mapPosition.zoom);
    }, [fetchProperties, mapPosition]);

    const handleClear = () => {
        setSelectedLocation("Select Property");
        setSearchQuery('');
        setSelectedPrice("Select Price");
        setSelectedHome("Select Home");
        setSelectedSale("Select Sale");
    };

    const EnquiryModal = ({ open, onClose }) => {
        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center overflow-y-auto">
                <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                <div className="relative bg-white w-full sm:max-w-[800px] rounded-t-2xl sm:rounded-2xl p-6 m-auto mx-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Search</h2>
                        <button onClick={onClose} className="text-gray-400 text-2xl hover:text-gray-600">×</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-14 gap-4 items-center">
                        <div className="col-span-2 lg:col-span-2">
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PropertyOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 lg:col-span-3 text-sm">
                            <AutocompleteInput
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                onSearch={handleSearch}
                            />
                        </div>

                        <div className="col-span-2 lg:col-span-2">
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PriceOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedHome}
                                onChange={(e) => setSelectedHome(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {HomeOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedSale}
                                onChange={(e) => setSelectedSale(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {SaleOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 lg:col-span-3">
                            <div className="flex flex-row gap-3 w-full">
                                <button
                                    onClick={handleClear}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleSearch}
                                    className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-white p-3 hidden md:block relative">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-14 gap-4 items-center">
                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PropertyOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3 text-sm">
                            <AutocompleteInput
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                onSearch={handleSearch}
                            />
                        </div>

                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {PriceOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedHome}
                                onChange={(e) => setSelectedHome(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {HomeOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-1 lg:col-span-2">
                            <select
                                value={selectedSale}
                                onChange={(e) => setSelectedSale(e.target.value)}
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {SaleOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <button
                                    onClick={handleClear}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Loading...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute end-0 bottom-60 md:hidden z-10">
                <button
                    onClick={() => setOpenEnquiry(true)}
                    className="m-4 inline-flex items-center justify-center px-4 py-3 bg-[#132141] hover:bg-[#0f1a35] text-white font-semibold rounded-lg transition-colors duration-200"
                >
                    <FiSearch size={20} />
                </button>
            </div>

            <EnquiryModal open={openEnquiry} onClose={() => setOpenEnquiry(false)} />

            <Map
                style={{ width: '100%', height: 'calc(100vh - 100px)' }}
                mapId="bf51a910020fa25a"
                defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
                defaultZoom={mapPosition.zoom}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={false}
            >
                {properties && <ClusteredPropertyMarkers properties={properties} />}
            </Map>
        </>
    );
}

export default function PropertyMap() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <APIProvider apiKey={API_KEY}>
                <MapContent />
            </APIProvider>
        </div>
    );
}