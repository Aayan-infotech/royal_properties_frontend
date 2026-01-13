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
      console.log("Raw data from API:", data);
      // Filter out listings with invalid coordinates
      const validListings = data.filter(listing => {
        const isValid = listing.letLONG &&
          Array.isArray(listing.letLONG) &&
          listing.letLONG.length === 2 &&
          typeof listing.letLONG[0] === 'number' &&
          typeof listing.letLONG[1] === 'number';

        if (!isValid) {
          console.warn('Invalid listing coordinates:', listing);
        }
        return isValid;
      });

      console.log(`Valid listings: ${validListings.length} out of ${data.length}`);
      setRealEstateListings(validListings);
    });
  }, []);

  console.log("realEstateListings with coordinates:", realEstateListings.map(l => ({
    id: l.propertyId,
    coords: l.letLONG
  })));

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="advanced-marker-example" style={{ height: "100%" }}>
        <APIProvider apiKey={API_KEY} libraries={["marker"]}>
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={12}
            // defaultCenter={mapCenter}
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