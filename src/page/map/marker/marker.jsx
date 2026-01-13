import React, { useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import classNames from "classnames";

import { RealEstateListingDetails } from "../detail/detail";
import { RealEstateGallery } from "../gallery/gallery";
import axiosInstance from "../../../component/axiosInstance";

import "./marker.css";

export const CustomAdvancedMarker = ({ realEstateListing }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add safety check for letLONG
  if (!realEstateListing?.letLONG ) {
    console.warn('Invalid coordinates for listing:', realEstateListing);
    return null;
  }
console.log(realEstateListing , "realEstateListing")
  const position = {
    lat: realEstateListing.letLONG[0],
    lng: realEstateListing.letLONG[1],
  };

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/map/property-by-location', {
        propertyId: realEstateListing.propertyId,
        letLONG: realEstateListing.letLONG
      });

      // Extract the data from the response
      const data = response?.data?.data;
      setPropertyDetails(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = () => {
    if (!clicked) {
      fetchPropertyDetails();
    }
    setClicked(!clicked);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setClicked(false);
    setPropertyDetails(null);
  };

  const renderCustomPin = () => {
    return (
      <>
        <div className="custom-pin">
          {clicked && (
            <button className="close-button" onClick={handleClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          )}

          {clicked && (
            <>
              {loading ? (
                <div className="loading-container">
                  <p>Loading property details...</p>
                </div>
              ) : propertyDetails ? (
                <>
                  <div className="image-container">
                    <RealEstateGallery
                      images={propertyDetails.photos || []}
                      isExtended={clicked}
                    />
                  </div>

                  <RealEstateListingDetails details={propertyDetails} />
                </>
              ) : (
                <div className="placeholder-container">
                  <p>No details available</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="tip" />
      </>
    );
  };

  return (
    <AdvancedMarker
      position={position}
      title={"AdvancedMarker with custom html content."}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames("real-estate-marker", { clicked, hovered })}
      onClick={handleMarkerClick}
    >
      {renderCustomPin()}
    </AdvancedMarker>
  );
};