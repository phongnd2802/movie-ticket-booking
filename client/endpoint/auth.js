import { configDotenv } from "dotenv";
configDotenv();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";
const PORT_BACKEND = process.env.PORT_BACKEND || 8080;
const login = `${BACKEND_URL}:${PORT_BACKEND}/api/v1/auth/login`;
const verifyOtp = `${BACKEND_URL}:${PORT_BACKEND}/api/v1/auth/otp-session`;
const submitVerify = `${BACKEND_URL}:${PORT_BACKEND}/api/v1/auth/verify-otp`;
const signUp = `${BACKEND_URL}:${PORT_BACKEND}/api/v1/auth/register`;

export { login, verifyOtp, submitVerify, signUp };
