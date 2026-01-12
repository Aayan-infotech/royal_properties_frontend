import React, { useEffect, useContext, useRef, useState } from "react"
import axiosInstance from "../../component/axiosInstance"
import { formatPrice, formatDate } from "../../utils/constant"
import { AlertContext } from "../../context/alertContext"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { useConfirmation } from "../../hooks/useConfirmation"
import ConfirmationModal from "../../component/cancelModal"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function WatchList() {
    const { success, error } = useContext(AlertContext)
    const [watchlistItems, setWatchlistItems] = React.useState([])
    const swiperRefs = useRef({})
    const [isLoading, setIsLoading] = useState(false)

    const {
        confirmationState,
        showConfirmation,
        hideConfirmation
    } = useConfirmation()
    const handleResponse = async () => {
        try {
            const response = await axiosInstance.get(`/buyer/watchlist`)
            if (response) {
                setWatchlistItems(response.data.data)
                success(response.data.message)
            }
        } catch (err) {
            error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        handleResponse()
    }, [])

    const handleRemoveFromWatchlist = async (item) => {
        try {
            const response = await axiosInstance.delete(`/buyer/watchlist/${item?._id}`)
            if (response) {
                success(response.data.message)
                handleResponse()
                hideConfirmation()
            }
        } catch (err) {
            error(err?.response?.data?.message)
        }
    }

    const showRemoveConfirmation = (item) => {
        showConfirmation({
            title: "Remove from Watchlist?",
            message: `Are you sure you want to remove "${item.propertyId.property}" from your watchlist?`,
            itemDetails: {
                property: item.propertyId.property,
                price: formatPrice(item.propertyId.price),
                address: item.propertyId.address,
                added: formatDate(item.createdAt)
            },
            apiEndpoint: `/buyer/watchlist/${item._id}`,
            itemId: item._id,
            onConfirm: () => handleRemoveFromWatchlist(item)
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Watchlist</h1>
                        <p className="text-gray-600 mt-2">Properties you've saved for later</p>
                    </div>

                </div>
            </div>

            {/* Watchlist Grid */}
            <div className="max-w-7xl mx-auto">
                {watchlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties saved yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto">Start browsing properties and add them to your watchlist</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {watchlistItems.map((item) => {
                            const property = item.propertyId
                            const photos = property.photos || []

                            return (
                                <div
                                    key={item._id}
                                    className=" group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 pb-4 "
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-5">
                                        {/* Swiper Image Carousel */}
                                        <div className="lg:col-span-2 relative max-h-[350px] overflow-hidden">
                                            {photos.length > 0 ? (
                                                <>
                                                    <Swiper
                                                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                                        spaceBetween={0}
                                                        slidesPerView={1}
                                                        navigation={{
                                                            nextEl: `.swiper-button-next-${item._id}`,
                                                            prevEl: `.swiper-button-prev-${item._id}`,
                                                        }}
                                                        pagination={{
                                                            clickable: true,
                                                            dynamicBullets: true,
                                                        }}
                                                        autoplay={{
                                                            delay: 5000,
                                                            disableOnInteraction: false,
                                                        }}
                                                        effect="fade"
                                                        className="h-full w-full"
                                                        onSwiper={(swiper) => {
                                                            swiperRefs.current[item._id] = swiper
                                                        }}
                                                    >
                                                        {photos.map((photo, index) => (
                                                            <SwiperSlide key={photo._id || index}>
                                                                <div className="relative h-full w-full">
                                                                    <img
                                                                        src={photo.url}
                                                                        alt={`${property.property} - ${index + 1}`}
                                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                                        loading="lazy"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>

                                                    {/* Custom Navigation Buttons */}
                                                    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button className={`swiper-button-prev-${item._id} w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110`}>
                                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button className={`swiper-button-next-${item._id} w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110`}>
                                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Image Counter */}
                                                    {photos.length > 1 && (
                                                        <div className="absolute top-4 right-4 z-10">
                                                            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-full flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                                </svg>
                                                                {photos.length} Photos
                                                            </span>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-gray-500 font-medium">No Images Available</span>
                                                    </div>
                                                </div>
                                            )}


                                        </div>

                                        {/* Property Details */}
                                        <div className="p-6 md:p-8 lg:col-span-3">
                                            {/* Title and Price */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 pr-4">{property.property}</h3>
                                                    <div className="text-right">
                                                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                            {formatPrice(property.price)}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {property.keyFacts.pricePerSqft}/sqft
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="line-clamp-1">{property.address}</span>
                                                </div>
                                            </div>

                                            {/* Key Facts Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-2">
                                                <div className="border border-gray-200 p-4 rounded-xl">
                                                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Type</div>
                                                    <div className="font-bold text-gray-900">{property.keyFacts.propertyType}</div>
                                                </div>
                                                <div className="border border-gray-200 p-4 rounded-xl">
                                                    <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Size</div>
                                                    <div className="font-bold text-gray-900">{property.keyFacts.size} sqft</div>
                                                </div>
                                                <div className="border border-gray-200 p-4 rounded-xl">
                                                    <div className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-1">Year Built</div>
                                                    <div className="font-bold text-gray-900">{property.keyFacts.yearBuilt}</div>
                                                </div>
                                                <div className="border border-gray-200 p-4 rounded-xl">
                                                    <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Parking</div>
                                                    <div className="font-bold text-gray-900">{property.keyFacts.parking} spots</div>
                                                </div>
                                            </div>

                                            {/* Footer Actions */}

                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-200 px-2">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm">Added {formatDate(item.createdAt)}</span>
                                                </div>
                                                {property.keyFacts.lotSize && (
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                        </svg>
                                                        <span className="text-sm">{property.keyFacts.lotSize} acre lot</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => showRemoveConfirmation(item)}
                                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-2 hover:border-red-300 hover:text-red-600"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove
                                                </button>
                                                <button className="flex-none rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">

                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={confirmationState.isOpen}
                onClose={hideConfirmation}
                onConfirm={confirmationState.onConfirm}
                title={confirmationState.title}
                message={confirmationState.message}
                itemDetails={confirmationState.itemDetails}
                confirmText="Yes, Remove"
                cancelText="Cancel"
                confirmColor="bg-red-600 hover:bg-red-700"
                isLoading={isLoading}
            />
        </div>
    )
}