import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../component/axiosInstance";
import { AlertContext } from "../../context/alertContext";
import { useAlert } from "../../hooks/useApiAlert";
import { encrypt, decrypt } from "../../utils/constant";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success, error, info, warning } = useContext(AlertContext);
  const navigate = useNavigate();
  const { userType } = useParams();
  const encryptedUserType = encrypt(userType);
  const decryptedUserType = decrypt(encryptedUserType);
  const singularRole = userType.endsWith("s")
    ? userType.slice(0, -1)
    : userType;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      role: singularRole,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(`auth/login`, formData);
      if (response) {
        success(response.data.message);
        localStorage.setItem("token", response?.data?.data.accessToken);
        localStorage.setItem("RefreshToken", response?.data?.data.refreshToken);
        localStorage.setItem("userRole", encryptedUserType);
        setTimeout(() => {
          navigate(`/${userType}/home`);
        }, 2000);
      }
    } catch (err) {
      error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card Container */}
        <div className="">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Welcome back! Please enter your details.
          </p>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />

                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex-none mb-4 rounded-md bg-[#132141] px-3.5 py-2.5 text-sm text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mb-8">
            <Link
              to={`/${userType}/forgot-password/`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="mx-4 text-gray-500 text-sm">or</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In Button */}
          {/* <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition duration-200 mb-8">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button> */}

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600 text-sm">New User? </span>
            <Link
              to={`/${userType}/signup`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
