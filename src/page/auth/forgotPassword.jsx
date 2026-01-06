import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../component/axiosInstance";
import { AlertContext } from "../../context/alertContext";
import { useAlert } from "../../hooks/useApiAlert";
import { encrypt, decrypt } from "../../utils/constant";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    role: "", // Add role to formData
  });

  const [loading, setLoading] = useState(false);
  const { success, error, info, warning } = useContext(AlertContext);
  const { handleApiError, handleApiSuccess, wrapApiCall } = useAlert();
  const navigate = useNavigate();
  const { userType } = useParams();
  const encryptedUserType = encrypt(userType);
  const decryptedUserType = decrypt(encryptedUserType);
  const singularRole = userType.endsWith("s")
    ? userType.slice(0, -1)
    : userType;

  // Initialize formData with role on component mount
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: singularRole,
    }));
  }, [singularRole]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${userType}/forgot-password`,
        formData
      );
      if (response) {
        success(response.data.message);

        // Extract the ID based on user type
        let idToPass = null;

        switch (userType) {
          case "agents":
            idToPass = response.data?.data?.agentId || response.data?.data?.id;
            break;
          case "sellers":
            idToPass = response.data?.data?.sellerId || response.data?.data?.id;
            break;
          case "buyers":
            idToPass = response.data?.data?.buyerId || response.data?.data?.id;
            break;
          default:
            idToPass = response.data?.data?.id;
        }

        // Alternative approach: Check for any ID in the response data
        if (!idToPass && response.data?.data) {
          // Look for any ID field in the response data
          const data = response.data.data;
          idToPass =
            data.id ||
            data.agentId ||
            data.sellerId ||
            data.buyerId ||
            data.userId ||
            data.customerId ||
            data.memberId;
        }

        // console.log("Extracted ID:", idToPass);

        setTimeout(() => {
          navigate(`/${userType}/verify-otp`, {
            state: {
              id: idToPass,
              purpose: "forgot-password"
            },
          });
        }, 2000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";
      error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Alternative: A more flexible function to get ID from response
  const extractIdFromResponse = (responseData, userType) => {
    const data = responseData?.data || {};

    // Try different possible ID field names
    const possibleIdFields = [
      `${singularRole}Id`, // agentId, sellerId, buyerId
      "id",
      "userId",
      "user_id",
      `${userType.slice(0, -1)}_id`, // agent_id, seller_id, buyer_id
      "customerId",
      "memberId",
    ];

    for (const field of possibleIdFields) {
      if (data[field]) {
        return data[field];
      }
    }

    // If no ID found in data object, check root level
    if (responseData?.id) {
      return responseData.id;
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card Container */}
        <div className="">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your email or number to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Number
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email or number"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !formData.email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 mb-6 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
