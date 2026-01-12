import React from 'react';
// import {getFormattedCurrency} from '../../../libs/format-currency';
// import {FloorplanIcon} from '../../../icons/floor-plan-icon';
// import {BathroomIcon} from '../../../icons/bathroom-icon';
// import {BedroomIcon} from '../../../icons/bedroom-icon';

import './detail.css';

export const RealEstateListingDetails = ({ details }) => {
  // Handle both the old structure and new API response structure
  const property = details?.property || details?.listing_title || 'Property';
  const address = details?.address || details?.property_address || '';
  const price = details?.price || details?.property_price || 0;
  const bedrooms = details?.property_bedrooms || '';
  const bathrooms = details?.property_bathrooms || '';
  const squareFeet = details?.property_square_feet || '';
  const description = details?.listing_description || '';

  // Format price to Indian currency
  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="details-container">
      <div className="listing-content">
        <h2>{property}</h2>
        <p>{address}</p>

        {(bedrooms || bathrooms || squareFeet) && (
          <div className="details">
            {squareFeet && (
              <div className="detail_item">
                {/* <FloorplanIcon /> */}
                {squareFeet.replace ? squareFeet.replace('sq ft', 'ft²') : squareFeet}
              </div>
            )}
            {bathrooms && (
              <div className="detail_item">
                {/* <BathroomIcon /> */}
                {bathrooms}
              </div>
            )}
            {bedrooms && (
              <div className="detail_item">
                {/* <BedroomIcon /> */}
                {bedrooms}
              </div>
            )}
          </div>
        )}

        {description && <p className="description">{description}</p>}

        {price > 0 && <p className="price">{formatPrice(price)}</p>}
      </div>
    </div>
  );
}; 