import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Login() {
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

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Number
            </label>
            <input
              type="text"
              placeholder="Enter your email or number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 mb-6">
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mb-8">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Forgot password?
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="mx-4 text-gray-500 text-sm">or</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In Button */}
          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition duration-200 mb-8">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600 text-sm">New User? </span>
            <Link
              to="/signup"
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
