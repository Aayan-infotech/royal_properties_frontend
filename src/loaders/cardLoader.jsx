import React from 'react';

export default function CardLoader({ count = 1, className }) {

    const loaders = Array.from({ length: count });

    return (
        <>
            {loaders.map((_, index) => (
                <div
                    key={index}
                    className={`relative animate-pulse ${className}`}
                >
                    {/* Main Card Container */}
                    <div className="my-4 rounded-[15px] shadow-lg bg-[#E9F6F7] w-full cursor-pointer">
                        <div className="overflow-visible pb-2">
                            {/* Image loader */}
                            <div className="relative">
                                <div
                                    className="w-full h-48 bg-[#6b686940] rounded-[15px_15px_0_0]"
                                />
                                {/* For Sale/Sold badge loader */}
                                <div className="absolute bottom-2 left-2">
                                    <div className="w-16 h-6 bg-[#6b686940] rounded-sm"></div>
                                </div>
                            </div>

                            {/* Content section */}
                            <div className="flex flex-col gap-3 px-3 pt-4">
                                {/* Property title loader */}
                                <div className="h-4 bg-[#6b686940] rounded w-3/4"></div>

                                {/* Price and date loader */}
                                <div className="flex justify-between">
                                    <div className="h-4 bg-[#6b686940] rounded w-1/3"></div>
                                    <div className="h-4 bg-[#6b686940] rounded w-1/4"></div>
                                </div>

                                {/* Address loader */}
                                <div className="h-3 bg-[#6b686940] rounded w-full"></div>
                                <div className="h-3 bg-[#6b686940] rounded w-2/3"></div>

                                {/* Features loader (bed, bath, garage) */}
                                <div className="flex gap-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-[#6b686940] rounded"></div>
                                        <div className="w-6 h-4 bg-[#6b686940] rounded"></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-[#6b686940] rounded"></div>
                                        <div className="w-6 h-4 bg-[#6b686940] rounded"></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-[#6b686940] rounded"></div>
                                        <div className="w-6 h-4 bg-[#6b686940] rounded"></div>
                                    </div>
                                </div>

                                {/* Description loader */}
                                <div className="px-2 pt-2">
                                    <div className="h-3 bg-[#6b686940] rounded w-full mb-2"></div>
                                    <div className="h-3 bg-[#6b686940] rounded w-4/5 mb-2"></div>
                                    <div className="h-3 bg-[#6b686940] rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

