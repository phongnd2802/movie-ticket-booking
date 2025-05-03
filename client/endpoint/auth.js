import { configDotenv } from "dotenv";
configDotenv();
const BACKEND_URL = "https://devguystory.io.vn";
// const PORT_BACKEND = process.env.PORT_BACKEND || 8080;
const login = `${BACKEND_URL}/api/v1/auth/login`;
const getTtl = `${BACKEND_URL}/api/v1/auth/otp-session`;
const submitVerify = `${BACKEND_URL}/api/v1/auth/verify-otp`;
const signUp = `${BACKEND_URL}/api/v1/auth/register`;

// get All movie
const getAllMovie = `${BACKEND_URL}/api/v1/movie/home?limit=10&offset=0`;
// get accessToken from refeshToken
const refeshToken = `${BACKEND_URL}/api/v1/auth/refresh-token`;

// add movie
const addMovie = `${BACKEND_URL}/api/v1/movie/add-movie`;

// get movie by id
const getMovieById = (id) => `${BACKEND_URL}/api/v1/movie/${id}`;

const getSeats = (id) => `${BACKEND_URL}/api/v1/show/${id}`;

const getAllFood = `${BACKEND_URL}/api/v1/food`;

export {
  login,
  getTtl,
  submitVerify,
  signUp,
  getAllMovie,
  refeshToken,
  addMovie,
  getMovieById,
  getSeats,
  getAllFood,
};
