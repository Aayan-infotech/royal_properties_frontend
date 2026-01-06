import React, { useState, useEffect, useContext } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiShield,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { AlertContext } from "../../context/alertContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../component/axiosInstance";

const ConfirmPassword = () => {
  const { userType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [loading, setLoading] = useState(false);

  const { success, error } = useContext(AlertContext);
  const userId = location?.state?.id;
  const purpose = location?.state?.purpose || "reset-password";

  // Password validation criteria
  const validatePassword = (pass) => {
    const newCriteria = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
    };

    setCriteria(newCriteria);

    // Calculate strength (0-5)
    const strength = Object.values(newCriteria).filter(Boolean).length;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Function to get the correct API endpoint and data structure based on purpose
  const getApiConfig = () => {
    const baseData = {
      password: password,
    };

    // Add the appropriate ID field based on userType
    switch (userType) {
      case "agents":
        baseData.agentId = userId;
        break;
      case "sellers":
        baseData.sellerId = userId;
        break;
      case "buyers":
        baseData.buyerId = userId;
        break;
      default:
        baseData.id = userId;
    }

    // For forgot-password (reset password), use reset-password endpoint with newPassword field
    if (purpose === "forgot-password") {
      return {
        endpoint: `${userType}/reset-password`,
        data: {
          ...baseData,
          newPassword: password, // Use newPassword field for reset-password
        },
      };
    } else {
      // For account creation or other purposes, use set-password endpoint
      return {
        endpoint: `${userType}/set-password`,
        data: baseData, // Use password field for set-password
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!userId) {
      error("User ID is missing. Please try the process again.");
      return;
    }

    if (password !== confirmPassword) {
      error("Passwords do not match");
      return;
    }

    if (passwordStrength < 4) {
      error("Please create a stronger password");
      return;
    }

    setLoading(true);

    try {
      const { endpoint, data } = getApiConfig();
      const response = await axiosInstance.post(endpoint, data);

      if (response?.data) {
        const successMessage =
          purpose === "forgot-password"
            ? "Password reset successfully!"
            : "Password set successfully!";

        success(response.data.message || successMessage);

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate(`/${userType}/login`);
        }, 2000);
      }
    } catch (err) {
      console.error("Password update error:", err);
      const errorMessage =
        purpose === "forgot-password"
          ? "Failed to reset password. Please try again."
          : "Failed to set password. Please try again.";

      error(err.response?.data?.message || err.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  const passwordsMatch = password === confirmPassword && password !== "";
  const isFormValid = passwordsMatch && passwordStrength >= 4 && userId;

  // Get title based on purpose
  const getTitle = () => {
    return purpose === "forgot-password"
      ? "Reset Your Password"
      : "Set Your Password";
  };

  // Get button text based on purpose
  const getButtonText = () => {
    return purpose === "forgot-password" ? "Reset Password" : "Set Password";
  };

  // Get description based on purpose
  const getDescription = () => {
    return purpose === "forgot-password"
      ? "Create a new strong password for your account"
      : "Create a strong password to secure your account";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <IoKeyOutline className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {getTitle()}
              </h2>
              <p className="text-gray-600">{getDescription()}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-xs font-medium text-gray-700">
                  {purpose === "forgot-password"
                    ? "Password Reset"
                    : "Account Setup"}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {purpose === "forgot-password" ? "New Password" : "Password"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder={`Enter ${
                      purpose === "forgot-password" ? "new" : ""
                    } password`}
                    required
                    minLength="8"
                  />
                  <FiLock className="absolute left-4 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Password Strength */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Strength</span>
                      <span
                        className={`text-sm font-medium ${
                          passwordStrength <= 2
                            ? "text-red-600"
                            : passwordStrength === 3
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      confirmPassword
                        ? passwordsMatch
                          ? "border-green-500 focus:ring-green-200"
                          : "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Confirm your password"
                    required
                    minLength="8"
                  />
                  <FiLock className="absolute left-4 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div
                    className={`mt-2 flex items-center text-sm ${
                      passwordsMatch ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {passwordsMatch ? (
                      <>
                        <FiCheck className="mr-2" />
                        Passwords match
                      </>
                    ) : (
                      <>
                        <FiX className="mr-2" />
                        Passwords don't match
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <FiAlertCircle className="mr-2" />
                  Password Requirements
                </h3>
                <ul className="space-y-2">
                  {[
                    { key: "length", text: "At least 8 characters" },
                    { key: "uppercase", text: "One uppercase letter" },
                    { key: "lowercase", text: "One lowercase letter" },
                    { key: "number", text: "One number" },
                    { key: "special", text: "One special character" },
                  ].map((req) => (
                    <li
                      key={req.key}
                      className={`flex items-center text-sm ${
                        criteria[req.key] ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {criteria[req.key] ? (
                        <FiCheck className="mr-2" />
                      ) : (
                        <FiX className="mr-2" />
                      )}
                      {req.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-sm hover:shadow"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <FiShield className="mr-2" />
                    {getButtonText()}
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  <FiShield className="inline mr-1" />
                  Your password is encrypted and securely stored.
                </p>
              </div>

              {/* Validation Error */}
              {!userId && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">
                    Session expired. Please restart the password{" "}
                    {purpose === "forgot-password" ? "reset" : "setup"} process.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
