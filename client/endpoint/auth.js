import { configDotenv } from "dotenv";
configDotenv();
const login = ":8000/v1/api/user/sign-in";
const verifyOtp = `${process.env.BACKEND_URL}:${process.env.PORT_BACKEND}/v1/api/user/token-otp`;
const submitVerify = `${process.env.BACKEND_URL}:${process.env.PORT_BACKEND}/v1/api/user/verify-otp`;
const signUp = `${process.env.BACKEND_URL}:${process.env.PORT_BACKEND}/v1/api/user/sign-up`;

export { login, verifyOtp, submitVerify, signUp };
