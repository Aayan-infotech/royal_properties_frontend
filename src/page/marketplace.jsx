import React from "react";
import banner from "../assets/banner.jpg";
import { Input } from "@heroui/react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/react";
import { Image } from "@heroui/image";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { PiGarageFill } from "react-icons/pi";

export default function Marketplace() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <img src={banner} alt="Banner" className="w-full mb-8 rounded-xl" />
        <div className="text-section space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Explore a Home</h1>
          <h3 className="text-2xl font-semibold text-gray-700">Your Unique Vision</h3>
          <p className="text-gray-600 text-lg">
            Browse 22 years of sales history.
            <br />
            Watch new listings, get notified when they're sold.
          </p>
          <Input
            type="text"
            placeholder="Address, Street Name or Listings"
            variant="bordered"
            className="mt-4"
          />
        </div>
      </div>

      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Listing</h2>
          <Link
            to="/search"
            className="text-blue-600 font-semibold hover:underline"
          >
            See All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card className="py-4 shadow-lg">
            <CardBody className="overflow-visible py-2 space-y-3">
              <Image
                alt="Property"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width="100%"
                height="200"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">
                    Listed: <b>$499,800</b>
                  </span>
                  <span className="text-gray-500">25 minutes ago</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  1601 - 6 Eva Road, Etobicoke
                </span>
                <span className="text-gray-600 text-sm">
                  Etobicoke West Mall
                </span>
                <div className="flex gap-4 text-sm py-2">
                  <span className="flex items-center gap-1 text-gray-700">
                    <IoBedSharp size={18} /> 1 + 1
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <FaBath size={16} /> 1
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <PiGarageFill size={18} /> 1
                  </span>
                </div>
              </div>
              <hr />
              <span className="text-gray-500 text-xs">
                W12535498, RIGHT AT HOME REALTY
              </span>
            </CardBody>
          </Card>

          <Card className="py-4 shadow-lg">
            <CardBody className="overflow-visible py-2 space-y-3">
              <Image
                alt="Property"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width="100%"
                height="200"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">
                    Listed: <b>$650,000</b>
                  </span>
                  <span className="text-gray-500">1 hour ago</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  456 King Street West, Toronto
                </span>
                <span className="text-gray-600 text-sm">
                  Downtown Toronto
                </span>
                <div className="flex gap-4 text-sm py-2">
                  <span className="flex items-center gap-1 text-gray-700">
                    <IoBedSharp size={18} /> 2 + 1
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <FaBath size={16} /> 2
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <PiGarageFill size={18} /> 2
                  </span>
                </div>
              </div>
              <hr />
              <span className="text-gray-500 text-xs">
                W12535499, ROYAL PROPERTIES
              </span>
            </CardBody>
          </Card>

          <Card className="py-4 shadow-lg">
            <CardBody className="overflow-visible py-2 space-y-3">
              <Image
                alt="Property"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width="100%"
                height="200"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">
                    Listed: <b>$549,900</b>
                  </span>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  789 Yonge Street, North York
                </span>
                <span className="text-gray-600 text-sm">
                  Willowdale
                </span>
                <div className="flex gap-4 text-sm py-2">
                  <span className="flex items-center gap-1 text-gray-700">
                    <IoBedSharp size={18} /> 3
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <FaBath size={16} /> 2
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <PiGarageFill size={18} /> 1
                  </span>
                </div>
              </div>
              <hr />
              <span className="text-gray-500 text-xs">
                W12535500, HOME FINDERS REALTY
              </span>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
