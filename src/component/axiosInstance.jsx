import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://44.195.249.112:7878",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response);

    // Only handle 401 errors AND check if it's a token expiration (not invalid credentials)
    if (error.response?.status === 401 && error.response?.data?.message?.toLowerCase() !== "invalid credentials") {

      // Special case: Don't retry refresh token requests
      if (originalRequest.url.includes("refreshtoken")) {
        localStorage.clear();
        window.location.href = "/role/login";
        return Promise.reject(error);
      }

      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("RefreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/role/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://44.195.249.112:7878/auth/refresh",
          { refreshToken },
          {
            baseURL: "http://44.195.249.112:7878/",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const newToken = res?.data?.data?.accessToken;
        const tokenKey = "token";
        localStorage.setItem(tokenKey, newToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/role/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For invalid credentials (401 with "Invalid credentials" message) and other errors, just reject
    return Promise.reject(error);
  }
);

export default axiosInstance;