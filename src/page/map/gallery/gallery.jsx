import React, { useState } from 'react';
import './gallery.css';

export const RealEstateGallery = ({ images = [], isExtended = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle both array of strings and array of objects with url property
  const getImageUrl = (image) => {
    if (typeof image === 'string') {
      return image;
    }
    return image?.url || '';
  };

  const imageUrls = images.map(img => getImageUrl(img)).filter(url => url);

  const handleBack = (event) => {
    event.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = (event) => {
    event.stopPropagation();
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  if (imageUrls.length === 0) {
    return (
      <div className={`photo-gallery ${isExtended ? 'extended' : ''}`}>
        <div className="no-image">No images available</div>
      </div>
    );
  }

  return (
    <div className={`photo-gallery ${isExtended ? 'extended' : ''}`}>
      <img src={imageUrls[currentImageIndex]} alt="Real estate listing photo" />

      {imageUrls.length > 1 && (
        <div className="gallery-navigation">
          <div className="nav-buttons">
            <button
              onClick={handleBack}
              disabled={currentImageIndex === 0}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentImageIndex === imageUrls.length - 1}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="indicators">
            {imageUrls.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};