import axios from "axios";
import { setCookie } from "../cookie";
const handleLogin = async (endpoint, values) => {
  try {
    const response = await axios.post(endpoint, values, {
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra: ", error);
    return error.response;
  }
};

const handleToken = (data) => {
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;
  setCookie("at", accessToken, 15 * 60, "/");
  setCookie("rt", refreshToken, 7 * 24 * 60 * 60, "/");
};

export { handleLogin, handleToken };
