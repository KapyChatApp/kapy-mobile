import axios from 'axios';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
    } else if (error.request) {
      console.error('Error request:', error.request);
      alert('No response received from server. Please try again.');
    } else {

      console.error('Error message:', error.message);
      alert('An error occurred while sending the request.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
