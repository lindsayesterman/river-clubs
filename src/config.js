require('dotenv').config()
const isDev = process.env.NODE_ENV !== "production";

export default {
  API_ENDPOINT: isDev
    ? "http://localhost:8000/api"
    : "https://blooming-tundra-99681.herokuapp.com/api",
  appID: "f24089a6",
  appKey: "852a1aaa9680a42848b77f54a0c8316f", 
  teacherAuth: "Teacher"
};
