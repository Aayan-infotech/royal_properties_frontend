import React, { useState, useCallback, useMemo, useContext, useEffect } from "react";
import {
  MdApartment,
  MdHome,
  MdLocationCity,
  MdHouse,
  MdLandscape,
  MdUpload,
  MdClose,
  MdDragIndicator,
  MdAdd,
  MdRemove,
  MdSchool,
  MdLocalHospital,
  MdLocalGroceryStore,
  MdShoppingCart,
  MdPark,
  MdDirectionsBus,
  MdTrain,
  MdDirectionsRailway,
  MdFlight,
  MdAccountBalance,
  MdAtm,
  MdRestaurant,
  MdHotel,
  MdLocalGasStation,
  MdTempleHindu,
  MdMosque,
  MdChurch
} from "react-icons/md";
import axiosInstance from "../../component/axiosInstance";
import { useAlert } from "../../hooks/useApiAlert";
import { AlertContext } from "../../context/alertContext";
import { useNavigate } from "react-router-dom";

const InputField = React.memo(
  ({
    label,
    className,
    placeholder,
    value,
    onChange,
    type = "text",
    required = false,
    prefix = null,
    inputRef = null,  // Add this line
  }) => (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          ref={inputRef}  // Add this line
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${prefix ? "pl-8" : "pl-4"
            } pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
          required={required}
        />
      </div>
    </div>
  )
);

const SelectField = React.memo(
  ({ label, value, onChange, options, required = false }) => (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
);

const StepIndicator = React.memo(({ currentStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-600">Step {currentStep + 1} of 3</span>
    </div>
    <div className="flex gap-1">
      {[0, 1, 2].map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-full transition-colors ${step <= currentStep ? "bg-blue-900" : "bg-gray-300"
            }`}
        />
      ))}
    </div>
  </div>
));

const PropertyListingForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { success, error, info, warning } = useContext(AlertContext);
  const { handleApiError, handleApiSuccess, wrapApiCall } = useAlert();
  const addressInputRef = React.useRef(null);
  const autocompleteRef = React.useRef(null);
  const [propertyId, setPropertyId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [formData, setFormData] = useState({
    sellerId: "",
    property: "",
    price: "",
    address: "",
    keyFacts: {
      propertyType: "Apartment",
      yearBuilt: "",
      size: "",
      pricePerSqft: "",
      lotSize: "1",
      parking: "1",
      letLONG: ["", ""],
    },
    details: {
      municipality: "",
      roomsAboveGrade: "",
      bedrooms: "",
      bedroomsAboveGrade: "",
      fullBathrooms: "",
      halfBathrooms: "",
      fireplace: "",
      basement: "",
      basementDevelopment: "",
      additionalRooms: "",
      buildingAge: "",
      constructionType: "",
      exteriorFeature: "",
      parkingFeatures: "",
    },
    rooms: {
      items: [{ name: "", size: "", level: "" }],
    },
    nearbyProperties: [],
    images: [],
    video: null,
  });

  console.log(formData)

  const initAutocomplete = () => {
    if (!addressInputRef.current || !window.google) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "in" },
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      // Update address
      setFormData((prev) => ({
        ...prev,
        address: place.formatted_address || "",
        keyFacts: {
          ...prev.keyFacts,
          letLONG: [
            place.geometry.location.lat().toString(),
            place.geometry.location.lng().toString(),
          ],
        },
      }));

      // Extract municipality from address components
      const addressComponents = place.address_components || [];
      const locality = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      const adminArea = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_2")
      );

      if (locality || adminArea) {
        setFormData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            municipality: locality?.long_name || adminArea?.long_name || "",
          },
        }));
      }
    });
  };

  React.useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initAutocomplete();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const propertyTypes = useMemo(
    () => [
      { name: "Apartment", icon: MdApartment },
      { name: "House", icon: MdHome },
      { name: "Condo", icon: MdLocationCity },
      { name: "Town House", icon: MdHouse },
      { name: "Land", icon: MdLandscape },
    ],
    []
  );

  const nearbyPropertyTypes = useMemo(
    () => [
      { name: "School", icon: MdSchool, value: "SCHOOL" },
      { name: "Hospital", icon: MdLocalHospital, value: "HOSPITAL" },
      { name: "College", icon: MdSchool, value: "COLLEGE" },
      { name: "Market", icon: MdLocalGroceryStore, value: "MARKET" },
      { name: "Mall", icon: MdShoppingCart, value: "MALL" },
      { name: "Park", icon: MdPark, value: "PARK" },
      { name: "Bus Stop", icon: MdDirectionsBus, value: "BUS_STOP" },
      { name: "Metro Station", icon: MdTrain, value: "METRO_STATION" },
      { name: "Railway Station", icon: MdDirectionsRailway, value: "RAILWAY_STATION" },
      { name: "Airport", icon: MdFlight, value: "AIRPORT" },
      { name: "Bank", icon: MdAccountBalance, value: "BANK" },
      { name: "ATM", icon: MdAtm, value: "ATM" },
      { name: "Restaurant", icon: MdRestaurant, value: "RESTAURANT" },
      { name: "Hotel", icon: MdHotel, value: "HOTEL" },
      { name: "Petrol Pump", icon: MdLocalGasStation, value: "PETROL_PUMP" },
      { name: "Temple", icon: MdTempleHindu, value: "TEMPLE" },
      { name: "Mosque", icon: MdMosque, value: "MOSQUE" },
      { name: "Church", icon: MdChurch, value: "CHURCH" },
    ],
    []
  );

  const fireplaceOptions = useMemo(
    () => [
      { value: "false", label: "No" },
      { value: "true", label: "Yes" },
    ],
    []
  );

  const basementOptions = useMemo(
    () => [
      { value: "None", label: "None" },
      { value: "Full", label: "Full" },
      { value: "Partial", label: "Partial" },
      { value: "Crawl Space", label: "Crawl Space" },
    ],
    []
  );

  const basementDevelopmentOptions = useMemo(
    () => [
      { value: "NA", label: "N/A" },
      { value: "Finished", label: "Finished" },
      { value: "Unfinished", label: "Unfinished" },
      { value: "Partially Finished", label: "Partially Finished" },
    ],
    []
  );

  const constructionTypeOptions = useMemo(
    () => [
      { value: "RCC", label: "RCC (Reinforced Cement Concrete)" },
      { value: "Brick", label: "Brick" },
      { value: "Wood", label: "Wood" },
      { value: "Steel", label: "Steel" },
      { value: "Other", label: "Other" },
    ],
    []
  );

  const handleInputChange = useCallback((field, value, nestedKey = null) => {
    setFormData((prev) => {
      if (nestedKey) {
        return {
          ...prev,
          [nestedKey]: {
            ...prev[nestedKey],
            [field]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  }, []);


  const handleNearbyPropertyToggle = useCallback((propertyValue) => {
    setFormData((prev) => {
      const currentNearby = [...prev.nearbyProperties];
      const index = currentNearby.indexOf(propertyValue);

      if (index > -1) {
        // Remove if already selected
        currentNearby.splice(index, 1);
      } else {
        // Add if not selected
        currentNearby.push(propertyValue);
      }

      return {
        ...prev,
        nearbyProperties: currentNearby,
      };
    });
  }, []);


  const handleArrayInputChange = useCallback((field, index, value) => {
    setFormData((prev) => {
      if (field === "letLONG") {
        const newLetLONG = [...prev.keyFacts.letLONG];
        newLetLONG[index] = value;
        return {
          ...prev,
          keyFacts: {
            ...prev.keyFacts,
            letLONG: newLetLONG,
          },
        };
      } else if (field === "rooms") {
        const newRooms = [...prev.rooms.items];
        newRooms[index] = { ...newRooms[index], ...value };
        return {
          ...prev,
          rooms: {
            ...prev.rooms,
            items: newRooms,
          },
        };
      }
      return prev;
    });
  }, []);

  const addRoom = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        items: [...prev.rooms.items, { name: "", size: "", level: "" }],
      },
    }));
  }, []);

  const removeRoom = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        items: prev.rooms.items.filter((_, i) => i !== index),
      },
    }));
  }, []);

  const handleImageUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];
    const errors = [];

    for (const file of files) {
      try {
        await validateImage(file);
        validImages.push(file);
      } catch (err) {
        errors.push(err);
      }
    }

    if (errors.length > 0) {
      error(errors.join('\n'));
    }

    if (validImages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validImages].slice(0, 20),
      }));

      if (validImages.length > 0) {
        success(`${validImages.length} image(s) uploaded successfully`);
      }
    }

    // Reset input
    e.target.value = '';
  }, [error, success]);

  const handleVideoUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await validateVideo(file);
        setFormData((prev) => ({ ...prev, video: file }));
        success('Video uploaded successfully');
      } catch (err) {
        error(err);
        e.target.value = ''; // Reset input
      }
    }
  }, [error, success]);

  const removeImage = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const removeVideo = useCallback(() => {
    setFormData((prev) => ({ ...prev, video: null }));
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      info("Your Data is submitting . Sometimes it will take time and Don't refresh the page");
      const formDataToSend = new FormData();

      formDataToSend.append("sellerId", formData.sellerId);
      formDataToSend.append("property", formData.property);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("address", formData.address);

      Object.entries(formData.keyFacts).forEach(([key, value]) => {
        if (key === "letLONG") {
          value.forEach((coord) => {
            formDataToSend.append(`keyFacts[letLONG][]`, coord);
          });
        } else {
          formDataToSend.append(`keyFacts[${key}]`, value);
        }
      });

      Object.entries(formData.details).forEach(([key, value]) => {
        formDataToSend.append(`details[${key}]`, value);
      });

      formData.rooms.items.forEach((room, index) => {
        if (room.name) {
          formDataToSend.append(`rooms[items][${index}][name]`, room.name);
          formDataToSend.append(`rooms[items][${index}][size]`, room.size);
          formDataToSend.append(`rooms[items][${index}][level]`, room.level);
        }
      });

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (formData.video) {
        formDataToSend.append("video", formData.video);
      }

      // Replace with your actual axios call
      const response = await axiosInstance.post("/properties", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response) {
        console.log(response?.data)
        const createdPropertyId = response?.data?.data._id;
        console.log("Property created successfully with ID:", createdPropertyId);

        // Set the property ID in state for reference
        setPropertyId(createdPropertyId);

        // Prepare data for second API call (property-extras)
        const propertyExtrasData = {
          propertyId: createdPropertyId,
          propertyCategory: formData.keyFacts.propertyType,
          nearbyPlaces: formData.nearbyProperties
        };

        // Second API call to property-extras
        const extrasResponse = await axiosInstance.post("/property-extras", propertyExtrasData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
          },
        });

        // Show success message
        success("Property and nearby places added successfully!");

        setTimeout(() => {
          setFormData({
            sellerId: "",
            property: "",
            price: "",
            address: "",
            keyFacts: {
              propertyType: "Apartment",
              yearBuilt: "",
              size: "",
              pricePerSqft: "",
              lotSize: "1",
              parking: "1",
              letLONG: ["", ""],
            },
            details: {
              municipality: "",
              roomsAboveGrade: "",
              bedrooms: "",
              bedroomsAboveGrade: "",
              fullBathrooms: "",
              halfBathrooms: "",
              fireplace: "",
              basement: "",
              basementDevelopment: "",
              additionalRooms: "",
              buildingAge: "",
              constructionType: "",
              exteriorFeature: "",
              parkingFeatures: "",
            },
            rooms: {
              items: [{ name: "", size: "", level: "" }],
            },
            nearbyProperties: [],
            images: [],
            video: null,
          });
          setCurrentStep(0);
          setPropertyId(null);
        }, 2000);

      } else {
        throw new Error("Property ID not found in response");
      }
    } catch (err) {
      console.error("Error creating property:", err);
      error(err?.response?.data?.data[0]?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  // Add these validation functions before the PropertyListingForm component
  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(`${file.name}: File size exceeds 2MB`);
        return;
      }

      // Check image dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = function () {
        URL.revokeObjectURL(objectUrl);
        if (this.width < 600 || this.height < 300) {
          reject(`${file.name}: Image resolution must be at least 600x300 pixels. Current: ${this.width}x${this.height}`);
        } else {
          resolve(file);
        }
      };

      img.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        reject(`${file.name}: Invalid image file`);
      };

      img.src = objectUrl;
    });
  };

  const validateVideo = (file) => {
    return new Promise((resolve, reject) => {
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(`${file.name}: Video size exceeds 10MB`);
        return;
      }
      resolve(file);
    });
  };

  const fetchPropertyForEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/properties/${id}`);
      const responseExtra = await axiosInstance.get(`/property-extras/${id}`);

      const propertyData = response.data.data;
      const propertyExtrasData = responseExtra.data.data;
      console.log(propertyExtrasData);

      // Populate form with existing data
      setFormData({
        sellerId: propertyData.sellerId || "",
        property: propertyData.property || "",
        price: propertyData.price || "",
        address: propertyData.address || "",
        keyFacts: {
          propertyType: propertyData.keyFacts?.propertyType || "Apartment",
          yearBuilt: propertyData.keyFacts?.yearBuilt || "",
          size: propertyData.keyFacts?.size || "",
          pricePerSqft: propertyData.keyFacts?.pricePerSqft || "",
          lotSize: propertyData.keyFacts?.lotSize || "1",
          parking: propertyData.keyFacts?.parking || "1",
          letLONG: propertyData.keyFacts?.letLONG || ["", ""],
        },
        details: {
          municipality: propertyData.details?.municipality || "",
          roomsAboveGrade: propertyData.details?.roomsAboveGrade || "",
          bedrooms: propertyData.details?.bedrooms || "",
          bedroomsAboveGrade: propertyData.details?.bedroomsAboveGrade || "",
          fullBathrooms: propertyData.details?.fullBathrooms || "",
          halfBathrooms: propertyData.details?.halfBathrooms || "",
          fireplace: propertyData.details?.fireplace || "",
          basement: propertyData.details?.basement || "",
          basementDevelopment: propertyData.details?.basementDevelopment || "",
          additionalRooms: propertyData.details?.additionalRooms || "",
          buildingAge: propertyData.details?.buildingAge || "",
          constructionType: propertyData.details?.constructionType || "",
          exteriorFeature: propertyData.details?.exteriorFeature || "",
          parkingFeatures: propertyData.details?.parkingFeatures || "",
        },
        rooms: {
          items: propertyData.rooms?.items || [{ name: "", size: "", level: "" }],
        },
        nearbyProperties: propertyData.nearbyProperties || [],
        images: [], // Existing images will be shown separately
        video: null,
      });

      setEditMode(true);
      setEditPropertyId(id);
    } catch (err) {
      console.error("Error fetching property:", err);
      error("Failed to load property data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      info("Updating property data...");

      const formDataToSend = new FormData();

      formDataToSend.append("property", formData.property);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("address", formData.address);

      Object.entries(formData.keyFacts).forEach(([key, value]) => {
        if (key === "letLONG") {
          value.forEach((coord) => {
            formDataToSend.append(`keyFacts[letLONG][]`, coord);
          });
        } else {
          formDataToSend.append(`keyFacts[${key}]`, value);
        }
      });

      Object.entries(formData.details).forEach(([key, value]) => {
        formDataToSend.append(`details[${key}]`, value);
      });

      formData.rooms.items.forEach((room, index) => {
        if (room.name) {
          formDataToSend.append(`rooms[items][${index}][name]`, room.name);
          formDataToSend.append(`rooms[items][${index}][size]`, room.size);
          formDataToSend.append(`rooms[items][${index}][level]`, room.level);
        }
      });

      // Only append new images
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (formData.video) {
        formDataToSend.append("video", formData.video);
      }

      // Update property
      const response = await axiosInstance.patch(
        `/properties/${editPropertyId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response) {
        // Update property-extras if nearbyProperties changed
        const propertyExtrasData = {
          propertyId: editPropertyId,
          propertyCategory: formData.keyFacts.propertyType,
          nearbyPlaces: formData.nearbyProperties
        };

        await axiosInstance.patch(`/property-extras/${editPropertyId}`, propertyExtrasData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
          },
        });

        success("Property updated successfully!");

        setTimeout(() => {
          navigate("/sellers");
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating property:", err);
      error(err?.response?.data?.message || "Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    try {
      await axiosInstance.delete(`/properties/${editPropertyId}/media/${mediaId}`);
      success("Media deleted successfully!");
      // Refresh property data
      fetchPropertyForEdit(editPropertyId);
    } catch (err) {
      console.error("Error deleting media:", err);
      error("Failed to delete media");
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    if (editId) {
      fetchPropertyForEdit(editId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">
              {editMode
                ? "Edit Property"
                : currentStep === 0
                  ? "Add New Property"
                  : ["Basic Information", "Property Details", "Media Uploads"][currentStep]
              }
            </h1>
            <p className="text-sm text-gray-500">Step {currentStep + 1} of 3</p>
          </div>

          <StepIndicator currentStep={currentStep} />

          <div className="mb-8">
            {currentStep === 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Property Information
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Basic property details
                  </p>

                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Property Name"
                      placeholder="e.g. Luxury 3 BHK Apartment"
                      value={formData.property}
                      onChange={(e) =>
                        handleInputChange("property", e.target.value)
                      }
                      required
                    />

                    <InputField
                      label="Price"
                      type="number"
                      placeholder="9500000"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      prefix="$"
                      required
                    />

                    <InputField
                      label="Full Address"
                      placeholder="e.g. Andheri West, Mumbai, Maharashtra"
                      value={formData.address}
                      className="col-span-2"
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      inputRef={addressInputRef}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-1">Property Type</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Pick the closest match
                  </p>
                  <div className="grid grid-cols-5 gap-4">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() =>
                            handleInputChange(
                              "propertyType",
                              type.name,
                              "keyFacts"
                            )
                          }
                          className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${formData.keyFacts.propertyType === type.name
                            ? "border-blue-900 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                        >
                          <Icon className="w-8 h-8 mb-2" />
                          <span className="text-sm font-medium">
                            {type.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-1">Nearby Property</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Select all that apply
                  </p>
                  <div className="grid grid-cols-6 gap-4">
                    {nearbyPropertyTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.nearbyProperties.includes(type.name);
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleNearbyPropertyToggle(type.name)}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${isSelected
                            ? "border-blue-900 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                        >
                          <Icon className="w-6 h-6 mb-2" />
                          <span className="text-xs font-medium text-center">
                            {type.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Key Facts</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Essential property information
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Year Built"
                      placeholder="e.g. 2021"
                      value={formData.keyFacts.yearBuilt}
                      onChange={(e) =>
                        handleInputChange(
                          "yearBuilt",
                          e.target.value,
                          "keyFacts"
                        )
                      }
                    />

                    <InputField
                      label="Size"
                      placeholder="e.g. 1450 sqft"
                      value={formData.keyFacts.size}
                      onChange={(e) =>
                        handleInputChange("size", e.target.value, "keyFacts")
                      }
                    />

                    <InputField
                      label="Price per Sqft"
                      placeholder="e.g. 6550"
                      value={formData.keyFacts.pricePerSqft}
                      onChange={(e) =>
                        handleInputChange(
                          "pricePerSqft",
                          e.target.value,
                          "keyFacts"
                        )
                      }
                    />

                    <InputField
                      label="Lot Size"
                      placeholder="e.g. 2000 sqft or NA"
                      value={formData.keyFacts.lotSize}
                      onChange={(e) =>
                        handleInputChange("lotSize", e.target.value, "keyFacts")
                      }
                    />

                    <InputField
                      label="Parking"
                      placeholder="e.g. 2 Car Parking"
                      value={formData.keyFacts.parking}
                      onChange={(e) =>
                        handleInputChange("parking", e.target.value, "keyFacts")
                      }
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Detailed Information
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Additional property specifications
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Municipality"
                      placeholder="e.g. Mumbai"
                      value={formData.details.municipality}
                      onChange={(e) =>
                        handleInputChange(
                          "municipality",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Rooms Above Grade"
                      placeholder="e.g. 5"
                      value={formData.details.roomsAboveGrade}
                      onChange={(e) =>
                        handleInputChange(
                          "roomsAboveGrade",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Bedrooms"
                      placeholder="e.g. 3"
                      value={formData.details.bedrooms}
                      onChange={(e) =>
                        handleInputChange("bedrooms", e.target.value, "details")
                      }
                    />

                    <InputField
                      label="Bedrooms Below Grade"
                      placeholder="e.g. 3"
                      value={formData.details.bedroomsAboveGrade}
                      onChange={(e) =>
                        handleInputChange(
                          "bedroomsAboveGrade",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Full Bathrooms"
                      placeholder="e.g. 2"
                      value={formData.details.fullBathrooms}
                      onChange={(e) =>
                        handleInputChange(
                          "fullBathrooms",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Half Bathrooms"
                      placeholder="e.g. 1"
                      value={formData.details.halfBathrooms}
                      onChange={(e) =>
                        handleInputChange(
                          "halfBathrooms",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <SelectField
                      label="Fireplace"
                      value={formData.details.fireplace}
                      onChange={(e) =>
                        handleInputChange(
                          "fireplace",
                          e.target.value,
                          "details"
                        )
                      }
                      options={fireplaceOptions}
                    />

                    <SelectField
                      label="Basement"
                      value={formData.details.basement}
                      onChange={(e) =>
                        handleInputChange("basement", e.target.value, "details")
                      }
                      options={basementOptions}
                    />

                    <SelectField
                      label="Basement Development"
                      value={formData.details.basementDevelopment}
                      onChange={(e) =>
                        handleInputChange(
                          "basementDevelopment",
                          e.target.value,
                          "details"
                        )
                      }
                      options={basementDevelopmentOptions}
                    />

                    <InputField
                      label="Additional Rooms"
                      placeholder="e.g. Study Room"
                      value={formData.details.additionalRooms}
                      onChange={(e) =>
                        handleInputChange(
                          "additionalRooms",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Building Age"
                      placeholder="e.g. 2 Years"
                      value={formData.details.buildingAge}
                      onChange={(e) =>
                        handleInputChange(
                          "buildingAge",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <SelectField
                      label="Construction Type"
                      value={formData.details.constructionType}
                      onChange={(e) =>
                        handleInputChange(
                          "constructionType",
                          e.target.value,
                          "details"
                        )
                      }
                      options={constructionTypeOptions}
                    />

                    <InputField
                      label="Exterior Feature"
                      placeholder="e.g. Balcony"
                      value={formData.details.exteriorFeature}
                      onChange={(e) =>
                        handleInputChange(
                          "exteriorFeature",
                          e.target.value,
                          "details"
                        )
                      }
                    />

                    <InputField
                      label="Parking Features"
                      placeholder="e.g. Covered Parking"
                      value={formData.details.parkingFeatures}
                      onChange={(e) =>
                        handleInputChange(
                          "parkingFeatures",
                          e.target.value,
                          "details"
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Room Details</h2>
                      <p className="text-sm text-gray-500">
                        Information about rooms
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addRoom}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <MdAdd className="w-5 h-5" />
                      Add Room
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.rooms.items.map((room, index) => (
                      <div
                        key={index}
                        className="relative grid grid-cols-3 gap-4 p-4 border rounded-lg bg-white"
                      >
                        <InputField
                          label="Room Name"
                          placeholder={`e.g. ${index === 0 ? "Living Room" : `Bedroom ${index}`
                            }`}
                          value={room.name}
                          onChange={(e) =>
                            handleArrayInputChange("rooms", index, {
                              name: e.target.value,
                            })
                          }
                        />

                        <InputField
                          label="Size"
                          placeholder="e.g. 18x14 ft"
                          value={room.size}
                          onChange={(e) =>
                            handleArrayInputChange("rooms", index, {
                              size: e.target.value,
                            })
                          }
                        />

                        <InputField
                          label="Level"
                          placeholder="e.g. Main"
                          value={room.level}
                          onChange={(e) =>
                            handleArrayInputChange("rooms", index, {
                              level: e.target.value,
                            })
                          }
                        />

                        {formData.rooms.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRoom(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                            title="Remove room"
                          >
                            <MdRemove className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Upload Photos & Videos
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                  Upload up to 20 files. JPG, PNG, MP4 accepted. Max 100 MB per
                  file.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-semibold mb-4">Upload Images</h3>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-gray-400 transition-colors bg-white"
                      >
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <MdUpload className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 mb-2">Click to upload images</p>
                        <p className="text-gray-400 text-sm">Max 2MB per image, Min 600x300px</p>
                      </label>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">
                        Upload Video (Optional)
                      </h3>
                      {formData.video ? (
                        <div className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {formData.video.name}
                            </span>
                            <button
                              type="button"
                              onClick={removeVideo}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <MdClose className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {(formData.video.size / (1024 * 1024)).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                            id="video-upload"
                          />
                          <label
                            htmlFor="video-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors bg-white"
                          >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                              <MdUpload className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-gray-600 mb-2">Upload Video</p>
                            <p className="text-gray-400 text-sm">Optional - Max 10MB</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">
                        Uploaded Files (
                        {formData.images.length + (formData.video ? 1 : 0)})
                      </h3>
                      {formData.images.length > 0 && (
                        <span className="text-sm text-gray-500">
                          Drag to reorder
                        </span>
                      )}
                    </div>

                    {formData.images.length === 0 && !formData.video ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <p className="text-gray-400">No files uploaded yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative group aspect-video"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                            >
                              <MdClose className="w-4 h-4 text-red-500" />
                            </button>
                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MdDragIndicator className="w-5 h-5 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6 border-t">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Save Draft
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (currentStep < 2) {
                  setCurrentStep((prev) => prev + 1);
                } else {
                  editMode ? handleUpdate() : handleSubmit();
                }
              }}
              disabled={loading}
              className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? editMode ? "Updating..." : "Submitting..."
                : currentStep === 2
                  ? editMode ? "Update Property" : "Submit Property"
                  : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingForm;
