import axios from "axios";
import { refeshToken } from "@/endpoint/auth";
import { getCookie, setCookie, deleteCookie } from "../cookie";

/**
 * Clears all authentication data and redirects to login.
 */
function clearAuth() {
  localStorage.removeItem("user");
  deleteCookie("at");
  deleteCookie("rt");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

/**
 * Attempts to retrieve valid access and refresh tokens.
 *
 * - If access token exists, returns it immediately.
 * - If access token is missing but refresh token exists, attempts to refresh.
 * - If refresh fails or no tokens, clears auth and redirects to login.
 *
 * @returns {Promise<{ at: string; rt: string }|null>}
 */
export async function getRefreshToken() {
  const at = getCookie("at");
  const rt = getCookie("rt");
  if (!rt) {
    clearAuth();
    return null;
  }

  if (at) {
    return { at, rt };
  }

  try {
    const response = await axios.patch(
      refeshToken,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rt}`,
        },
      }
    );
    const { status, data } = response;

    if (status === 200 && data.code === 20000 && data.metadata) {
      const newAt = data.metadata.accessToken;
      const newRt = data.metadata.refreshToken;
      deleteCookie("at");
      deleteCookie("rt");
      setCookie("at", newAt, 15 * 60);
      setCookie("rt", newRt, 24 * 60 * 60 * 7);

      return { at: newAt, rt: newRt };
    }

    clearAuth();
    return null;
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    clearAuth();
    return null;
  }
}
