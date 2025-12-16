import React, { useState, useContext } from "react";
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiCheck,
  HiArrowRight,
  HiArrowLeft,
  HiPhoneIncoming,
  HiShieldCheck,
  HiExclamationCircle,
  HiChevronRight,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../component/axiosInstance";
import { AlertContext } from "../../context/alertContext";
import { useApiAlert } from "../../hooks/useApiAlert";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasAlphabet: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error, info, warning } = useContext(AlertContext);
  const { handleApiError, handleApiSuccess, wrapApiCall } = useApiAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordValidation({
        minLength: value.length >= 6,
        hasAlphabet: /[a-zA-Z]{2,}/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleNext = () => {
    navigate("/verifyOTP");
  };

  const type = location.pathname.split("/")[2];
  console.log(type);

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post(`${type}/init-register`, {
        formData,
      });
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg  overflow-hidden">
        {/* Header */}
        <div className="pt-10 pb-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">
            Sign up to get started with our platform
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="pt-4 pb-8">
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Full Name Input */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <span className="text-gray-600 text-lg flex justify-center ">
                  Or
                </span>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiPhoneIncoming className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your Phone Number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}

                {(location.pathname.split("/")[2] === "sellers" ||
                  location.pathname.split("/")[2] === "agents") && (
                  <>
                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your Location"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {location.pathname.split("/")[2] === "agents" && (
                  <>
                    <div className="grid lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brokerage Name
                        </label>
                        <div className="relative">
                        
                          <input
                            type="text"
                            name="brokerageName"
                            value={formData.brokerageName}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your Brokerage"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          BoardName
                        </label>
                        <div className="relative">
                        
                          <input
                            type="text"
                            name="boardName"
                            value={formData.boardName}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your Board Name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Province
                        </label>
                        <div className="relative">
                        
                          <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your Province"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium transition-colors ${"bg-[#132141] hover:bg-[#1c346b] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"}`}
                >
                  Continue
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
