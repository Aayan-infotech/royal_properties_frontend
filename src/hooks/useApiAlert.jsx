import { useContext } from 'react';

import { AlertContext } from '../context/alertContext';

export const useAlert = () => useContext(AlertContext);

export const useApiAlert = () => {
  const { apiError, apiSuccess } = useAlert();

  const handleApiError = (error, customOptions = {}) => {
    console.error('API Error:', error);
    
    const defaultOptions = {
      duration: 7000, // Longer duration for errors
      position: 'top-right',
    };

    return apiError(error, { ...defaultOptions, ...customOptions });
  };

  const handleApiSuccess = (response, customOptions = {}) => {
    console.log('API Success:', response);
    
    const defaultOptions = {
      duration: 3000,
      position: 'top-right',
    };

    return apiSuccess(response, { ...defaultOptions, ...customOptions });
  };

  const wrapApiCall = async (apiCall, options = {}) => {
    try {
      const response = await apiCall();
      
      if (options.showSuccess !== false) {
        handleApiSuccess(response, options.successOptions);
      }
      
      return { data: response.data, error: null };
    } catch (error) {
      const alertId = handleApiError(error, options.errorOptions);
      
      // Return error for handling in components
      return { 
        data: null, 
        error: error,
        alertId 
      };
    }
  };

  return {
    handleApiError,
    handleApiSuccess,
    wrapApiCall,
  };
};