import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Transition } from "@headlessui/react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

// Create context
const AlertContext = createContext();

// Alert types configuration
const alertConfig = {
  success: {
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-400",
    icon: FaCheckCircle,
    iconColor: "text-green-400",
  },
  error: {
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-400",
    icon: FaExclamationCircle,
    iconColor: "text-red-400",
  },
  info: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-400",
    icon: FaInfoCircle,
    iconColor: "text-blue-400",
  },
  warning: {
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-400",
    icon: FaExclamationTriangle,
    iconColor: "text-yellow-400",
  },
};

// Alert component
const AlertComponent = ({ alert, onClose }) => {
  const { type, title, message, duration = 5000 } = alert;
  const config = alertConfig[type];
  const Icon = config.icon;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, onClose]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onClose();
  };

  return (
    <Transition
      show={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={`max-w-sm w-full ${config.bgColor} shadow-lg rounded-lg pointer-events-auto border ${config.borderColor} overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon
              className={`h-6 w-6 ${config.iconColor}`}
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {title && (
              <p className={`text-sm font-medium ${config.textColor}`}>
                {title}
              </p>
            )}
            <p className={`mt-1 text-sm ${config.textColor}`}>
              {typeof message === "string" ? message : JSON.stringify(message)}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className={`inline-flex ${config.bgColor} rounded-md ${
                config.textColor
              } hover:${config.bgColor.replace(
                "50",
                "100"
              )} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${config.bgColor.replace(
                "bg-",
                ""
              )} focus:ring-${config.textColor.replace("text-", "")}`}
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <FaTimes className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

// Alert Container Component
const AlertContainer = ({ children, position = "top-right" }) => {
  const { alerts, removeAlert } = useContext(AlertContext);

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  return (
    <>
      {children}
      <div
        className={`fixed z-50 ${positionClasses[position]} flex flex-col space-y-2`}
      >
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            alert={alert}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </>
  );
};

// Alert Provider Component
const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const removeAlert = useCallback((id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);
  const showAlert = useCallback((message, options = {}) => {
    const {
      type = "info",
      title = "",
      duration = 5000,
      position = "top-right",
    } = options;

    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const newAlert = {
      id,
      type,
      title,
      message,
      duration,
      position,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    // Auto remove if duration is set
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
  }, []);

  // Helper methods for common alert types
  const success = useCallback(
    (message, options = {}) => {
      return showAlert(message, { ...options, type: "success" });
    },
    [showAlert]
  );

  const error = useCallback(
    (message, options = {}) => {
      return showAlert(message, { ...options, type: "error" });
    },
    [showAlert]
  );

  const info = useCallback(
    (message, options = {}) => {
      return showAlert(message, { ...options, type: "info" });
    },
    [showAlert]
  );

  const warning = useCallback(
    (message, options = {}) => {
      return showAlert(message, { ...options, type: "warning" });
    },
    [showAlert]
  );

  const apiError = useCallback(
    (error, options = {}) => {
      let message = "An error occurred";
      let title = "Error";

      if (error.response) {
        // Server responded with error status
        const data = error.response.data;
        if (data && data.message) {
          message = data.message;
        } else if (data && data.error) {
          message = data.error;
        } else {
          message = `Error ${error.response.status}: ${error.response.statusText}`;
        }

        if (error.response.status === 401) {
          title = "Unauthorized";
        } else if (error.response.status === 403) {
          title = "Forbidden";
        } else if (error.response.status === 404) {
          title = "Not Found";
        } else if (error.response.status >= 500) {
          title = "Server Error";
        }
      } else if (error.request) {
        // Request made but no response
        message =
          "No response received from server. Please check your network connection.";
        title = "Network Error";
      } else if (error.message) {
        // Error in setting up request
        message = error.message;
      }

      return showAlert(message, { ...options, type: "error", title });
    },
    [showAlert]
  );

  const apiSuccess = useCallback(
    (response, options = {}) => {
      let message = "Operation successful";
      let title = "Success";

      if (response && response.data) {
        const data = response.data;
        if (data.message) {
          message = data.message;
        }
        if (data.title) {
          title = data.title;
        }
      }

      return showAlert(message, { ...options, type: "success", title });
    },
    [showAlert]
  );

  return (
    <AlertContext.Provider
      value={{
        alerts,
        showAlert,
        removeAlert,
        clearAlerts,
        success,
        error,
        info,
        warning,
        apiError,
        apiSuccess,
      }}
    >
      <AlertContainer>{children}</AlertContainer>
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export { AlertContext };
