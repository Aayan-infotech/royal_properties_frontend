import React, { useState, useEffect } from 'react';
import { 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiCheck, 
  FiX,
  FiShield,
  FiAlertCircle,
  FiArrowLeft
} from 'react-icons/fi';
import { IoKeyOutline } from 'react-icons/io5';

const ConfirmPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Password validation criteria
  const validatePassword = (pass) => {
    const newCriteria = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (password === confirmPassword && passwordStrength >= 4) {
      alert('Password created successfully!');
      // In real app, you would handle the password submission here
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    if (passwordStrength === 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Good';
    if (passwordStrength === 4) return 'Strong';
    return 'Very Strong';
  };

  const passwordsMatch = password === confirmPassword && password !== '';
  const isFormValid = passwordsMatch && passwordStrength >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className=" w-full max-w-lg overflow-hidden">

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <IoKeyOutline className="text-2xl text-gray-700" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Create a secure password
            </h2>
            <p className="text-gray-600">
              Please create a strong password to protect your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiLock className="mr-2" />
                  Create password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pl-11 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Enter your password"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Password Strength
                    </span>
                    <span className={`text-sm font-bold ${
                      passwordStrength <= 2 ? 'text-red-600' :
                      passwordStrength === 3 ? 'text-yellow-600' :
                      passwordStrength === 4 ? 'text-blue-600' : 'text-green-600'
                    }`}>
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
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiLock className="mr-2" />
                  Confirm password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full px-4 py-3 pl-11 border-2 rounded-lg focus:ring-2 outline-none transition ${
                    confirmPassword 
                      ? passwordsMatch 
                        ? 'border-green-500 focus:border-green-500 focus:ring-green-200' 
                        : 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Confirm your password"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center">
                  {passwordsMatch ? (
                    <>
                      <FiCheck className="text-green-500 mr-2" />
                      <span className="text-green-600 text-sm font-medium">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <FiX className="text-red-500 mr-2" />
                      <span className="text-red-600 text-sm font-medium">
                        Both passwords must match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <FiAlertCircle className="mr-2" />
                Password Requirements
              </h3>
              <ul className="space-y-2">
                <li className={`flex items-center text-sm ${criteria.length ? 'text-green-600' : 'text-gray-600'}`}>
                  {criteria.length ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                  Minimum 8 characters
                </li>
                <li className={`flex items-center text-sm ${criteria.uppercase && criteria.lowercase ? 'text-green-600' : 'text-gray-600'}`}>
                  {criteria.uppercase && criteria.lowercase ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                  Use both uppercase and lowercase letters
                </li>
                <li className={`flex items-center text-sm ${criteria.number ? 'text-green-600' : 'text-gray-600'}`}>
                  {criteria.number ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                  Include at least one number
                </li>
                <li className={`flex items-center text-sm ${criteria.special ? 'text-green-600' : 'text-gray-600'}`}>
                  {criteria.special ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                  Use at least one special character (!@#$%^&*)
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="mr-2 w-4" />
                  Avoid common or easy-to-guess passwords
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <FiShield className="mr-2" />
              Continue
            </button>

            {/* Security Note */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-center text-xs text-gray-500">
                <FiShield className="inline mr-1" />
                Your password is encrypted and securely stored.
                <br />
                We never store passwords in plain text.
              </p>
            </div>

            {/* Validation Error */}
            {isSubmitted && !isFormValid && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium text-center">
                  Please ensure all password requirements are met and passwords match.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;