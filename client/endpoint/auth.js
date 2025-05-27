import { configDotenv } from "dotenv";
configDotenv();
const BACKEND_URL = "https://devguystory.io.vn";

// const PORT_BACKEND = process.env.PORT_BACKEND || 8080;
const login = `${BACKEND_URL}/api/v1/auth/login`;
const getTtl = `${BACKEND_URL}/api/v1/auth/otp-session`;
const submitVerify = `${BACKEND_URL}/api/v1/auth/verify-otp`;
const signUp = `${BACKEND_URL}/api/v1/auth/register`;
const logout = `${BACKEND_URL}/api/v1/auth/logout`;

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

const createMovie = `${BACKEND_URL}/api/v1/admin/movie`;

const getCinemaHall = `${BACKEND_URL}/api/v1/admin/cinema/hall`;

const getCinema = `${BACKEND_URL}/api/v1/admin/cinema`;

const vnpay = `${BACKEND_URL}/api/v1/payment/vnpay-create`;

const addGenre = `${BACKEND_URL}/api/v1/admin/movie/genre`;

const booking = `${BACKEND_URL}/api/v1/booking`;

const bookingFood = `${BACKEND_URL}/api/v1/booking/food`;
const paymentBooking = `${BACKEND_URL}/api/v1/payment/vnpay-create`;

const conformPayment = `${BACKEND_URL}/api/v1/payment/vnpay-callback`;

const searchURL = `${BACKEND_URL}/api/v1/search`;

const getAllCinemal = `${BACKEND_URL}/api/v1/admin/cinema`;
const getAllCinemalHall = (id) =>
  `${BACKEND_URL}/api/v1/admin/cinema/hall/${id}`;

const createShow = `${BACKEND_URL}/api/v1/admin/show`;
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
  logout,
  createMovie,
  getCinemaHall,
  getCinema,
  vnpay,
  addGenre,
  booking,
  paymentBooking,
  conformPayment,
  searchURL,
  getAllCinemal,
  getAllCinemalHall,
  createShow,
  bookingFood,
};
