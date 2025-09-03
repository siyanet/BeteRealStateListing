// import axios from "axios";



// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/", // Change this to your backend URL
 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Optional chaining or default empty object if undefined
//     const access_token = localStorage.getItem("bete_access_token");
//     if (access_token) {
//       if (config.headers) {
//         config.headers["Authorization"] = `Bearer ${access_token}`;
//       } else {
//         config.headers = { "Authorization": `Bearer ${access_token}` };
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

















import axios from 'axios';

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://betebackend.onrender.com/api/', // Your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RefreshTokenResponse {
  access: string;  // The new access token
}

// Request interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('bete_access_token'); // Retrieve the access token
    if (accessToken) {
      if(config.headers){
      config.headers['Authorization'] = `Bearer ${accessToken}`;}
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,  // If response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and it's not a refresh token request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop if retrying the request

      // Try to refresh the token
      const refreshToken = localStorage.getItem('bete_refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post<RefreshTokenResponse>('https://betebackend.onrender.com/api/token/refresh/', {
            refresh: refreshToken,
          });

          // Save the new access token in localStorage
          const { access } = response.data;
          localStorage.setItem('bete_access_token', access);

          // Set the new access token in the request headers
          originalRequest.headers['Authorization'] = `Bearer ${access}`;

          // Retry the failed request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // If refreshing the token fails, log the user out
          localStorage.removeItem('bete_access_token');
          localStorage.removeItem('bete_refresh_token');
          // Redirect to login page or show an error
          window.location.href = '/signup';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



