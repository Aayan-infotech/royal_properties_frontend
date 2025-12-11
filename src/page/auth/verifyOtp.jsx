import React, { useState, useRef, useEffect } from "react";
import { FiSmartphone, FiMail, FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("+1 (234) 567-8900");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    // Simulate verification
    if (enteredOtp.length === 6) {
      setIsVerified(true);
      navigate("/confirmPassword");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  const handleResend = () => {
    if (canResend) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setCanResend(false);
      setIsVerified(false);
      inputRefs.current[0].focus();
      alert("New OTP has been sent to your device");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const otpArray = pasteData.split("").slice(0, 6);
      setOtp(otpArray);
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className=" rounded-2xl  max-w-md overflow-hidden">
        {/* Content */}
        <div className="p-6 md:p-8">
          {isVerified ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <IoCheckmarkCircleOutline className="text-4xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verified!
              </h2>
              <p className="text-gray-600 mb-6">
                Your mobile number has been successfully verified.
              </p>
              <button
                onClick={() => {
                  setIsVerified(false);
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Verify Another Number
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Verify your mobile number
                </h2>
                <p className="text-gray-600 mb-4">
                  Enter the 6-digit OTP sent to your device
                </p>
                <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <FiSmartphone className="mr-2" />
                  <span className="font-medium">{mobileNumber}</span>
                </div>
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
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500">
                  Enter the 6-digit verification code
                </p>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={otp.join("").length !== 6}
                className="w-full bg-[#132141] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg mb-6"
              >
                Verify
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
                  disabled={!canResend}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTP;
