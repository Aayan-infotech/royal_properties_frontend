import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import ControlPanel from "./control-panel";
import { CustomAdvancedMarker } from "./marker/marker";
import { loadRealEstateListing } from "./lib/listing";
import axiosInstance from "../../component/axiosInstance";

import "./style.css";

const API_KEY = "AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c";

const Mapper = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);

  const loadMapData = async () => {
    try {
      const response = await axiosInstance.get(`/map/properties`);
      return response?.data?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    loadMapData().then((data) => {
      setRealEstateListings(data);
    });
  }, []);

  // Calculate center based on first listing or use default
  const mapCenter = realEstateListings.length > 0 && realEstateListings[0].letLONG
    ? { lat: realEstateListings[0].letLONG[0], lng: realEstateListings[0].letLONG[1] }
    : { lat: 19.1367, lng: 72.8265 }; // Mumbai coordinates as default

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="advanced-marker-example" style={{ height: "100%" }}>
        <APIProvider apiKey={API_KEY} libraries={["marker"]}>
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={12}
            defaultCenter={mapCenter}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {realEstateListings.map((listing) => (
              <CustomAdvancedMarker
                key={listing.propertyId}
                realEstateListing={listing}
              />
            ))}
          </Map>
          <ControlPanel />
        </APIProvider>
      </div>
    </div>
  );
};

export default Mapper;