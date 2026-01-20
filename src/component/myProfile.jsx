import React, { useEffect, useState, useContext } from "react";
import { Tab } from "@headlessui/react";
import {
  FaUser,
  FaLanguage,
  FaHandsHelping,
  FaEye,
  FaMapMarkerAlt,
  FaChartBar,
  FaEnvelope,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHeart,
  FaBed,
  FaBath,
  FaTimes,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane,
} from "react-icons/fa";
import axiosInstance from "./axiosInstance";
import { decrypt, userType } from "../utils/constant";
import { AlertContext } from "../context/alertContext";
import { useNavigate } from "react-router-dom";
// Component for Logout Modal
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Logout
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to logout? You will need to login again to
            access your account.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component with Accordion
const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="text-left font-semibold text-gray-800">
          {faq.question}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-gray-600">{faq.answer}</p>
          {faq.category && (
            <div className="mt-3">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {faq.category}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// FAQ Submission Form Component
const FAQSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit(formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        question: "",
        category: "general",
      });
      setIsSubmitted(false);
    }, 2000);
  };

  const categories = [
    { value: "general", label: "General" },
    { value: "account", label: "Account" },
    { value: "properties", label: "Properties" },
    { value: "payments", label: "Payments" },
    { value: "technical", label: "Technical Support" },
    { value: "other", label: "Other" },
  ];

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FaPaperPlane className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">
              Question Submitted!
            </h3>
            <p className="text-green-600 text-sm mt-1">
              Your question has been submitted. We'll respond within 24-48
              hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FaPlus className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Ask a Question
          </h3>
          <p className="text-gray-600 text-sm">
            Can't find what you're looking for? Submit your question below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Question *
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your question here..."
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            We typically respond within 24-48 hours
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Submit Question</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ property, type = "watched" }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="md:w-3/5 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">
              {property.title}
            </h3>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaHeart className={`${isLiked ? "text-red-500" : ""}`} />
            </button>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{property.location}</span>
            {property.distance && (
              <span className="ml-2 text-sm text-gray-500">
                ({property.distance} km away)
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaBed className="mr-2 text-gray-500" />
                <span className="text-gray-700">{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-gray-500" />
                <span className="text-gray-700">{property.bathrooms} bath</span>
              </div>
            </div>
          </div>
          {property.status && (
            <div className="mt-3">
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                {property.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Edit Profile Component (Fixed as proper component)
const EditProfile = ({ profile, setProfile, onSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <img
            src={profile?.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile?.name || profile?.fullName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile?.email || ""}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed disabled:bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={profile?.phone || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={profile?.city || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={profile?.address || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Main Component
const UserProfileDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(0);
  const [userQuestions, setUserQuestions] = useState([]);
  const { success, error } = useContext(AlertContext);
  const [profile, setProfile] = useState({
    photo: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock functions to replace axiosInstance and AlertContext
  const mockFetchProfile = async () => {
    // Simulate API call
    const response = await axiosInstance.get(`/${userType}/me/profile`)
    return response
  };

  const mockUpdateProfile = async (profileData) => {
    // Simulate API call
    const response = await axiosInstance.put(`/${userType}/me/profile`)
    return response
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await mockFetchProfile();
        if (response) {
          setProfile(response?.data?.data);
          console.log("Profile Data:", response?.data);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const response = await mockUpdateProfile(profile);
      if (response?.data?.message) {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const tabItems = [
    { id: 0, name: "Edit Profile", icon: <FaUser /> },
    { id: 1, name: "Language", icon: <FaLanguage /> },
    { id: 2, name: "Service Provider", icon: <FaHandsHelping /> },
    { id: 3, name: "Watched Property", icon: <FaEye /> },
    { id: 4, name: "Nearby Property", icon: <FaMapMarkerAlt /> },
    { id: 5, name: "Market Statistic", icon: <FaChartBar /> },
    { id: 6, name: "Submitted Enquiry", icon: <FaEnvelope /> },
    { id: 7, name: "FAQ", icon: <FaQuestionCircle /> },
  ];

  const [faqItems, setFaqItems] = useState([
    {
      id: 1,
      question: "How do I update my profile information?",
      answer:
        "Navigate to the Edit Profile tab and make your changes. Remember to click Save Changes when done.",
      category: "account",
    },
    {
      id: 2,
      question: "Can I save multiple properties to watch?",
      answer:
        "Yes, you can add properties to your watchlist by clicking the heart icon on any property card.",
      category: "properties",
    },
    {
      id: 3,
      question: "How often are nearby properties updated?",
      answer:
        "Nearby properties are updated in real-time based on your current location.",
      category: "properties",
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for property purchases.",
      category: "payments",
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team through the Submitted Enquiries tab or call us at 1-800-123-4567.",
      category: "general",
    },
  ]);

  const handleFAQSubmit = (newQuestion) => {
    const newFaq = {
      id: faqItems.length + userQuestions.length + 1,
      question: newQuestion.question,
      answer:
        "Thank you for your question! Our team will review it and respond to you directly via email.",
      category: newQuestion.category,
      isUserSubmitted: true,
      userName: newQuestion.name,
    };

    setUserQuestions(prev => [...prev, newFaq]);
  };

  const handleFAQToggle = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const renderFAQContent = () => {
    const allFAQs = [...faqItems, ...userQuestions];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {allFAQs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFAQIndex === index}
                onToggle={handleFAQToggle}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const watchedProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown, NYC",
      price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "For Sale",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      location: "Queens, NYC",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      status: "For Sale",
    },
  ];

  const nearbyProperties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      location: "Manhattan, NYC",
      price: 2500000,
      bedrooms: 4,
      bathrooms: 3.5,
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
      distance: 2.5,
    },
    {
      id: 2,
      title: "Waterfront Villa",
      location: "Brooklyn, NYC",
      price: 3200000,
      bedrooms: 5,
      bathrooms: 4,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      distance: 4.2,
    },
  ];

  const renderTabContent = () => {
    if (isLoading && selectedTab === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (selectedTab) {
      case 0:
        return <EditProfile profile={profile} setProfile={setProfile} onSave={handleSaveProfile} />;
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Select Your Preferred Language
            </h3>
            <select className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Provider Settings</h3>
            <p className="text-gray-600">
              Configure your preferred service providers and notification
              settings.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Watched Properties</h3>
            <div className="grid grid-cols-1 gap-6">
              {watchedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="watched"
                />
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Nearby Properties</h3>
            <div className="grid grid-cols-1 gap-6">
              {nearbyProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="nearby"
                />
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Market Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold text-gray-800">
                  Average Property Price
                </h4>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  $1,250,000
                </p>
                <p className="text-green-600 mt-2">↑ 5.2% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold text-gray-800">
                  Properties Available
                </h4>
                <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
                <p className="text-gray-600 mt-2">Across all categories</p>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Submitted Enquiries</h3>
            <div>
              <FAQSubmissionForm onSubmit={handleFAQSubmit} />
            </div>
          </div>
        );
      case 7:
        return renderFAQContent();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                <Tab.List className="flex flex-col space-y-2">
                  {tabItems.map((item) => (
                    <Tab
                      key={item.id}
                      className={({ selected }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${selected
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>

              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center space-x-3 px-4 py-3 mt-4 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {tabItems[selectedTab]?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Manage your account settings and preferences
                </p>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          localStorage.clear();
          navigate("/role/login")
        }}
      />
    </div>
  );
};

export default UserProfileDashboard;