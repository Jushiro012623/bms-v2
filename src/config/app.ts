
const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://192.168.123.140:8002/api",
  apiEndPoint: import.meta.env.VITE_API_ENDPOINT || "api/",
};

export { config };