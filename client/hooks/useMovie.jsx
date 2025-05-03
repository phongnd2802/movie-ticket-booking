"use client";
import { getAllMovie, refeshToken } from "@/endpoint/auth";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRefreshToken } from "@/lib/auth/token";
import { useRouter } from "next/navigation";

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [isAccess, setIsAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccount = () => {
      const user = localStorage.getItem("user");
      const rt = getCookie("rt");
      if (user && rt) {
        setIsAccess(true);
      }
    };
    checkAccount();
  }, []);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const response = await axios.get(
          getAllMovie,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          if (response.data.code === 20000) {
            setMovies(response.data.metadata.movies);
          }
        } else {
          localStorage.removeItem("user");
          deleteCookie("rt");
          deleteCookie("at");
          router.push("/");
        }
      };
      fetchMovies();
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return { movies, isAccess };
}
