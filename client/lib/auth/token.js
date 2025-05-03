import axios from "axios";
import { refeshToken } from "@/endpoint/auth";
import { deleteCookie, getCookie } from "../cookie";
async function getRefreshToken() {
  try {
    let at = getCookie("at");
    let rt = getCookie("rt");

    if (!at && rt) {
      const token = await axios.patch(
        refeshToken,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${rt}`,
          },
        }
      );
      if (token.status === 200) {
        if (token.data.code === 20000) {
          at = token.data.metadata.accessToken;
          rt = token.data.metadata.refreshToken;

          return { at, rt };
        } else {
          localStorage.removeItem("user");
          deleteCookie("at");
          deleteCookie("rt");
          window.location.href = "/login";
          return;
        }
      } else {
        localStorage.removeItem("user");
        deleteCookie("at");
        deleteCookie("rt");
        return;
      }
    }

    if (at && rt) {
      return { at, rt };
    }

    localStorage.removeItem("user");
    deleteCookie("at");
    deleteCookie("rt");
    at = "null";
    rt = "null";

    return {
      at,
      rt,
    };
  } catch (error) {
    console.log("error:::", error);
    return {
      at: "null",
      rt: "null",
    };
  }
}

export { getRefreshToken };
