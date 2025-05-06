import axios from "axios";
import { getCookie } from "../cookie";
const fetchTtl = async (endpoint) => {
  try {
    const OTP_TOKEN = "otp_token";
    const token = getCookie(OTP_TOKEN);
    const response = await axios.get(`${endpoint}?token=${token}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const _data = await response.data;
      return _data.metadata;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const handleVerifyOtp = async (otp, email, endpoint) => {
  try {
    const otpCode = otp.join("");
    console.log(otpCode);
    if (otpCode.length !== 6) {
      alert("Vui lòng nhập đầy đủ 6 chữ số OTP.");
      return;
    }
    const OTP_TOKEN = "otp_token";
    const token = getCookie(OTP_TOKEN);
    const response = await axios.post(
      endpoint,
      { email: email, token, otp: otpCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export { handleVerifyOtp, fetchTtl };
