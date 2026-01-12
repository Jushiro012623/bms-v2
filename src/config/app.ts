
const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://192.168.122.80:8002/api",
  apiEndPoint: import.meta.env.VITE_API_ENDPOINT || "api/",
};

export { config };