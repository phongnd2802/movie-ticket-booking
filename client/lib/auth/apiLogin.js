import axios from "axios";
import { setCookie } from "../cookie";
const handleLogin = async (endpoint, values) => {
  try {
    const response = await axios.post(endpoint, values, {
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error("Có lỗi xảy ra: ", error);
    return error.response;
  }
};

const handleToken = (data) => {
  const user = data.profile;
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;
  setCookie("at", accessToken, 15 * 60);
  setCookie("rt", refreshToken, 7 * 24 * 60 * 60);
  // setCookie("user", JSON.stringify(user), 7 * 24 * 60 * 60, "/"); // quên mất để làm gì rồi
  localStorage.setItem("user", JSON.stringify(user));
};

export { handleLogin, handleToken };
