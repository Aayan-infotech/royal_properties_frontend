import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasAlphabet: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Personal Info", icon: HiUser },
    { id: 2, title: "Account Setup", icon: HiLockClosed },
    { id: 3, title: "Complete", icon: HiCheck },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const isStep1Valid =
    formData.fullName.trim() !== "" && formData.email.trim() !== "";
  const isStep2Valid =
    Object.values(passwordValidation).every((v) => v) &&
    formData.password === formData.confirmPassword &&
    formData.password !== "";
  formData.phoneNumber !== "";

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Password Requirements:
              </h4>
              <ul className="space-y-2 text-sm">
                <li
                  className={`flex items-center ${
                    passwordValidation.minLength
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <HiCheck
                    className={`h-4 w-4 mr-2 ${
                      passwordValidation.minLength
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  At least 6 characters
                </li>
                <li
                  className={`flex items-center ${
                    passwordValidation.hasAlphabet
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <HiCheck
                    className={`h-4 w-4 mr-2 ${
                      passwordValidation.hasAlphabet
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  2 or more alphabet characters
                </li>
                <li
                  className={`flex items-center ${
                    passwordValidation.hasNumber
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <HiCheck
                    className={`h-4 w-4 mr-2 ${
                      passwordValidation.hasNumber
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  Numbers 0-9
                </li>
                <li
                  className={`flex items-center ${
                    passwordValidation.hasSpecialChar
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <HiCheck
                    className={`h-4 w-4 mr-2 ${
                      passwordValidation.hasSpecialChar
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  Special characters
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
              >
                <div className="flex items-center justify-center">
                  <HiArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </div>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStep2Valid}
                className={`flex-1 flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  !isStep2Valid
                    ? "bg-blue-300 cursor-not-allowed text-white"
                    : "bg-[#132141] hover:bg-[#1c346b] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                }`}
              >
                Create Account
                <HiArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6 py-4">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-100 to-emerald-100">
              <HiCheck className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">
                Account Created Successfully!
              </h3>
              <p className="text-gray-600">
                Welcome,{" "}
                <span className="font-semibold text-gray-800">
                  {formData.fullName}
                </span>
                ! Your account has been created.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="w-full py-3 px-4 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                Already registered? Log in
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        <div className="px-8 pt-4 pb-8">
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Full Name Input */}
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
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
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
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    !isStep1Valid
                      ? "bg-blue-300 cursor-not-allowed text-white"
                      : "bg-[#132141] hover:bg-[#1c346b] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  }`}
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
