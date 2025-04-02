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
  const userId = data.user.usr_id;
  const accessToken = data.token.accessToken;
  const refreshToken = data.token.refeshToken;
  setCookie("at", accessToken, 2 * 60, "/");
  setCookie("rt", refreshToken, 7 * 24 * 60 * 60, "/");
  setCookie("userId", userId, 7 * 24 * 60 * 60, "/");
};

export { handleLogin, handleToken };
