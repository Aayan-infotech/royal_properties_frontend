import React, { useState } from "react";

export default function MarketTrends() {
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [partialBedrooms, setPartialBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(1);
  const [garage, setGarage] = useState(0);
  const [squareFootage, setSquareFootage] = useState(499);
  const [propertyTax, setPropertyTax] = useState(0);
  const [propertyType, setPropertyType] = useState("Condo Apt");
  const [lotWidth, setLotWidth] = useState(0);
  const [lotDepth, setLotDepth] = useState(0);

  const increment = (setter, currentValue) => setter(currentValue + 1);
  const decrement = (setter, currentValue) =>
    setter(Math.max(0, currentValue - 1));

  const renderCounter = (label, value, setter, showPlus = true) => (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-600 mb-1">{label}</span>
      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
        <button
          className="w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => decrement(setter, value)}
        >
          -
        </button>
        <span className="w-12 text-center font-medium">{value}</span>
        <button
          className="w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 rounded"
          onClick={() => increment(setter, value)}
        >
          +
        </button>
      </div>
    </div>
  );

  const handleNumericInput = (value, setter, min = 0) => {
    // Remove non-numeric characters except digits
    const numericValue = value.replace(/[^\d]/g, "");
    const parsed = numericValue === "" ? 0 : parseInt(numericValue, 10);
    setter(Math.max(min, parsed));
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderInput = (label, value, setter, unit = "", type = "text") => (
    <div className="flex flex-col">
      <span className="text-sm text-gray-600 mb-1">{label}</span>
      <div className="flex items-center bg-white border border-gray-300 rounded-lg w-full">
        <input
          type="text"
          value={type === "number" ? formatNumber(value) : value}
          onChange={(e) => {
            if (type === "number") {
              handleNumericInput(
                e.target.value,
                setter,
                label === "Square Footage" ? 100 : 0
              );
            } else {
              setter(e.target.value);
            }
          }}
          className="flex-1 px-3 py-2 outline-none w-[calc(100%-32px)]"
          placeholder={type === "number" ? "0" : ""}
        />
        {unit && (
          <span className="px-3 py-2 bg-gray-50 text-gray-600 border-l border-gray-300 text-sm">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Market Trends</h1>
      <p className="text-gray-600 mb-8">
        Analyze current market trends and insights to make informed decisions.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Home Details
          </h1>
          <p className="text-gray-600 mb-8">
            Please enter your property address
          </p>

          {renderInput("Address", address, setAddress, "", "text")}

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 mb-8">
            {renderCounter("Bedroom", bedrooms, setBedrooms)}
            {renderCounter(
              "Partial Bedroom",
              partialBedrooms,
              setPartialBedrooms
            )}
            {renderCounter("Bathroom", bathrooms, setBathrooms)}
            {renderCounter("Garage", garage, setGarage, false)}
          </div>

          {/* Property Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {renderInput(
              "Square Footage",
              squareFootage,
              setSquareFootage,
              "sqft",
              "number"
            )}
            {renderInput(
              "Property Tax",
              propertyTax,
              setPropertyTax,
              "per year",
              "number"
            )}
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 mb-1">Property Type</span>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none"
              >
                <option>Condo Apt</option>
                <option>Detached House</option>
                <option>Semi-Detached</option>
                <option>Townhouse</option>
                <option>Condo Townhouse</option>
              </select>
            </div>
          </div>

          {/* Lot Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {renderInput(
              "Lot Width (front)",
              lotWidth,
              setLotWidth,
              "feet",
              "number"
            )}
            {renderInput("Lot Depth", lotDepth, setLotDepth, "feet", "number")}
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#3B5999] hover:bg-[#3b5999a8] text-white font-medium py-3 rounded-md transition-colors">
            Get Estimate
          </button>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-500 py-2 ">
                Schedule Viewing
              </h3>
              <div>
                <p className="text-xs text-gray-700">
                  Tour with Royal Property Agent
                </p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="I want to book an appointment to view: [R3067039], 1525 Errigal Place, West Vancouver"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  defaultValue="I want to book an appointment to view: [R3067039], 1525 Errigal Place, West Vancouver"
                />
              </div>

              <div className="text-xs text-gray-600">
                <span className="text-red-500">*</span> Required field
              </div>

              <div className="text-xs text-gray-600 leading-relaxed">
                By submitting this form, I understand Royal Property will share
                my information with registered real estate professionals.
              </div>

              <button
                type="submit"
                className="w-full bg-[#3B5999] hover:bg-[#3b5999a8] text-white font-medium py-3 rounded-md transition-colors"
              >
                Schedule Viewing
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
