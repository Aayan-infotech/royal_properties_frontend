import React, { useState, useRef, useEffect, useContext } from "react";
import { FiSmartphone, FiMail, FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../component/axiosInstance";
import { AlertContext } from "../../context/alertContext";
import { useAlert } from "../../hooks/useApiAlert";
import { type } from "../../utils/constant";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { userType } = useParams();
  const location = useLocation();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [contactInfo, setContactInfo] = useState(
    location?.state?.email || location?.state?.mobileNumber || ""
  );

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { success, error, info, warning } = useContext(AlertContext);
  const { handleApiError, handleApiSuccess, wrapApiCall } = useAlert();

  // Get the ID from location state (this could be sellerId, agentId, buyerId, or generic id)
  const userId = location?.state?.id;
  const purpose = location?.state?.purpose || "forgot-password";

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Function to prepare request data based on userType
  const prepareRequestData = (enteredOtp) => {
    const baseData = {
      otp: enteredOtp,
    };

    // Add the appropriate ID field based on userType
    switch (userType) {
      case "agents":
        return { ...baseData, agentId: userId };
      case "sellers":
        return { ...baseData, sellerId: userId };
      case "buyers":
        return { ...baseData, buyerId: userId };
      default:
        return { ...baseData, id: userId };
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        // Changed from 5 to 3 for 4-digit OTP
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      error("Please enter a valid 4-digit OTP");
      return;
    }

    e.preventDefault();
    setLoading(true);

    try {
      // Prepare request data with the correct ID field
      const requestData = prepareRequestData(enteredOtp);

      const response = await axiosInstance.post(
        `${userType}/verify-otp`,
        requestData
      );

      if (response) {
        console.log(response.data);
        success(response.data.message);
        setIsVerified(true);

        setTimeout(() => {
          // Navigate to confirm password with the userId
          navigate(`/${userType}/confirm-password`, {
            state: {
              id: userId,
              purpose: purpose,
            },
          });
        }, 2000);
      }
    } catch (err) {
      error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) {
      warning("Please wait before resending OTP");
      return;
    }

    setOtp(["", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setLoading(true);

    try {
      // Prepare resend request data
      let resendData = {};

      // Add appropriate ID field for resend request
      switch (userType) {
        case "agents":
          resendData = { agentId: userId };
          break;
        case "sellers":
          resendData = { sellerId: userId };
          break;
        case "buyers":
          resendData = { buyerId: userId };
          break;
        default:
          resendData = { id: userId };
      }

      const response = await axiosInstance.post(
        `${userType}/resend-otp`,
        resendData
      );

      if (response) {
        console.log(response.data);
        success(response.data.message);
        setTimer(30);
        setCanResend(false);

        // Reset focus to first input
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (err) {
      error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasteData)) {
      // Changed from 6 to 4 for 4-digit OTP
      const otpArray = pasteData.split("").slice(0, 4);
      setOtp(otpArray);
      inputRefs.current[3].focus(); // Changed from 5 to 3 for 4-digit OTP
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="rounded-2xl max-w-md overflow-hidden">
        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verify your{" "}
              {purpose === "forgot-password" ? "account" : "mobile number"}
            </h2>
            <p className="text-gray-600 mb-4">
              Enter the 4-digit OTP sent to your{" "}
              {purpose === "forgot-password" ? "email/phone" : "device"}
            </p>
            {contactInfo && (
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                <FiMail className="mr-2" />
                <span className="font-medium">{contactInfo}</span>
              </div>
            )}
            {isVerified && (
              <div className="mt-4 flex items-center justify-center text-green-600">
                <IoCheckmarkCircleOutline className="mr-2" />
                <span>OTP Verified Successfully!</span>
              </div>
            )}
          </div>

          {/* OTP Inputs */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 md:space-x-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  autoFocus={index === 0}
                  disabled={isVerified || loading}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              Enter the 4-digit verification code
            </p>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.join("").length !== 4 || loading || isVerified}
            className="w-full bg-[#132141] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg mb-6"
          >
            {loading ? "Verifying..." : isVerified ? "Verified" : "Verify"}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              {!canResend ? (
                <>
                  Didn't receive the OTP? Resend in{" "}
                  <span className="font-bold text-blue-600">{timer}s</span>
                </>
              ) : (
                "You can now resend the OTP"
              )}
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend || loading}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed font-medium transition"
            >
              <FiRefreshCw className="mr-2" />
              Resend OTP
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              For security reasons, this OTP will expire in 5 minutes.
              <br />
              Make sure to enter it promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
