const isDev = process.env.NODE_ENV !== "production";
export default {
  API_ENDPOINT: isDev
    ? "http://localhost:8000/api"
    : "https://blooming-tundra-99681.herokuapp.com/api",
};
