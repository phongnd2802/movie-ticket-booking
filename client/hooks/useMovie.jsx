"use client";
import { getAllMovie } from "@/endpoint/auth";
import { getCookie } from "@/lib/cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [isAccess, setIsAccess] = useState(false);

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
        }
      };
      fetchMovies();
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return { movies, isAccess, setMovies };
}
